import { Component, OnInit, Inject } from '@angular/core';
import { Account } from 'data/account.model';
import { Address } from 'data/address.model';
import { Booking } from 'data/booking.model';
import { Payment } from 'data/payment.model';
import { Profile } from 'data/profile.model';
import { Review } from 'data/review.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from 'services/account/account.service';
import { GenericEditingService } from 'services/editable/generic-editing.service';
import { ACCOUNT_EDITING_SERVICE } from '../account-editing.token';

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

  private readonly id = '-1';
  accountId = this.id;

  constructor(
    private readonly accountService: AccountService,
    @Inject(ACCOUNT_EDITING_SERVICE)
    editingService: GenericEditingService<Partial<Account>>
  ) {
    this.account$ = this.accountService.get(this.id);
    this.bookings$ = of([
      {
        id: '100',
        accountId: '100',
        lodgingId: '100',
        guests: [],
        rentals: [],
        checkIn: '2020-10-01',
        checkOut: '2020-10-01',
      },
      {
        id: '200',
        accountId: '100',
        lodgingId: '100',
        guests: [],
        rentals: [],
        checkIn: '2020-11-01',
        checkOut: '2020-10-01',
      },
    ]);
    this.reviews$ = of([
      {
        id: '100',
        comment: '',
        dateCreated: '2020-08-01',
        rating: 8.0,
      },
      {
        id: '100',
        comment: '',
        dateCreated: '2020-09-01',
        rating: 8.5,
      },
    ]);
    this.address$ = this.account$.pipe(map((account) => account.address));
    this.payments$ = this.account$.pipe(map((account) => account.payments));
    this.profiles$ = this.account$.pipe(map((account) => account.profiles));

    // Pass initial model to editingService which acts as model for overwriting data coming in
    this.account$.subscribe((e) => editingService.update(e));
    // Register function for Payload release from editing service
    editingService.payloadEmitter.subscribe((val) => this.update(val as Account));
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
