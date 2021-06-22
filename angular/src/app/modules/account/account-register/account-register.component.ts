import { Component, Inject, OnInit } from '@angular/core';
import { Account, createEmptyAccount } from 'data/account.model';
import { AccountService } from 'services/account/account.service';
import { GenericEditingService } from 'services/editable/generic-editing.service';
import { ACCOUNT_EDITING_SERVICE } from '../account-editing.token';
import { ToastrService } from 'ngx-toastr'; // adding ngx-toastr for api service error notifications
import { OktaAuthService } from '@okta/okta-angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'uic-account-register',
  templateUrl: './account-register.component.html',
  styleUrls: [],
})
export class AccountRegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public oktaService: OktaAuthService,
    private accountService: AccountService,
    @Inject(ACCOUNT_EDITING_SERVICE)
    public editingService: GenericEditingService<Partial<Account>>,
    private readonly toastrService: ToastrService
  ) {}
  listofstate: string[] = [
    'AK',
    'AL',
    'AR',
    'AS',
    'AZ',
    'CA',
    'CO',
    'CT',
    'DC',
    'DE',
    'FL',
    'GA',
    'GU',
    'HI',
    'IA',
    'ID',
    'IL',
    'IN',
    'KS',
    'KY',
    'LA',
    'MA',
    'MD',
    'ME',
    'MI',
    'MN',
    'MO',
    'MS',
    'MT',
    'NC',
    'ND',
    'NE',
    'NH',
    'NJ',
    'NM',
    'NV',
    'NY',
    'OH',
    'OK',
    'OR',
    'PA',
    'PR',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VA',
    'VI',
    'VT',
    'WA',
    'WI',
    'WV',
    'WY',
  ];

  newaccount = createEmptyAccount();

  AccountForm!: FormGroup;

  async init(): Promise<void> {}
  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.AccountForm = this.fb.group({
      address: this.fb.group({
        street: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        zipcode: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[0-9]{5}(-[0-9]{4})?$/),
        ]),
      }),
      profile: this.fb.group({
        firstname: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required),
        phone: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
          ),
        ]),
        dateofbirth: new FormControl('', [Validators.required]),
      }),
      payment: this.fb.group({
        cardname: new FormControl('', Validators.required),
        cardnumber: new FormControl('', [
          Validators.required,
          Validators.pattern(/\d{4}-?\d{4}-?\d{4}-?\d{4}$/),
        ]),
        expdate: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(0[1-9]|1[0-2])\/?(2[0-9])$/),
        ]),
        securitycode: new FormControl('', [
          Validators.required,
          Validators.pattern(/^([0-9]{3})$/),
        ]),
      }),
    });
  }
  async create(): Promise<void> {
    const user = await this.oktaService.getUser();
    this.newaccount.email = String(user.email);
    this.newaccount.address.street = this.AccountForm.get(['address', 'street'])?.value as string;
    this.newaccount.address.city = this.AccountForm.get(['address', 'city'])?.value as string;
    this.newaccount.address.stateProvince = this.AccountForm.get(['address', 'state'])
      ?.value as string;
    this.newaccount.address.postalCode = this.AccountForm.get(['address', 'zipcode'])
      ?.value as string;
    this.newaccount.address.country = 'US';
    this.newaccount.profiles[0].email = user.email as string;
    this.newaccount.profiles[0].givenName = this.AccountForm.get(['profile', 'firstname'])
      ?.value as string;
    this.newaccount.profiles[0].familyName = this.AccountForm.get(['profile', 'lastname'])
      ?.value as string;
    this.newaccount.profiles[0].phone = this.AccountForm.get(['profile', 'phone'])?.value as string;
    this.newaccount.profiles[0].dateofbirth = this.AccountForm.get(['profile', 'dateofbirth'])
      ?.value as string;
    this.newaccount.profiles[0].imageUri = 'https://i.imgur.com/NKuYqM6.png';
    this.newaccount.profiles[0].active = true;
    this.newaccount.payments[0].cardName = this.AccountForm.get(['payment', 'cardname'])
      ?.value as string;
    this.newaccount.payments[0].cardNumber = this.AccountForm.get(['payment', 'cardnumber'])
      ?.value as string;
    this.newaccount.payments[0].cardExpirationDate = this.AccountForm.get(['payment', 'expdate'])
      ?.value as string;
    this.newaccount.payments[0].securityCode = this.AccountForm.get(['payment', 'securitycode'])
      ?.value as string;

    await this.accountService.post(this.newaccount).toPromise();

    location.reload();
  }
}
