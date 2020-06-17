import { Lodging } from 'src/app/data/lodging.model';
import { Rental } from 'src/app/data/rental.model';
import { Review } from 'src/app/data/review.model';
import { Location } from 'src/app/data/location.model';
import { Booking } from 'src/app/data/booking.model';
import { BookingSearchData } from './@types/booking-search-data';
import { FormControl, FormGroup } from '@angular/forms';
import { formatDate, getNewDateFromNowBy } from './utils/date-helpers';

const mockLocations: Location[] = [
  {
    id: '0',
    address: {
      id: '0',
      city: 'Los Angeles',
      country: 'USA',
      postalCode: '90210',
      stateProvince: 'CA',
      street: '7421 Something Dr'
    },
    latitude: '34.0522',
    locale: 'N/A',
    longitude: '118.2437',
  },
  {
    id: '1',
    address: {
      id: '1',
      city: 'Austin',
      country: 'USA',
      postalCode: '90210',
      stateProvince: 'TX',
      street: '7421 Something Dr'
    },
    latitude: '30.2672',
    locale: 'N/A',
    longitude: '97.7431',
  }
];

const mockRentals: Rental[] = [
  {
    id: '0',
    name: 'Nice Place',
    rentalUnit: null,
  },
  {
    id: '1',
    name: 'Nicer Place',
    rentalUnit: null,
  },
];

const mockReviews: Review[] = [
  { id: '0', accountId: '0', hotelId: '0', comment: '0', dateCreated: new Date(), rating: 4 },
];

const mockLodgings: Lodging[] = [
  {
    id: '0',
    location: mockLocations[0],
    name: 'A Place',
    rentals: mockRentals,
    reviews: mockReviews,
  },
  {
    id: '1',
    location: mockLocations[1],
    name: 'The Lodging',
    rentals: mockRentals,
    reviews: mockReviews,
  },
];

const mockBookings: Booking[] = [
  {
    id: '0',
    accountId: '0',
    lodgingId: '0',
    guests: [],
    rentals: [],
    stay: null,
    status: 'Active',
  },
];

const mockBookingSearchDataSet: BookingSearchData[] = [
  {
    guests: new FormControl(1),
    checkIn: new FormControl('2020-01-01'),
    checkOut: new FormControl('2020-02-01'),
    location: new FormControl('Los Angeles'),
  },
];

export { mockLocations, mockLodgings, mockRentals, mockReviews, mockBookings, mockBookingSearchDataSet };
