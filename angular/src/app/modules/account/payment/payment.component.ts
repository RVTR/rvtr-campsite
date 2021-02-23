import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Payment, PostPayment } from '../../../data/payment.model';
import { Account } from '../../../data/account.model';
import { AccountService } from 'src/app/services/account/account.service';
import { GenericEditingService } from '../../../services/editable/generic-editing.service';
import { ACCOUNT_EDITING_SERVICE } from '../../account/account-editing.token';

@Component({
  selector: 'uic-payment',
  templateUrl: './payment.component.html',
})
/**
 * Class representing a user's payment information
 */
export class PaymentComponent {
  @Input() payments!: Payment[];
  // @Input() accountId! : string;
  @Input() email!: string;
  @Output() paymentsEdited = new EventEmitter();

  editMode = false;
  titleEdit = 'Click To Edit Your Payment Information';

  /**
   * Represents the _Payment Component_ 'constructor' method
   * @param editingService AccountEditingService
   */
  constructor(
    @Inject(ACCOUNT_EDITING_SERVICE)
    private readonly editingService: GenericEditingService<Partial<Account>>,
    private readonly accountService: AccountService
  ) {}

  /**
   * Adds a new set of payment information
   * @param card Payment
   */
  addCard(card: PostPayment): void {
    // card.accountId = this.accountId;
    card.email = this.email;
    this.accountService.postPayment(card).subscribe(
      (newCard) =>
        this.payments.push({
          id: newCard.id,
          cardName: newCard.cardName,
          cardNumber: newCard.cardNumber,
          securityCode: newCard.securityCode,
          cardExpirationDate: newCard.cardExpirationDate,
        }),
      (e) => console.error(e)
    );
  }

  /**
   *  Updates the _Editing Service_ with the new payment information
   */
  edited(): void {
    this.editingService.update({ payments: this.payments });
  }
}
