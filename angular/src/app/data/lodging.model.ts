import { Review } from './review.model';
import { Rental } from './rental.model';
import { Image } from './image.model';
import { Address } from './address.model';

/**
 * Represents the _Lodging_ model
 *
 * ```yaml
 * id: string;
 * address: address;
 * name: string;
 * bathrooms: number;
 * rentals: Rental[];
 * reviews: Review[];
 * imageUrls: string[]
 * ```
 */
export interface Lodging {
  entityId: number;
  address: Address;
  name: string;
  bathrooms: number;
  rentals: Rental[];
  reviews: Review[];
  images: Image[];
}
