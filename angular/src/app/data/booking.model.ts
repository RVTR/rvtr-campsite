import { Profile } from './profile.model';
import { Rental } from './rental.model';
import { Stay } from './stay.model';

/**
 * Represents the _Booking_ model
 *
 * ```yaml
 * id: string;
 * accountId: string;
 * lodgingId: string;
 * guests: Profile[];
 * rentals: Rental[];
 * stay: Stay;
 * ```
 */
export interface Booking {
  id: string;
  accountId: string;
  lodgingId: string;
  guests: Profile[];
  rentals: Rental[];
  stay: Stay;
}
