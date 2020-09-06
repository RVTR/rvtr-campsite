import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from '../../../data/address.model';

@Component({
  selector: 'uic-new-address-form',
  templateUrl: './new-address-form.component.html',
  styleUrls: ['./new-address-form.component.scss'],
})
export class NewAddressFormComponent implements OnInit {
  showModal = false;

  @Output() newAddress: EventEmitter<Address> = new EventEmitter<Address>();

  AddressForm = new FormGroup({
    City: new FormControl('', [
      Validators.required,
      /**   diacritical marks, spaces in name, single quotes   */
      Validators.pattern(/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/),
    ]),

    Country: new FormControl('', [
      Validators.required,
      /** All 2 and 3 letter Country Codes */
      Validators.pattern(
        /^^(AF|AX|AL|DZ|AS|AD|AO|AI|AQ|AG|AR|AM|AW|AU|AT|AZ|BS|BH|BD|BB|BY|BE|BZ|BJ|BM|BT|BO|BQ|BA|BW|BV|BR|IO|BN|BG|BF|BI|KH|CM|CA|CV|KY|CF|TD|CL|CN|CX|CC|CO|KM|CG|CD|CK|CR|CI|HR|CU|CW|CY|CZ|DK|DJ|DM|DO|EC|EG|SV|GQ|ER|EE|ET|FK|FO|FJ|FI|FR|GF|PF|TF|GA|GM|GE|DE|GH|GI|GR|GL|GD|GP|GU|GT|GG|GN|GW|GY|HT|HM|VA|HN|HK|HU|IS|IN|ID|IR|IQ|IE|IM|IL|IT|JM|JP|JE|JO|KZ|KE|KI|KP|KR|KW|KG|LA|LV|LB|LS|LR|LY|LI|LT|LU|MO|MK|MG|MW|MY|MV|ML|MT|MH|MQ|MR|MU|YT|MX|FM|MD|MC|MN|ME|MS|MA|MZ|MM|NA|NR|NP|NL|NC|NZ|NI|NE|NG|NU|NF|MP|NO|OM|PK|PW|PS|PA|PG|PY|PE|PH|PN|PL|PT|PR|QA|RE|RO|RU|RW|BL|SH|KN|LC|MF|PM|VC|WS|SM|ST|SA|SN|RS|SC|SL|SG|SX|SK|SI|SB|SO|ZA|GS|SS|ES|LK|SD|SR|SJ|SZ|SE|CH|SY|TW|TJ|TZ|TH|TL|TG|TK|TO|TT|TN|TR|TM|TC|TV|UG|UA|AE|GB|US|UM|UY|UZ|VU|VE|VN|VG|VI|WF|EH|YE|ZM|ZW|AFG|ALB|DZA|ASM|AND|AGO|AIA|ATA|ATG|ARG|ARM|ABW|AUS|AUT|AZE|BHS|BHR|BGD|BRB|BLR|BEL|BLZ|BEN|BMU|BTN|BOL|BIH|BWA|BVT|BRA|IOT|VGB|BRN|BGR|BFA|BDI|KHM|CMR|CAN|CPV|CYM|CAF|TCD|CHL|CHN|CXR|CCK|COL|COM|COD|COG|COK|CRI|CIV|CUB|CYP|CZE|DNK|DJI|DMA|DOM|ECU|EGY|SLV|GNQ|ERI|EST|ETH|FRO|FLK|FJI|FIN|FRA|GUF|PYF|ATF|GAB|GMB|GEO|DEU|GHA|GIB|GRC|GRL|GRD|GLP|GUM|GTM|GIN|GNB|GUY|HTI|HMD|VAT|HND|HKG|HRV|HUN|ISL|IND|IDN|IRN|IRQ|IRL|ISR|ITA|JAM|JPN|JOR|KAZ|KEN|KIR|PRK|KOR|KWT|KGZ|LAO|LVA|LBN|LSO|LBR|LBY|LIE|LTU|LUX|MAC|MKD|MDG|MWI|MYS|MDV|MLI|MLT|MHL|MTQ|MRT|MUS|MYT|MEX|FSM|MDA|MCO|MNG|MSR|MAR|MOZ|MMR|NAM|NRU|NPL|ANT|NLD|NCL|NZL|NIC|NER|NGA|NIU|NFK|MNP|NOR|OMN|PAK|PLW|PSE|PAN|PNG|PRY|PER|PHL|PCN|POL|PRT|PRI|QAT|REU|ROU|RUS|RWA|SHN|KNA|LCA|SPM|VCT|WSM|SMR|STP|SAU|SEN|SCG|SYC|SLE|SGP|SVK|SVN|SLB|SOM|ZAF|SGS|ESP|LKA|SDN|SUR|SJM|SWZ|SWE|CHE|SYR|TWN|TJK|TZA|THA|TLS|TGO|TKL|TON|TTO|TUN|TUR|TKM|TCA|TUV|VIR|UGA|UKR|ARE|GBR|UMI|USA|URY|UZB|VUT|VEN|VNM|WLF|ESH|YEM|ZMB|ZWE)$/
      ),
    ]),
    /** USA Zip Codes */
    PostalCode: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{5}(-[0-9]{4})?$/),
    ]),

    StateProvince: new FormControl('', [
      Validators.required,
      /** US States */
      Validators.pattern(
        /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/
      ),
    ]),
    /** Matches a few numbers, followed by some words */
    Street: new FormControl('', [
      Validators.required,
      Validators.pattern(/\d{1,3}.?\d{0,3}\s[a-zA-Z]{2,30}\s[a-zA-Z]{2,15}/),
    ]),
  });

  /**
   * These getters retrieve the form controls to be used in the template and casts them as a Form control to prevent typechecking errors
   */

  get City(): FormControl {
    return this.AddressForm.get('City') as FormControl;
  }

  get Country(): FormControl {
    return this.AddressForm.get('Country') as FormControl;
  }

  get PostalCode(): FormControl {
    return this.AddressForm.get('PostalCode') as FormControl;
  }

  get StateProvince(): FormControl {
    return this.AddressForm.get('StateProvince') as FormControl;
  }

  get Street(): FormControl {
    return this.AddressForm.get('Street') as FormControl;
  }

  constructor() {}

  /**
   * Submit event
   *
   * @event NewAddressformComponent- Triggered by form submission
   *
   */
  onSubmit(): void {
    this.showModal = !this.showModal;
    const payload = {
      city: this.AddressForm.value.City,
      country: this.AddressForm.value.Country,
      postalCode: this.AddressForm.value.PostalCode,
      stateProvince: this.AddressForm.value.stateProvince,
      street: this.AddressForm.value.Street,
      id: '',
    } as Address;
    this.newAddress.emit(payload);
  }

  ngOnInit(): void {}
}
