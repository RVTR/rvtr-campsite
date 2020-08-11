import { Bedroom } from './bedroom.model';

/**
 * Represents the _RentalUnit_ model
 *
 * ```yaml
 * id: string;
 * bedroom: Bedroom;
 * name: string;
 * occupancy: number;
 * type: string;
 * ```
 */
export interface RentalUnit {
  id: string;
  bedroom: Bedroom;
  name: string;
  occupancy: number;
  type: string;
}
