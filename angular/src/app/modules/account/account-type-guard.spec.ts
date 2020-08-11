import AccountTypeGuard from './account-type-guard';
import { Account } from '../../data/account.model';
describe('TypeGuardFunction', () => {
  it('should reject invalid object', () => {
    expect(AccountTypeGuard.guard({})).toBe(false);
  });
  it('should accept ', () => {
    const account: Account = {
      id: '',
      address: {
        id: '',
        city: '',
        country: '',
        postalCode: '',
        stateProvince: '',
        street: '',
      },
      payments: [],
      profiles: [],
    };
    expect(AccountTypeGuard.guard(account)).toBeTruthy();
  });
});
