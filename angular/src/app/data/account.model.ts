import { Address } from './address.model';
import { Payment } from './payment.model';
import { Profile } from './profile.model';

/**
 * Represents the _Account_ model
 *
 * ```yaml
 * id?: string;
 * entityId: string;
 * email: string;
 * address: Address;
 * payments: Payment[];
 * profiles: Profile[];
 * ```
 */
export interface Account {
  id: string;
  entityId: string;
  address: Address;
  name: string;
  email: string;
  payments: Payment[];
  profiles: Profile[];
  birthDate: string;
}
export function createEmptyAccount(): Account {
  return {
    id: '0',
    entityId: '0',
    email: '',
    name: '',
    address: {
      entityId: '0',
      city: '',
      country: '',
      postalCode: '',
      stateProvince: '',
      street: '',
    },
    birthDate: '',
    payments: [
      {
        id: '0',
        cardExpirationDate: '',
        cardName: '',
        cardNumber: '',
        securityCode: '',
      },
    ],
    profiles: [
      {
        type: '',
        id: '0',
        email: '',
        familyName: '',
        givenName: '',
        phone: '',
        active: true,
        imageUri: '',
        dateofbirth: '',
      },
    ],
  };
}
