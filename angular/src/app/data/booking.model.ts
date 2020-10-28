import { Profile } from './profile.model';
import { Rental } from './rental.model';

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
 * ```
 */
export interface Booking {
  id: string;
  /** account associated with the reservation */
  accountId: number;
  /** lodging that was reserved */
  lodgingId: number;
  /** people the account owner has reserved the site with */
  guests: Profile[];
  /** sites that are reserved */
  rentals: Rental[];
  /** check-in date and time */
  checkIn: string;
  /** check-out date and time */
  checkOut: string;
}
