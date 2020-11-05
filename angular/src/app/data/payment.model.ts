/**
 * Represents the _Payment_ model
 *
 * ```yaml
 * id: string;
 * cardExpirationDate: string;
 * cardName: string;
 * cardNumber: string;
 * securityCode: string;
 * ```
 */
export interface Payment {
  id: string;
  cardExpirationDate: string;
  /** name on the card */
  cardName: string;
  cardNumber: string;
  /** three or four digit security code (CVV, CSC) */
  securityCode: string;
}

export interface PostPayment extends Payment {
  email: string;
  // accountId: string;
}
