import { Hash } from 'crypto';

/**
 * Object model for contact information .
 */
export class ContactInformation {
  contactInformationID: Hash;
  email: string;
  phoneNumber: string;
}
