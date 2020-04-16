import { Hash } from 'crypto';
import { Profile } from './profile.model';
import { AccountDetails } from './account-details.model';

export class Account {  
  accountID: Hash;
  profiles: Profile[];
  accountDetails: AccountDetails;
}