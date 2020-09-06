import { Component, Input } from '@angular/core';
import { Lodging } from 'src/app/data/lodging.model';
import { Booking } from 'src/app/data/booking.model';
import { BookingService } from 'src/app/services/booking/booking.service';

@Component({
  selector: 'uic-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  @Input() lodgings!: Lodging[] | null;
  @Input() query!: string;
  reservation: Booking | undefined;

  constructor(private readonly bookingService: BookingService) {}

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

  makeReservation(lodging: Lodging): void {
    this.reservation = {
      id: '1',
      lodgingId: lodging.id,
      guests: [],
      accountId: '1',
      rentals: [],
      checkIn: new Date().toDateString(),
      checkOut: new Date().toDateString(),
    };
    this.bookingService.post(this.reservation).subscribe();
  }
}
