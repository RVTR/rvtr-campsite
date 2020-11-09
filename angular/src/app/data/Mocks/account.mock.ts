import { Account } from '../account.model';

export const account: Account = {
  id: '',
  email: '',
  name: '',
  address: {
    id: '',

    city: '',
    country: '',
    postalCode: '',
    stateProvince: '',
    street: '',
  },
  payments: [],
  profiles: [],
};

export const accountMock: Account = {
  id: '0',
  email: 'test',
  name: 'test',
  address: {
    id: 'string',
    city: 'string',
    country: 'string',
    postalCode: 'string',
    stateProvince: 'string',
    street: 'string',
  },
  payments: [
    {
      id: 'string',
      cardExpirationDate: '2020-08-01',
      cardName: 'string',
      cardNumber: 'string',
      securityCode: '111',
    },
  ],
  profiles: [
    {
      type: 'adult',
      id: 1,
      email: 'string',
      familyName: 'string',
      givenName: 'string',
      phone: 'string',
    },
  ],
};
