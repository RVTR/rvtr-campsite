import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { LodgingDetailsComponent } from './lodging-details.component';
import { Lodging } from 'src/app/data/lodging.model';
import { Observable, of } from 'rxjs';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookingService } from '../../../services/booking/booking.service';
import { Review } from 'data/review.model';
import { Booking } from 'data/booking.model';

describe('LodgingDetailsComponent', () => {
  let component: LodgingDetailsComponent;
  let fixture: ComponentFixture<LodgingDetailsComponent>;
  const lodging: Lodging = {
    id: 1,
    location: {
      id: '1',
      address: {
        id: '1',
        city: 'testCity',
        country: 'testCountry',
        postalCode: 'testCode',
        stateProvince: 'testState',
        street: 'testStreet',
      },
      latitude: 'testLat',
      longitude: 'testLong',
    },
    name: 'test',
    rentals: [],
    reviews: [],
    bathrooms: 1,
    imageUrls: [],
  };

  const review: Review = {
    accountId: 0,
    name: '',
    comment: '',
    dateCreated: '',
    rating: 0,
    lodgingId: 0,
  };

  const bookings: Booking[] = [
    {
      id: '0',
      accountId: 2,
      lodgingId: 1,
      guests: [],
      rentals: [],
      checkIn: '2020-08-01',
      checkOut: '2020-08-03',
    },
    {
      id: '0',
      accountId: 3,
      lodgingId: 2,
      guests: [],
      rentals: [],
      checkIn: '2020-08-01',
      checkOut: '2020-08-03',
    },
  ];

  const imageUrlsMock = ['https://bulma.io/images/placeholders/1280x960.png'];

  const mockProfile = {
    id: 1,
    email: 'Email@email.com',
    type: 'adult',
    givenName: 'Guy',
    familyName: 'Ferri',
    phone: '111-111-1111',
  };

  beforeEach(
    waitForAsync(() => {
      const lodgingServiceStub = {
        getById(id: string): Observable<Lodging> {
          return of(lodging);
        },

        getImages(id: string): Observable<string[]> {
          return of(imageUrlsMock);
        },

        postReview(rev: Review): Observable<Review> {
          return of(review);
        },
      };

      const bookingServiceStub = {
        getByAccountId(id: number): Observable<Booking[]> {
          return of(bookings);
        },
      };

      TestBed.configureTestingModule({
        declarations: [LodgingDetailsComponent],
        imports: [HttpClientTestingModule],
        providers: [
          { provide: BookingService, useValue: bookingServiceStub },
          { provide: LodgingService, useValue: lodgingServiceStub },
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
   * tests if the lodge details are returned correctly
   */
  it('should get lodging details', () => {
    expect(component.lodging).toBeTruthy();
    expect(component.lodging).toEqual(lodging);
    expect(component.lodging?.imageUrls).toEqual(imageUrlsMock);
  });

  /**
   * tests if hasBooked and profile is initialized correctly
   */
  it('should intialize hasBooked correctly', () => {
    expect(component.hasBooked).toBeFalse();
    expect(component.profile).toEqual(mockProfile);
  });

  /**
   * tests the score form control validation
   */
  it('should validate score form control', () => {
    const s = 'score';
    const score = component.Comment.controls[s];

    score.setValue('');
    fixture.detectChanges();
    expect(score.valid).toBeFalse();
    score.setValue('1');
    fixture.detectChanges();
    expect(score.valid).toBeTrue();
  });

  /**
   * tests the message form control validation
   */
  it('should validate score form control', () => {
    const m = 'message';
    const message = component.Comment.controls[m];

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
});
