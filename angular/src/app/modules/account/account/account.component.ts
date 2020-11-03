import { Component, Inject } from '@angular/core';
import { Account } from 'data/account.model';
import { Address } from 'data/address.model';
import { Booking } from 'data/booking.model';
import { Payment } from 'data/payment.model';
import { Profile } from 'data/profile.model';
import { Review } from 'data/review.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from 'services/account/account.service';
import { BookingService } from 'services/booking/booking.service';
import { GenericEditingService } from 'services/editable/generic-editing.service';
import { ACCOUNT_EDITING_SERVICE } from '../account-editing.token';
import { ToastrService } from 'ngx-toastr'; // adding ngx-toastr for api service error notifications

@Component({
  selector: 'uic-account',
  templateUrl: './account.component.html',
})
export class AccountComponent {
  account$: Observable<Account>;
  address$: Observable<Address>;
  bookings$: Observable<Booking[]>;
  payments$: Observable<Payment[]>;
  profiles$: Observable<Profile[]>;
  reviews$: Observable<Review[]>;
  toastrServiceProp = this.toastrService;

  private readonly id = '-1';
  accountId = this.id;

  constructor(
    private readonly accountService: AccountService,
    private readonly bookingService: BookingService,
    @Inject(ACCOUNT_EDITING_SERVICE)
    editingService: GenericEditingService<Partial<Account>>,
    private readonly toastrService: ToastrService
  ) {
    this.account$ = this.accountService.get(this.id);

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
      (e) => editingService.update(e),
      (err) => {
        console.log(err);
        this.callToastrError(err, 'Service Error');
      }
    );
    // Register function for Payload release from editing service
    editingService.payloadEmitter.subscribe((val) => this.update(val as Account));
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
