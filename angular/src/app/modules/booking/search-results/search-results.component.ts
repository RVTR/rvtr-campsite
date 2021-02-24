import { Component, Input, OnChanges } from '@angular/core';
import { Lodging } from '../../../data/lodging.model';
import { Booking } from '../../../data/booking.model';
import { Rental } from '../../../data/rental.model';
import { BookingService } from 'services/booking/booking.service';
import { OktaAuthService, UserClaims } from '@okta/okta-angular';
import { AccountService } from 'services/account/account.service';
import { BookingRental } from 'data/bookingrental.model';

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
    // Sets list of rentals from list of lodgings, for total rental count summary
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
    const occRes = /(?<=(Occupancy: ))[^,]+/.exec(this.query);
    const dateReg = /\d{4}-\d{2}-\d{2}\s-\s\d{4}-\d{2}-\d{2}/.exec(this.query);
    let dateRes: string[];
    if (dateReg) {
      dateRes = dateReg[0].split(' - ');
    }

    const guestsArr: object[] = [];

    if (occRes) {
      for (let i = 0; i < +occRes[0]; i++) {
        guestsArr.push({});
      }
    }

    if (this.email) {
      this.accountService.getEmail(this.email).subscribe((res) => {
        console.log(res);
        this.reservation = {
          accountId: +res.id,
          lodgingId,
          guests: guestsArr,
          rentals: [
            {
              lodgingRentalId: rentalId,
            } as BookingRental,
          ],
          checkIn: dateRes[0],
          checkOut: dateRes[1],
          bookingNumber:""
        }; //needs futher teting for  2lines below this. and if
        this.bookingService.post(this.reservation).subscribe(res => {

          if(res && res.id)
          {
            //go to booking/reservation -> NEW COMP with 1 BUG
            //GO TO HTML AND COMPONET ->
            //Tested on Booking component in the constructor
            location.href = "/booking/reservation/" + res.id;
          }
      });
    });
    }
  }
}
