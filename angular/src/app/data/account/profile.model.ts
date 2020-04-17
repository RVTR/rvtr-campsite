import { Hash } from 'crypto';
import { ContactInformation } from './contact-information.model';
import { Address } from './address.model';
import { Payment } from './payment.model';
import { Name } from './name.model';
import { EmergencyInformation } from './emergency-information.model';

/**
 * Object model for customer profile.
 */
export class Profile {
  
  profileID: Hash;
  accountRole: string;
  profilePicture: string;
  contactInformation: ContactInformation;
  address: Address;
  payment: Payment;
  name: Name;
  emergencyContact: EmergencyInformation;
}
