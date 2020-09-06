import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { GenericEditingService } from '@services/editable/generic-editing.service';
import { AccountComponent } from './account/account.component';
import { AccountBookingComponent } from './account-booking/account-booking.component';
import { AddressComponent } from './address/address.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountReviewComponent } from './account-review/account-review.component';
import { NewAddressFormComponent } from './new-address-form/new-address-form.component';
import { NewPaymentFormComponent } from './new-payment-form/new-payment-form.component';
import { EditableComponent } from './editable/editable.component';
import { ACCOUNT_EDITING_SERVICE } from './account-editing.token';

const routes: Routes = [{ component: AccountComponent, path: '' }];

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
  exports: [RouterModule],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class AccountRoutingModule {}
