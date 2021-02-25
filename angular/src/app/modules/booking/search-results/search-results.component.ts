import { Component, Input, OnChanges } from '@angular/core';
import { Lodging } from '../../../data/lodging.model';
import { Booking } from '../../../data/booking.model';
import { Rental } from '../../../data/rental.model';
import { BookingService } from 'services/booking/booking.service';
import { OktaAuthService, UserClaims } from '@okta/okta-angular';
import { AccountService } from 'services/account/account.service';
import { BookingRental } from 'data/bookingrental.model';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'uic-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnChanges {
  @Input() lodgings!: Lodging[] | null;
  @Input() query!: string;
  reservation: Booking | undefined;
  rentals: Rental[] = [];
  userClaims?: UserClaims;
  email?: string;

  constructor(
    public oktaAuth: OktaAuthService,
    private readonly accountService: AccountService,
    private readonly bookingService: BookingService
  ) {
    this.getUserInfo();
  }

  ngOnChanges(): void {
    this.setRentalsList();
  }

  setRentalsList(): void {
    if (this.lodgings !== null) {
      this.lodgings.forEach((thisLodging) => {
        if (thisLodging.rentals !== null) {
          thisLodging.rentals.forEach((thisRental) => {
            this.rentals.push(thisRental);
          });
        }
      });
    }
  }

  averageRating(lodging: Lodging): boolean[] {
    const maxRating = 10;
    const stars = new Array<boolean>(maxRating);

    stars.fill(false, 0, maxRating);

    if (lodging.reviews === null) {
      return stars;
    }

    const ratings = lodging.reviews.map((review) => review.rating);
    const ratingSum = ratings.reduce((a, b) => a + b, 0);

    const avgRating = Math.floor(ratingSum / ratings.length);

    stars.fill(true, maxRating - avgRating, maxRating);

    return stars;
  }

  async getUserInfo(): Promise<void> {
    this.userClaims = await this.oktaAuth.getUser();
    this.email = this.userClaims.email as string;
    console.log(this.email);
  }

  makeReservation(lodgingId: number, rentalId: number): void {
    const occRes = /(?!Occupancy: )\d+(?=,)/.exec(this.query);
    console.log('Query: ' + this.query);
    const dateReg = /\d{4}-\d{2}-\d{2}\s-\s\d{4}-\d{2}-\d{2}/.exec(this.query);
    let dateRes: string[];
    if (dateReg) {
      dateRes = dateReg[0].split(' - ');
    }

    const guestsArr: object[] = [];

    if (occRes) {
      for (let i = 0; i < Number(occRes); i++) {
        guestsArr.push({
          EntityId: 0,
          BookingModelId: 0,
          FirstName: 'stringFirst',
          LastName: 'stringLast',
          IsMinor: false,
        });
      }
    }

    if (this.email) {
      this.accountService.getEmail(this.email).subscribe((res) => {
        console.log(res);

        this.reservation = {
          entityId: 0,
          accountId: Number(res.entityId),
          lodgingId,
          guests: guestsArr,
          rentals: [
            {
              entityId: 0,
              bookingModelId: 1,
              lodgingRentalId: rentalId,
            },
          ],
          checkIn: dateRes[0],
          checkOut: dateRes[1],
          bookingNumber: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // this is a placeholder
        };

        console.log(this.reservation);
        this.bookingService.post(this.reservation).subscribe((r) => {
          console.log(r.id);
          if (r && r.entityId) {
            location.href = `/booking/reservation/${r.entityId}`;
          }
        });
      });
    }
  }
}
