/**
 * Represents the _Address_ model
 *
 * ```yaml
 * city: string;
 * occupancy: string;
 * ```
 */

export interface Filter {
  city: string;
  stateProvince: string;
  country: string;
  occupancy: string;
}
