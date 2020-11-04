import { Lodging } from 'data/lodging.model';

export const mockLodgings: Lodging[] = [
  {
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
    imageUrls: ['http://placecorgi.com/300'],
  },
  {
    id: 2,
    location: {
      id: '2',
      address: {
        id: '2',
        city: 'testCity',
        country: 'testCountry',
        postalCode: 'testCode',
        stateProvince: 'testState',
        street: 'testStreet',
      },
      latitude: 'testLat',
      longitude: 'testLong',
    },
    name: 'test2',
    rentals: [],
    reviews: [],
    bathrooms: 1,
    imageUrls: ['http://placecorgi.com/300'],
  },
];
