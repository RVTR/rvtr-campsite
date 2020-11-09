import { Rental } from '../rental.model';

export const rentals: Rental[] = [
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
  {
    id: '2',
    lotNumber: '2',
    unit: {
      size: '5x5',
      capacity: 5,
      name: 'rv',
    },
    status: 'available',
    price: 100,
  },
];
