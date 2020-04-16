import { Hash } from 'crypto';
import { ContactInformation } from './contact-information.model';
import { Address } from './address.model';
import { Payment } from './payment.model';

export class Profile {
  
  profileID: Hash;
  accountRole: string;
  profilePicture: string;
  contactInformation: ContactInformation;
  address: Address;
  payment: Payment;
}
