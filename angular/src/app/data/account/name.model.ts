import { Hash } from 'crypto';

export class Name {
  nameID: Hash;
  commonName: string;
  familyName: string;
  fullName: string;
  dob: Date;
  title: string;
  suffix: string;
  culture: string;
  gender: string;
  language: string;
}
