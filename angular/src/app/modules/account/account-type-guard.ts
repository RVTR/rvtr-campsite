import { Account as Acct } from '../../data/account.model';
import { String, Array, Record } from 'runtypes';

const Address = Record({
  id: String,
  city: String,
  country: String,
  postalCode: String,
  stateProvince: String,
  street: String,
});
const Payment = Record({
  id: String,
  cardExpirationDate: String,
  cardName: String,
  cardNumber: String,
});
const Name = Record({
  id: String,
  family: String,
  given: String,
});
const Profile = Record({
  id: String,
  email: String,
  name: Name,
  phone: String,
});
const Account = Record({
  address: Address,
  payments: Array(Payment),
  profiles: Array(Profile),
});
const AccountTypeGuard = Account;
export default AccountTypeGuard;
