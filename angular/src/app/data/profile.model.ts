/**
 * Represents the _Profile_ model
 *
 * ```yaml
 * id: string;
 * email: string;
 * givenName: string;
 * familyName: string;
 * phone: string;
 * active: boolean
 * ```
 */
export interface Profile {
  id: string;
  /** email */
  email: string;
  /** profile type: adult/child */
  type: string;
  /** firstname */
  givenName: string;
  /** lastname */
  familyName: string;
  /** phone number */
  phone: string;
  /** profile image uri/url */
  imageUri: string;
  /** profile active or not */
  active: boolean;

  dateofbirth: string;
}
