/**
 * Represents the _Address_ model
 *
 * ```yaml
 * id: string;
 * city: string;
 * country: string;
 * latitude: string;
 * longitude: string;
 * postalCode: string;
 * stateProvince: string;
 * street: string;
 * ```
 */
export interface Address {
  entityId: string;
  city: string;
  country: string;
  latitude: string;
  longitude: string;
  postalCode: string;
  stateProvince: string;
  street: string;
}
