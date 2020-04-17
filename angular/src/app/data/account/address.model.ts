import { Hash } from 'crypto';

/**
 * Object model for customer address.
 */
export class Address {
  addressID: Hash;
  streetAddress1: string;
  streetAddress2: string;
  zipcode: string;
  city: string;
  state: string;
  country: string;
}
