import { Hash } from 'crypto';
import { AccountRewards } from './account-rewards.model';

export class AccountDetails {
  accountDetailsID: Hash;
  accountType: string;
  rewards: AccountRewards;
}