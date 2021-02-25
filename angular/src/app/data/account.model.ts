import { Address } from './address.model';
import { Payment } from './payment.model';
import { Profile } from './profile.model';

/**
 * Represents the _Account_ model
 *
 * ```yaml
 * id?: string;
 * entityId: string;
 * email: string;
 * address: Address;
 * payments: Payment[];
 * profiles: Profile[];
 * ```
 */
export interface Account {
  id: string;
  /** address for the owner of the account */
  entityId: string;

  address: Address;

  name: string;

  email: string;
  /** stored payment methods */
  payments: Payment[];
  /** people the account owner can book a site with */
  profiles: Profile[];
}
