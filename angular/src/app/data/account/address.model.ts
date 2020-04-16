import { Hash } from 'crypto';

export class Address {
  addressID: Hash;
  streetAddress1: string;
  streetAddress2: string;
  zipcode: string;
  city: string;
  state: string;
  country: string;
}
