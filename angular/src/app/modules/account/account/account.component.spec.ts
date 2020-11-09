import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { of, Observable } from 'rxjs';
import { AccountComponent } from './account.component';
import { Account } from '../../../data/account.model';
import { AccountService } from '../../../services/account/account.service';
import { ACCOUNT_EDITING_SERVICE } from '../account-editing.token';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { OktaAuthService, UserClaims } from '@okta/okta-angular';
import { account } from '../../../data/Mocks/account.mock';

describe('AccountComponent', () => {
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
          { provide: OktaAuthService, useValue: oktaAuthServiceMock },
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

  it('should call init() method', (done) => {
    fixture.detectChanges();
    const spy = spyOn(component, 'init').and.returnValue(Promise.resolve());
    component.init();
    spy.calls.mostRecent().returnValue.then(() => {
      fixture.detectChanges();
      expect(spy.calls.any()).toBe(true);
      done();
    });
  });

  it('should be able to call toastr service method', () => {
    const toasterServiceInstance = fixture.componentInstance.toastrServiceProp;
    fixture.detectChanges();
    component.callToastrError('Error Message', 'Error title');
    expect(toastrServiceSpy.calls.any()).toBe(true);
  });
});
