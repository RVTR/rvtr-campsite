import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AccountBookingComponent } from './account-booking.component';
import { Booking } from 'src/app/data/booking.model';
import { booking } from '../../../data/Mocks/booking.mock';
describe('AccountBookingComponent', () => {
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
