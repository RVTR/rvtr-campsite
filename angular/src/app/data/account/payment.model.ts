import  { Address } from  './address.model'
import { Hash } from 'crypto';

/**
 * Object model for customer payment information.
 */
export class Payment {
  paymentID: Hash;
  paymentType: string;
  cardholderName: string;
  expirationDate: Date;
  cardType: string;
  cardNumber: string;
  securityCode: string;
  billingAddress: Address; 
}
