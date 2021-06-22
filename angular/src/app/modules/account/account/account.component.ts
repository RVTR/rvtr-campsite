import { Component, Inject } from '@angular/core';
import { Account } from 'data/account.model';
import { Address } from 'data/address.model';
import { Booking } from 'data/booking.model';
import { Payment } from 'data/payment.model';
import { Profile } from 'data/profile.model';
import { Review } from 'data/review.model';
import { Observable, of } from 'rxjs';
import { AccountService } from 'services/account/account.service';
import { BookingService } from 'services/booking/booking.service';
import { GenericEditingService } from 'services/editable/generic-editing.service';
import { ACCOUNT_EDITING_SERVICE } from '../account-editing.token';
import { ToastrService } from 'ngx-toastr';
import { OktaAuthService } from '@okta/okta-angular';

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

    this.account$ = this.accountService.get(userClaims.email as string);
    this.account$.subscribe(
      (account) => {
        this.address$ = of(account.address);
        this.bookings$ = this.bookingService.get(account.entityId);
        this.payments$ = of(account.payments);
        this.profiles$ = of(account.profiles);
        this.reviews$ = of([]);
      },
      () => {
        this.account$ = this.accountService.post({
          entityId: '0',
          id: '',
          address: {
            entityId: '0',
            city: 'Austin',
            country: 'USA',
            postalCode: '73300',
            stateProvince: 'TX',
            street: '123 Middle St',
          },
          email: userClaims.email as string,
          name: '',
          payments: [
            {
              id: '',
              cardExpirationDate: '2022-06-22',
              cardNumber: '1234123412341234',
              securityCode: '123',
              cardName: 'Visa',
            },
          ],
          profiles: [
            {
              id: 0,
              email: userClaims.email as string,
              familyName: 'Parker',
              givenName: 'Dave',
              phone: '219721234',
              type: 'string',
              imageUri: '',
            },
          ],
        });

        this.account$.subscribe((account) => {
          this.address$ = of(account.address);
          this.bookings$ = this.bookingService.get(account.entityId);
          this.payments$ = of(account.payments);
          this.profiles$ = of(account.profiles);
          this.reviews$ = of([]);
        });
      }
    );

    // Pass initial model to editingService which acts as model for overwriting data coming in
    this.account$.subscribe(
      (e) => this.editingService.update(e),
      (err) => {
        this.toastrService.info(`${err.message}`, 'Service Info', {
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
