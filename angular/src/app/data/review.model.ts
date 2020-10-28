/**
 * Represents the _Review_ model
 *
 * ```yaml
 * id: string;
 * comment: string;
 * dateCreated: string;
 * rating: number;
 * ```
 */
export interface Review {
  accountId: number;
  /**profile name */
  name?: string;
  /** text body */
  comment: string;
  /** date the review was posted */
  dateCreated: string;
  /** integer rating out of ten stars */
  rating: number;
  /**lodging id to see what lodging the review belongs to */
  lodgingId: number;
}
