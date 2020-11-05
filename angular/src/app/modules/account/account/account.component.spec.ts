import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of, Observable } from 'rxjs';
import { AccountComponent } from './account.component';
import { Account } from '../../../data/account.model';
import { AccountService } from '../../../services/account/account.service';
import { ACCOUNT_EDITING_SERVICE } from '../account-editing.token';
import { ToastrService, ToastrModule } from 'ngx-toastr';

describe('AccountComponent', () => {
  let toastrServiceSpy: jasmine.Spy;
  const toastrSetvices = jasmine.createSpyObj('toastrSetvices', ['error']);
  toastrServiceSpy = toastrSetvices.error.and.returnValue(of(''));

  const accountServiceStub = {
    get(): Observable<Account> {
      const account: Account = {
        id: '',
        email: '',
        name: '',
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

    getEmail(): Observable<Account> {
      const account: Account = {
        id: '',
        email: '',
        name: '',
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

    getToken(): string {
      return 'test';
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
        imports: [HttpClientTestingModule, ToastrModule.forRoot()],
        providers: [
          {
            provide: ACCOUNT_EDITING_SERVICE,
            useValue: mockEditingService,
          },
          { provide: AccountService, useValue: accountServiceStub },
          { provide: ToastrService, useValue: toastrSetvices },
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

  it('should be able to call toastr service method', () => {
    const toasterServiceInstance = fixture.componentInstance.toastrServiceProp;
    fixture.detectChanges();
    component.callToastrError('Error Message', 'Error title');
    expect(toastrServiceSpy.calls.any()).toBe(true);
  });
});
