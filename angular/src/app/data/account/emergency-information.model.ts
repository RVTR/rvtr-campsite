import { ContactInformation } from './contact-information.model';


export class EmergencyInformation extends ContactInformation{
  emergencyContactName: string;
  relationship: string;
}
