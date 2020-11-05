import { Component, OnInit } from '@angular/core';
import { Lodging } from '../../../data/lodging.model';
import { ActivatedRoute } from '@angular/router';
import { LodgingService } from '../../../services/lodging/lodging.service';
import { Review } from 'data/review.model';
import { Profile } from 'data/profile.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'services/booking/booking.service';

@Component({
  selector: 'uic-lodging-details',
  templateUrl: './lodging-details.component.html',
})
export class LodgingDetailsComponent implements OnInit {
  /**
   * fields used in this component
   */
  lodging: Lodging | null = null;
  profile: Profile;
  Comment: FormGroup;
  hasBooked = false;

  /**
   * provide activated route to get route parameters and lodging service to get lodging
   * @param route route gives access to URL where the component will be displayed
   * @param lodgingService service that requests lodging information
   */
  constructor(
    private readonly route: ActivatedRoute,
    private readonly lodgingService: LodgingService,
    private readonly bookingService: BookingService
  ) {
    this.Comment = new FormGroup({
      score: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    });

    // Populating the profile with dummy data
    this.profile = {
      id: 1,
      email: 'Email@email.com',
      type: 'adult',
      givenName: 'Guy',
      familyName: 'Ferri',
      phone: '111-111-1111',
    };
  }

  /**
   * On init, get the lodging for which the details will be displayed
   */
  ngOnInit(): void {
    this.getLodgingById();
    this.getBookingByAccountEmail(this.profile.email);
  }

  /**
   * get lodging by id based on the route /lodging/details/{id}
   */
  getLodgingById(): void {
    this.route.paramMap.subscribe((params) => {
      const idString = params.get('id');
      if (idString) {
        this.lodgingService.getById(idString).subscribe((data) => {
          this.lodging = data;
          console.log(this.lodging);
          this.lodgingService.getImages(idString).subscribe((urls) => {
            if (this.lodging != null) {
              this.lodging.imageUrls = urls;
            }
          });
        });
      }
    });
  }

  /**
   * See if the account ID is the same as the lodging ID to allow the user to comment
   */
  getBookingByAccountEmail(email: string): void {
    this.bookingService.getByAccountEmail(email).subscribe(
      (i) => {
        for (const index of i) {
          if (index.accountEmail === this.profile.email && this.lodging?.id === index.lodgingId) {
            this.hasBooked = true;
          }
        }
      },
      (err) => console.log(err)
    );
  }

  /*
   * Posts the user's comment on the lodging details page
   */
  OnSubmit(): void {
    // Make a new review obj
    let review: Review;

    const tempName = JSON.parse(localStorage.getItem('okta-token-storage') as string);

    // Filling the review obj with user submitted data
    if (this.lodging?.id) {
      review = {
        accountId: this.profile.id,
        comment: this.Comment.get('message')?.value,
        dateCreated: new Date().toUTCString(),
        rating: this.Comment.get('score')?.value,
        name: tempName.idToken.claims.name,
        lodgingId: this.lodging?.id,
      };
    } else {
      review = {
        accountId: 0,
        name: '',
        comment: '',
        dateCreated: '',
        rating: 0,
        lodgingId: 0,
      };
    }

    // Adds the review to lodging reviews array
    this.lodging?.reviews.push(review);

    // Implementing adding the review to backend at a later date
    this.lodgingService.postReview(review).subscribe(
      (r) => console.log(r),
      (err) => console.log(err)
    );
  }
}
