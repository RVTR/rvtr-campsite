import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchResultsComponent } from './search-results.component';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { BookingService } from 'src/app/services/booking/booking.service';
import { of } from 'rxjs';
import { lodgings } from '../../../data/Mocks/lodging.mock';
import { Rental } from 'data/rental.model';
import { account } from '../../../data/Mocks/account.mock';
import { bookingMock } from '../../../data/Mocks/booking.mock';
import { OktaAuthModule, OktaAuthService, OKTA_CONFIG, UserClaims } from '@okta/okta-angular';
import { environment } from 'environment';
import { AccountService } from 'services/account/account.service';

describe('SearchResultsComponent', () => {
  const accountService = jasmine.createSpyObj<AccountService>('AccountService', ['getEmail']);
  accountService.getEmail.and.callFake(() => {
    return of(account);
  });

  const bookingService = jasmine.createSpyObj<BookingService>('BookingService', ['post']);
  bookingService.post.and.callFake(() => {
    return of(bookingMock[0]);
  });

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

  const rating: boolean[] = [false, false, false, false, false, false, false, false, false, true];

  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, OktaAuthModule],
        declarations: [SearchResultsComponent],
        providers: [
          { provide: BookingService, useValue: bookingService },
          { provide: OktaAuthService, useValue: oktaAuthServiceMock },
          { provide: AccountService, useValue: accountService },
          {
            provide: OKTA_CONFIG,
            useValue: environment.identity,
          },
        ],
      }).compileComponents();

      TestBed.inject(HttpClient);
      TestBed.inject(HttpTestingController);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    component.lodgings = lodgings;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnChanges should make rentals list', () => {
    component.ngOnChanges();
    expect(component.rentals).toBeTruthy();
    expect(component.rentals.length).toBeTruthy();
    expect(component.rentals[0].status).toEqual('available');
  });

  it('ngOnChanges should display rentals list', () => {
    component.ngOnChanges();
    const testRental: Rental = component.rentals[0];
    const testRentalPriceString = ' $' + testRental.price + ' ';
    const info = fixture.debugElement.nativeElement.querySelectorAll('p');
    expect(info).toBeTruthy();
    expect(info[1].textContent).toEqual(testRentalPriceString);
  });

  it('should have rating of', () => {
    expect(component.averageRating(lodgings[0])).toEqual(rating);
  });
});
