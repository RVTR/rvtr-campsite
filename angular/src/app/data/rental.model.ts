/**
 * Represents the _Rental_ modei
 *
 * ```yaml
 * id: string;
 * entityId?: number;
 * lotNumber: string;
 * unit: RentalUnit;
 * status: string;
 * price: number;
 * discountedPrice?: number;
 * ```
 */
export interface Rental {
  id: string;
  entityId: number;
  capacity: number;
  discountedPrice?: number;
  lotNumber: string;
  price: number;
  siteName: string;
  size: string;
  status: string;
  lodgingRentalId?: number;
  bookingModelId?: number;
}
