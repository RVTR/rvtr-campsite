import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { OktaAuthService, UserClaims } from '@okta/okta-angular';
import { Account } from 'data/account.model';
import { account } from 'data/Mocks/account.mock';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { AccountService } from 'services/account/account.service';
import { ACCOUNT_EDITING_SERVICE } from '../account-editing.token';

import { AccountRegisterComponent } from './account-register.component';

describe('AccountRegisterComponent', () => {
  let component: AccountRegisterComponent;
  let fixture: ComponentFixture<AccountRegisterComponent>;
  let toastrServiceSpy: jasmine.Spy;
  const toastrSetvices = jasmine.createSpyObj('toastrSetvices', ['error']);
  toastrServiceSpy = toastrSetvices.error.and.returnValue(of(''));

  const oktaAuthServiceMock = {
    getUser(): Promise<UserClaims> {
      const user: UserClaims = {
        sub: '',
        email: 'test',
      };
      return new Promise<UserClaims>((resolve) => {
        return resolve(user);
      });
    },
  };

  const accountServiceStub = {
    getEmail(): Observable<Account> {
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountRegisterComponent],
      providers: [
        FormBuilder,
        {
          provide: ACCOUNT_EDITING_SERVICE,
          useValue: mockEditingService,
        },
        { provide: AccountService, useValue: accountServiceStub },
        { provide: OktaAuthService, useValue: oktaAuthServiceMock },
        { provide: ToastrService, useValue: toastrSetvices },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
