import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of, Observable, throwError } from 'rxjs';
import { AccountComponent } from './account.component';
import { Account } from '../../../data/account.model';
import { mockAccount } from '../../../data/mocks/mockAccount';
import { AccountService } from '../../../services/account/account.service';
import { ACCOUNT_EDITING_SERVICE } from '../account-editing.token';
import { ToastService } from '../../../services/toast/toast.service';

describe('AccountComponent', () => {
  const toastServiceSpy = jasmine.createSpyObj<ToastService>('ToastService', ['toastError']);

  const accountServiceStub = {
    get(): Observable<Account> {
      return of(mockAccount);
    },
    getWithError(): Observable<Account> {
      const errorMsg = { error: 'Test error' };
      toastServiceSpy.toastError(errorMsg.error, 'Test error');
      return throwError(errorMsg);
    },
    put(acct: Account): Observable<Account> {
      return of(acct);
    },
  };

  const mockEditingService = {
    payloadEmitter: new Observable<Partial<Account>>(),
    update(): void {},
  };

  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AccountComponent],
        imports: [HttpClientTestingModule],
        providers: [
          {
            provide: ACCOUNT_EDITING_SERVICE,
            useValue: mockEditingService,
          },
          { provide: AccountService, useValue: accountServiceStub },
          { provide: ToastService, useValue: toastServiceSpy },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * tests if ok request doesn't call toastservice
   */
  it('should return account with no toast error', () => {
    accountServiceStub.get().subscribe((res) => {
      expect(res).toEqual(mockAccount);
    });
    expect(toastServiceSpy.toastError).not.toHaveBeenCalled();
  });

  /**
   * tests if bad request calls toastservice
   */
  it('should throw error and call toast error', () => {
    accountServiceStub.getWithError().subscribe({
      error: (err) => {
        expect(err).toEqual({ error: 'Test error' });
      },
    });
    expect(toastServiceSpy.toastError).toHaveBeenCalled();
    toastServiceSpy.toastError.calls.reset();
  });
});
