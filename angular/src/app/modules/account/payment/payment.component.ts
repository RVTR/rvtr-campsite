import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Payment, PostPayment } from '../../../data/payment.model';
import { AccountService } from 'src/app/services/account/account.service';

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

  /**
   * Represents the _Payment Component_ 'constructor' method
   */
  constructor(private readonly accountService: AccountService) {}

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
}
