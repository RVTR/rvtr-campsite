import { Account } from '../account.model';

export const account: Account = {
  id: '',
  email: '',
  name: '',
  address: {
    entityId: '',
    city: '',
    country: '',
    latitude: '',
    longitude: '',
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
    entityId: 'string',
    city: 'string',
    country: 'string',
    latitude: 'string',
    longitude: 'string',
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
      imageUri:
        'https://avataaars.io/?avatarStyle=Circle&topType=LongHairCurly&accessoriesType=Prescription01&hairColor=Black&facialHairType=BeardMedium&facialHairColor=Auburn&clotheType=CollarSweater&clotheColor=White&eyeType=Close&eyebrowType=DefaultNatural&mouthType=Twinkle&skinColor=DarkBrown',
    },
    {
      id: 1,
      email: 'Email@email.com',
      type: 'adult',
      givenName: 'string',
      familyName: 'string',
      phone: 'string',
      imageUri: 'https://bulma.io/images/placeholders/256x256.png',
    },
  ],
};
