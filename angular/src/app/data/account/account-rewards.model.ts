import { Hash } from 'crypto';

/**
 * Object model for account rewards information.
 */
export class AccountRewards {
  accountRewardsID: Hash;
  rewardsStatus: string;
  rewardsPoints: number;
}