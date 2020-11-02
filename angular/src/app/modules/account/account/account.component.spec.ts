import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of, Observable } from 'rxjs';
import { AccountComponent } from './account.component';
import { Account } from '../../../data/account.model';
import { AccountService } from '../../../services/account/account.service';
import { ACCOUNT_EDITING_SERVICE } from '../account-editing.token';
import { ToastService } from '../../../services/toast/toast.service';

describe('AccountComponent', () => {
  let toastServiceSpy: jasmine.SpyObj<ToastService>;

  const accountServiceStub = {
    get(): Observable<Account> {
      const account: Account = {
        id: '',
        address: {
          id: '',
          city: '',
          country: '',
          postalCode: '',
          stateProvince: '',
          street: '',
        },
        payments: [],
        profiles: [],
      };
      return of(account);
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
      const spy = jasmine.createSpyObj('ToastService', ['toastError']);

      TestBed.configureTestingModule({
        declarations: [AccountComponent],
        imports: [HttpClientTestingModule],
        providers: [
          {
            provide: ACCOUNT_EDITING_SERVICE,
            useValue: mockEditingService,
          },
          { provide: AccountService, useValue: accountServiceStub },
          { provide: ToastService, useValue: spy },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      })
        .compileComponents()
        .then(() => {
          toastServiceSpy = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
        });
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
   * tests if the toast service can be called
   */
  it('should be able to call toast service method', () => {
    toastServiceSpy.toastError('error', 'error');
    expect(toastServiceSpy.toastError.calls.any()).toBe(true);
    expect(toastServiceSpy.toastError.calls.count()).toBe(1);
  });
});
