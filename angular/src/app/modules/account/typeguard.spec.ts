import TypeGuard from './typeguard';
import { Account } from '../../data/account.model';
describe('TypeGuardFunction', () => {
  it('should reject invalid object', () => {
    expect(TypeGuard({})).toBe(false);
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
    expect(TypeGuard(account)).toBeTruthy();
  });
});
