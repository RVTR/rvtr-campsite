import { Account } from '../../data/account/account.model';
import { Profile } from '../../data/account/profile.model';
import { AccountDetails } from '../../data/account/account-details.model';
import { EmergencyInformation } from '../../data/account/emergency-information.model';
import { ContactInformation } from '../../data/account/contact-information.model';
import { Address } from '../../data/account/address.model';
import { Hash } from 'crypto';

function ReturnHash(hash: string) {
  return require("crypto")
        .createHash("sha256")
        .update(hash)
        .digest("hex");
}

// Account {  
//   accountID: Hash;
//   profiles: Profile[];
//   accountDetails: AccountDetails;
// }

export const _ACCOUNT: Account[] = [
  { 
    accountID: ReturnHash('accountid1'),
    profiles: Profile[1] = [
      {
        profileID: ReturnHash('profileid1'),
        accountRole: 'accountrole1',
        profilePicture: 'profilepicture1',
        contactInformation: {
          contactInformationID: ReturnHash('contactinformationid1'),
          email: 'email1',
          phoneNumber: 'phonenumber1'
        },
        address: {
            addressID: ReturnHash('addressid1'),
            streetAddress1: 'street1',
            streetAddress2: 'street2',
            zipcode: 'zip1',
            city: 'city1',
            state: 'state1',
            country: 'country1'
        },
        payment: {
          paymentID: ReturnHash('paymentid1'),
          paymentType: 'paymenttype1',
          cardholderName: 'cardholdername1',
          expirationDate: new Date(),
          cardType: 'cardtype1',
          cardNumber: 'cardnumber1',
          securityCode: 'securitycode1',
          billingAddress: {
            addressID: ReturnHash('addressid1'),
            streetAddress1: 'street1',
            streetAddress2: 'street2',
            zipcode: 'zip1',
            city: 'city1',
            state: 'state1',
            country: 'country1'
          } 
        },
        name: {
          nameID: ReturnHash('nameid1'),
          commonName: 'commonname1',
          familyName: 'familyname1',
          fullName: 'fullname',
          dob: new Date(),
          title: 'title1',
          suffix: 'suffix1',
          culture: 'culture1',
          gender: 'gender1',
          language: 'language1',
        },
        emergencyContact: {
          contactInformationID: ReturnHash('contactinformationid1'),
          email: 'email1',
          phoneNumber: 'phonenumber1',
          emergencyContactName: 'emergencycontactname',
          relationship: 'relationship1',
        },
      }
    ], 
    accountDetails: {
      accountDetailsID: ReturnHash('accountdetailsid1'),
      accountType: 'accounttype1',
      rewards: {
        accountRewardsID: ReturnHash('accountrewardsid1'),
        rewardsStatus: 'rewardsstatus1',
        rewardsPoints: 1
      }
    }
  }
];