/**
 * Represents the _Rental_ modei
 *
 * ```yaml
 * id: string;
 * lotNumber: string;
 * unit: RentalUnit;
 * status: string;
 * price: number;
 * discountedPrice?: number;
 * ```
 */
export interface Rental {
  id: string;
  capacity: number;
  discountedPrice?: number;
  lotNumber: string;
  price: number;
  siteName: string;
  size: string;
  status: string;
  lodgingRentalId?: number;
  entityId: number;
  bookingModelId: number;
}
