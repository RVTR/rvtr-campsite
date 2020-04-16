import  { Address } from  './address.model'
import { Hash } from 'crypto';

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
