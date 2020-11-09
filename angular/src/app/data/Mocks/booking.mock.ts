import { Booking } from '../booking.model';

export const booking: Booking = {
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

export const bookings: Booking[] = [
  {
    id: '0',
    accountEmail: '',
    lodgingId: 1,
    guests: [],
    rentals: [],
    checkIn: '2020-08-01',
    checkOut: '2020-08-03',
  },
  {
    id: '0',
    accountEmail: '',
    lodgingId: 2,
    guests: [],
    rentals: [],
    checkIn: '2020-08-01',
    checkOut: '2020-08-03',
  },
];

export const bookingMock: Booking[] = [
  {
    id: '0',
    accountEmail: '',
    lodgingId: 0,
    guests: [],
    rentals: [],
    checkIn: '2020-08-01',
    checkOut: '2020-08-03',
  },
];
