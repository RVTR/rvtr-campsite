import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { OktaAuthService, OKTA_CONFIG } from '@okta/okta-angular';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  const oktaAuthServiceMock = {
    $authenticateState: of(false),
    isAuthenticated(): Promise<boolean> {
      return new Promise<boolean>(() => {
        return false;
      });
    },
    loginRedirect(path: string) {},
    logout() {},
  };

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HomeComponent],
        providers: [{ provide: OktaAuthService, useValue: oktaAuthServiceMock }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sign in', () => {
    let loginSpy = spyOn(oktaAuthServiceMock, 'loginRedirect');

    component.signIn();
    expect(loginSpy).toHaveBeenCalled();
  });

  it('should sign out', () => {
    let logoutSpy = spyOn(oktaAuthServiceMock, 'logout');

    component.signOut();
    expect(logoutSpy).toHaveBeenCalled();
  });
});
