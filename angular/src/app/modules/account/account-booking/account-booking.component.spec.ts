import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AccountBookingComponent } from './account-booking.component';
import { Booking } from 'src/app/data/booking.model';
describe('AccountBookingComponent', () => {
  const booking: Booking = {
    id: 'string',
    accountId: 'string',
    lodgingId: 'string',
    checkIn: '',
    checkOut: '',
    guests: [
      {
        id: 'string',
        type: 'string',
        email: 'string',
        familyName: '',
        givenName: '',
        phone: 'string',
      },
    ],
    rentals: [
      {
        id: 'string',
        name: 'string',
        status: 'string',
        price: 0.0,
        discountedPrice: 0.0,
        type: 'string',
        occupancy: 1,
      },
    ],
  };
  let component: AccountBookingComponent;
  let fixture: ComponentFixture<AccountBookingComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AccountBookingComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountBookingComponent);
    component = fixture.componentInstance;
    component.booking = booking;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
