import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AccountBookingComponent } from './account-booking.component';
import { Booking } from 'src/app/data/booking.model';
import { booking } from '../../../data/Mocks/booking.mock';
describe('AccountBookingComponent', () => {
<<<<<<< HEAD
  const booking: Booking = {
    id: 'string',
    accountEmail: '',
    lodgingId: 1,
    checkIn: '',
    checkOut: '',
    guests: [
      {
        id: 1,
        type: 'string',
        email: 'string',
        familyName: '',
        givenName: '',
        phone: 'string',
        editMode : false
      },
    ],
    rentals: [
      {
        id: '1',
        lotNumber: '1',
        unit: {
          size: '5x5',
          capacity: 2,
          name: 'tent',
        },
        status: 'available',
        price: 100,
      },
    ],
  };
=======
>>>>>>> 6edbd293832e887776a67e479889d7bf6bf015c8
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
