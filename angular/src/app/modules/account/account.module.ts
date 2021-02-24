import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account/account.component';
import { AccountBookingComponent } from './account-booking/account-booking.component';
import { AddressComponent } from './address/address.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountReviewComponent } from './account-review/account-review.component';
import { NewAddressFormComponent } from './new-address-form/new-address-form.component';
import { NewPaymentFormComponent } from './new-payment-form/new-payment-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ACCOUNT_EDITING_SERVICE } from './account-editing.token';
import { GenericEditingService } from 'src/app/services/editable/generic-editing.service';
import { EditableComponent } from './editable/editable.component';

@NgModule({
  declarations: [
    AccountComponent,
    AccountBookingComponent,
    AddressComponent,
    PaymentComponent,
    ProfileComponent,
    AccountReviewComponent,
    NewAddressFormComponent,
    NewPaymentFormComponent,
    EditableComponent,
  ],
  providers: [
    {
      provide: ACCOUNT_EDITING_SERVICE,
      useFactory: () => new GenericEditingService<Partial<Account>>(),
    },
  ],
  imports: [CommonModule, AccountRoutingModule, ReactiveFormsModule],
})
export class AccountModule {}
