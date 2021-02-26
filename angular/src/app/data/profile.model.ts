/**
 * Represents the _Profile_ model
 *
 * ```yaml
 * id: string;
 * email: string;
 * givenName: string;
 * familyName: string;
 * phone: string;
 * ```
 */
export interface Profile {
  id: number;
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
}

export interface PostProfile extends Profile {
  email: string;
  // accountId: string;
}
