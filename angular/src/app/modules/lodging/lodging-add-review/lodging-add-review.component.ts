import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Lodging } from '../../../data/lodging.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReviewService } from './../../../services/lodging/review.service';
import { Review } from '../../../data/review.model';
import { Account } from '../../../data/account.model';

@Component({
  selector: 'uic-lodging-add-review',
  templateUrl: './lodging-add-review.component.html',
})
export class LodgingAddReviewComponent implements OnInit {

  @Output() submitted = new EventEmitter<boolean>();

  reviewForm = new FormGroup({
    comment: new FormControl('', [
      Validators.required
    ]),
    rating: new FormControl(Number, [
      Validators.required,
      Validators.max(10),
      Validators.min(0)
    ]),
  });

  get ratingField() { return this.reviewForm.get('rating'); }
  get commentField() { return this.reviewForm.get('comment'); }

  public account: Account;
  public lodge: Lodging;

  currentDate = new Date(Date.now());

  constructor(private readonly reviewService: ReviewService) { }
  ngOnInit(): void { }

  canSubmit() {
    return this.reviewForm.controls.comment.valid &&
           this.reviewForm.controls.rating.valid &&
           !this.reviewForm.pristine;
  }

  submitReview() {
    const now = new Date(Date.now());
    const year = `${now.getFullYear()}`;
    const month = `${(now.getMonth() + 1)}`.padStart(2, '0');
    const day = `${now.getDate()}`.padStart(2, '0');
    const hour = `${now.getHours()}`.padStart(2, '0');
    const minutes = `${now.getMinutes()}`.padStart(2, '0');
    const seconds = `${now.getSeconds()}`.padStart(2, '0');
    const millis = `${now.getMilliseconds()}`.padStart(3, '0');
    const dateStr = `${year}-${month}-${day}T${hour}:${minutes}:${seconds}.${millis}Z`;
    const review: Review = {
      id: '0',
      accountId: this.account.id,
      lodgingId: this.lodge.id,
      comment: this.reviewForm.controls.comment.value,
      dateCreated: dateStr,
      rating: this.reviewForm.controls.rating.value,
    };

    this.reviewService.post(review).subscribe(_ => {
      this.submitted.emit(true);
    });
  }

  public reset() {
    this.account = null;
    this.lodge = null;
    this.currentDate = new Date(Date.now());
    this.reviewForm.reset();
    this.reviewForm.markAsPristine();
    Object.keys(this.reviewForm.controls).forEach(key => {
      this.reviewForm.get(key).setErrors(null);
    });
  }

  public setAccount(account: Account): void {
    if (!account) {
      const placeholderAccount: Account = {
        id: '1',
        address: null,
        name: 'Anonymous',
        payments: [],
        profiles: [],
      };
      this.account = placeholderAccount;
    } else {
      this.account = account;
    }
  }

  public setLodge(lodge: Lodging): void {
    this.lodge = lodge;
  }



}