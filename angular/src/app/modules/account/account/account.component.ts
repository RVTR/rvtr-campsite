import { analyzeAndValidateNgModules } from '@angular/compiler';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, Inject } from '@angular/core';
import { Account } from 'data/account.model';
import { Address } from 'data/address.model';
import { Booking } from 'data/booking.model';
import { Payment } from 'data/payment.model';
import { Profile } from 'data/profile.model';
import { Review } from 'data/review.model';
import { stringify } from 'querystring';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from 'services/account/account.service';
import { BookingService } from 'services/booking/booking.service';
import { GenericEditingService } from 'services/editable/generic-editing.service';
import { ACCOUNT_EDITING_SERVICE } from '../account-editing.token';
import { ToastrService } from 'ngx-toastr'; // adding ngx-toastr for api service error notifications
import { OktaAuthService, UserClaims } from '@okta/okta-angular';

@Component({
  selector: 'uic-account',
  templateUrl: './account.component.html',
})
export class AccountComponent {
  account$: Observable<Account> | undefined;
  address$: Observable<Address> | undefined;
  bookings$: Observable<Booking[]> | undefined;
  payments$: Observable<Payment[]> | undefined;
  profiles$: Observable<Profile[]> | undefined;
  reviews$: Observable<Review[]> | undefined;
  toastrServiceProp = this.toastrService;
  email: string;

  constructor(
    public oktaAuth: OktaAuthService,
    private readonly accountService: AccountService,
    private readonly bookingService: BookingService,
    @Inject(ACCOUNT_EDITING_SERVICE)
    public editingService: GenericEditingService<Partial<Account>>,
    private readonly toastrService: ToastrService
  ) {
    this.email = '';
    this.init();
  }

  async init(): Promise<void> {
    const userClaims = await this.oktaAuth.getUser();
    this.email = userClaims.email as string;
    console.log(this.email);
    this.account$ = this.accountService.getEmail(this.email);
    // TODO: get only the bookings of this account
    this.bookings$ = this.bookingService.get();

    this.reviews$ = of([
      // Not yet implemented
    ]);
    this.address$ = this.account$.pipe(map((account) => account.address));
    this.payments$ = this.account$.pipe(map((account) => account.payments));
    this.profiles$ = this.account$.pipe(map((account) => account.profiles));

    // Pass initial model to editingService which acts as model for overwriting data coming in
    this.account$.subscribe(
      (e) => this.editingService.update(e),
      (err) => {
        console.log(err);
        this.toastrService.error(`${err.message}`, 'Service Error', {
          disableTimeOut: true,
          positionClass: 'toast-top-center',
        });
      }
    );
    // Register function for Payload release from editing service
    this.editingService.payloadEmitter.subscribe((val) => this.update(val as Account));
  }

  callToastrError(msg: string, kind: string): void {
    this.toastrService.error(msg, kind, {
      disableTimeOut: true,
      positionClass: 'toast-top-center',
    });
  }

  /**
   * Function registered to the editing service
   */
  private update(payload: Account): void {
    this.accountService.put(payload).subscribe({
      next: (e) => console.log(e),
      error: (e) => console.error(e),
    });
  }
}
