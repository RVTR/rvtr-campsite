import { ContactInformation } from './contact-information.model';


/**
 * Object model for emergency contact information. Extends ContactInformation for email and phonenumber.
 */
export class EmergencyInformation extends ContactInformation{
  emergencyContactName: string;
  relationship: string;
}
