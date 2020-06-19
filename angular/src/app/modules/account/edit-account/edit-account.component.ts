import { Component, OnInit } from '@angular/core';
import { Account } from '../../../data/account.model';
import { AccountService } from 'src/app/services/account/account.service';
import { Payment } from 'src/app/data/payment.model';
import { Profile } from 'src/app/data/profile.model';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';
import * as _ from 'lodash';

@Component({
  selector: 'uic-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class EditAccountComponent implements OnInit {

  // properties
  data: Account = {
    id: null,
    address: null,
    name: null,
    payments: [],
    profiles: []
  };
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  hideCard = true;
  hideProfile = true;
  paymentsDb: Payment[];
  profilesDb: Profile[];
  removePaymentsDb: number[] = [];
  removeProfilesDb: number[] = [];

  // functions
  // boolean toggle to show/hide the add new payment section in html
  toggleCard() {
    this.hideCard = !this.hideCard;
  }

  // boolean toggle to show/hide the add new profile section in html
  toggleProfile() {
    this.hideProfile = !this.hideProfile;
  }

  // function to check if an input field is nul/undefined/or white spaces
  isNullOrWhitespace(input: string) {
    if (typeof input === 'undefined' || input === null) {
      return true;
    }
    return input.replace(/\s/g, '').length < 1;
  }

  // adds a new credit card info to the array of payments in the data:Account property
  addCard(name: string, cardNumber: number, cardExpi: Date) {
    const today = new Date();
    const cardString = cardNumber.toString();
    // validation to check entered card name is not empty, is 13-16 digits, is valid according to luhn's, and has a future expiration date
    if (this.isNullOrWhitespace(name) ||
        today > cardExpi ||
        this.data.payments.some(x => x.cardNumber === cardString ||
        !this.accountService.isValidCreditCard(cardString))) {
      return console.log('Error, please try again');
    } else {
      const newCard: Payment = {
        id: 0,
        cardExpirationDate: cardExpi,
        cardName: name,
        cardNumber: cardString
      };
      this.data.payments.push(newCard);
      this.toggleCard();
      console.log('Successfully added to the list');
    }
  }

  // remove a payment card from arrays of payments in the data:Account property
  removeCard(card) {
    this.data.payments
      .splice(this.data.payments.indexOf(card), 1);
  }

  // For transferring uploaded image to base64
  async fileChangeEvent(fileInput: any) {
    const result = await this.accountService.validateImage(fileInput);
    this.isImageSaved = result.valid;
    if (this.isImageSaved) {
      this.cardImageBase64 = result.message;
    } else {
      this.imageError = result.message;
    }
  }

  // removing a selected image from the add new profile section
  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
  }

  // adds a new profile to the array of profiles in the data:Account property
  addProfile(firstName: string, lastName: string, profileAge: 'Adult' | 'Child', emailAdd: string, phone: number, img: string) {
    // validation for adding a new profile
    if (this.data.profiles.some(x => x.name.given === firstName && x.name.family === lastName) ||
      this.isNullOrWhitespace(firstName) || this.isNullOrWhitespace(lastName) ||
      this.isNullOrWhitespace(emailAdd) || phone.toString().length !== 10) {
      return console.log('Error, please try again');
    }
    const newProfile: Profile = {
      id: 0,
      email: emailAdd,
      phone: phone.toString(),
      age: profileAge,
      name: {
        id: 0,
        family: lastName,
        given: firstName
      },
      image: img
    };
    this.data.profiles.push(newProfile);
    this.toggleProfile();
  }

  // remove a profile from array of profiles in the data:Account property
  removeProfile(profile) {
    this.data.profiles
      .splice(this.data.profiles.indexOf(profile), 1);
  }

  // http get from account service to obtain all the information of an account based on account id
  get() {
    const x = +this.activatedRoute.snapshot.paramMap.get('id');
    this.accountService.get(x.toString()).subscribe(data =>
      this.data = data[0]
    );
  }

  // http put from account service to update account information, validation is very ugly
  onSubmit() {
    if (this.isNullOrWhitespace(this.data.name) || this.isNullOrWhitespace(this.data.address.street) ||
      this.isNullOrWhitespace(this.data.address.city) || this.isNullOrWhitespace(this.data.address.stateProvince) ||
      this.isNullOrWhitespace(this.data.address.postalCode) || this.isNullOrWhitespace(this.data.address.country) ||
      this.data.payments.length <= 0 || this.data.profiles.length <= 0) {
      confirm('Please fill all the information and have at least one payment and profile before you update');
    } else {
      this.accountService.put(this.data).subscribe(
        success => {
          console.log('success: ', this.data);
          confirm('Account updated!');
          this.router.navigateByUrl(`account/${this.data.id.toString()}`);
        },
        error => console.log('error'));
    }
  }

  constructor(private readonly accountService: AccountService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.get();
  }
}
