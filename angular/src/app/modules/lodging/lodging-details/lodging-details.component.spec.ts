import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { LodgingDetailsComponent } from './lodging-details.component';
import { Lodging } from 'src/app/data/lodging.model';
import { Account } from 'src/app/data/account.model';
import { Observable, of } from 'rxjs';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookingService } from '../../../services/booking/booking.service';
import { Review } from 'data/review.model';
import { Booking } from 'data/booking.model';
import { By } from '@angular/platform-browser';
import { lodging } from '../../../data/Mocks/lodging.mock';
import { review } from '../../../data/Mocks/review.mock';
import { bookings } from '../../../data/Mocks/booking.mock';
import { accountMock } from '../../../data/Mocks/account.mock';
import { Image } from 'data/image.model';
import { OktaAuthModule, OktaAuthService, OKTA_CONFIG, UserClaims } from '@okta/okta-angular';
import { environment } from 'environment';
import { AccountService } from 'services/account/account.service';

describe('LodgingDetailsComponent', () => {
  let component: LodgingDetailsComponent;
  let fixture: ComponentFixture<LodgingDetailsComponent>;

  const imageUrlsMock: Image[] = [];

  const mockProfile = {
    id: 1,
    email: 'Email@email.com',
    type: 'adult',
    givenName: 'Guy',
    familyName: 'Ferri',
    phone: '111-111-1111',
    imageUri: 'https://bulma.io/images/placeholders/256x256.png',
    active: true,
    dateofbirth: '10/10/1890',
  };

  const onSubmitStub = {
    OnSubmit(): void {},
    click(): void {
      onSubmitStub.OnSubmit();
    },
  };

  const oktaAuthServiceMock = {
    getUser(): Promise<UserClaims> {
      const user: UserClaims = {
        sub: '',
        email: 'Email@email.com',
      };
      return new Promise<UserClaims>((resolve) => {
        return resolve(user);
      });
    },
  };

  beforeEach(
    waitForAsync(() => {
      const lodgingServiceStub = {
        getById(id: string): Observable<Lodging> {
          return of(lodging);
        },

        getImages(id: string): Observable<Image[]> {
          return of(imageUrlsMock);
        },

        postReview(rev: Review): Observable<Review> {
          return of(review);
        },
      };

      const bookingServiceStub = {
        get(id: string): Observable<Booking[]> {
          return of(bookings);
        },
      };

      const accountServiceStub = {
        getEmail(email: string): Observable<Account> {
          return of(accountMock);
        },
      };

      TestBed.configureTestingModule({
        declarations: [LodgingDetailsComponent],
        imports: [HttpClientTestingModule, OktaAuthModule],
        providers: [
          { provide: BookingService, useValue: bookingServiceStub },
          { provide: LodgingService, useValue: lodgingServiceStub },
          { provide: AccountService, useValue: accountServiceStub },
          { provide: OktaAuthService, useValue: oktaAuthServiceMock },
          {
            provide: OKTA_CONFIG,
            useValue: environment.identity,
          },
          {
            provide: ActivatedRoute,
            useValue: {
              paramMap: of({
                get(id: string): string {
                  return '1';
                },
              }),
            },
          },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(LodgingDetailsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  /**
   * tests the whole lodging-details component
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * tests the HTML for the comment box
   */
  it('Comment Box should appear', () => {
    component.hasBooked = true;

    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.querySelector('.media')).toBeTruthy();
  });

  /**
   * tests constructor values being initalized and if getBookingByAccountId works
   */
  it('GetBookingByAccountId should be called', () => {
    spyOn(component, 'getBookingByAccountId');

    expect(component.profile).toBeTruthy();
    expect(component.Comment).toBeTruthy();

    component.getBookingByAccountId('0');
    expect(component.getBookingByAccountId).toHaveBeenCalled();
    expect(component.hasBooked).toBeTrue();
    component.hasBooked = false;
    fixture.detectChanges();
  });

  /**
   * tests if getProfileByEmail works
   */
  it('should call GetProfileByEmail', () => {
    spyOn(component, 'getProfileByEmail');

    component.getProfileByEmail(accountMock.email);
    expect(component.profile.id).toEqual('1');
    expect(component.profile.familyName).toEqual('string');
    expect(component.profile.givenName).toEqual('string');
    expect(component.profile.phone).toEqual('string');
    expect(component.profile.type).toEqual('adult');
    expect(component.accountId).toEqual('0');
  });

  /**
   * tests if the lodge details are returned correctly
   */
  it('should get lodging details', () => {
    expect(component.lodging).toBeTruthy();
    expect(component.lodging).toEqual(lodging);
    expect(component.lodging?.images).toEqual(imageUrlsMock);
  });

  /**
   * tests if hasBooked and profile is initialized correctly
   */
  it('should intialize hasBooked correctly', () => {
    // On init, the component fills the data with whether the lodging has been booked before,
    // which is true for these mocks
    expect(component.hasBooked).toBeTrue();
    expect(component.profile).toEqual(accountMock.profiles[1]);
  });

  /**
   * tests if getUserData works
   */
  it('should intialize user profile correctly', () => {
    spyOn(component, 'getUserData');

    component.getUserData();

    expect(component.getUserData).toHaveBeenCalled();
    expect(component.profile).toEqual(accountMock.profiles[1]);
  });

  /**
   * tests the form validation
   */
  it('should validate form input', () => {
    const s = 'score';
    const m = 'message';

    const score = component.Comment.controls[s];
    const message = component.Comment.controls[m];
    score.setValue('');
    fixture.detectChanges();
    expect(score.valid).toBeFalse();
    score.setValue('1');
    fixture.detectChanges();
    expect(score.valid).toBeTrue();

    message.setValue('');
    fixture.detectChanges();
    expect(message.valid).toBeFalse();
    message.setValue('my message');
    fixture.detectChanges();
    expect(message.valid).toBeTrue();
  });

  /**
   * tests the on submit
   */
  it('should update lodging review array on submit', () => {
    localStorage.setItem('okta-token-storage', '{"idToken": {"claims":{"name":"Bob"}}}');
    expect(component.lodging?.reviews.length).toEqual(0);
    component.OnSubmit();
    fixture.detectChanges();
    expect(component.lodging?.reviews.length).toEqual(1);
  });

  /**
   * tests the OnSubmit button
   */
  it('On Submit should be called', () => {
    spyOn(component, 'OnSubmit');

    component.hasBooked = true;

    const s = 'score';
    const m = 'message';

    const score = component.Comment.controls[s];
    const message = component.Comment.controls[m];

    score.setValue('1');
    message.setValue('b');

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));

    button.triggerEventHandler('click', null);

    expect(component.OnSubmit).toHaveBeenCalled();
  });
});
