import { BookingRental } from './bookingrental.model';

/**
 * Represents the _Booking_ model
 *
 * ```yaml
 * id: string;
 * accountId: string;
 * lodgingId: string;
 * guests: Profile[];
 * rentals: Rental[];
 * checkIn: string;
 * checkOut: string;
 * bookingNumber: any
 * ```
 */
export interface Booking {
  id?: string;
  accountId?: number;
  /** account associated with the reservation */
  // accountId: number;
  /** lodging that was reserved */
  accountEmail?: string;
  /** lodging that was reserved */
  lodgingId: number;
  /** people the account owner has reserved the site with */
  guests: object[];
  /** sites that are reserved */
  rentals: BookingRental[];
  /** check-in date and time */
  checkIn: string;
  /** check-out date and time */
  checkOut: string;
  /** Confirmation number after*/
  bookingNumber: any;
}
