import { Hash } from 'crypto';
import { AccountRewards } from './account-rewards.model';

/**
 * Object model for account details.
 */
export class AccountDetails {
  accountDetailsID: Hash;
  accountType: string;
  rewards: AccountRewards;
}