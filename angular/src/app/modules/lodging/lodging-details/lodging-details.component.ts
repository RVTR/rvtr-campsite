import { Component, OnInit } from '@angular/core';
import { Lodging } from '../../../data/lodging.model';
import { ActivatedRoute } from '@angular/router';
import { LodgingService } from '../../../services/lodging/lodging.service';
import { Review } from 'data/review.model';
import * as moment from 'moment';
import { Profile } from 'data/profile.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'uic-lodging-details',
  templateUrl: './lodging-details.component.html',
})
export class LodgingDetailsComponent implements OnInit {
  /**
   * fields used in this component
   */
  lodging: Lodging | null = null;
  review: Review;
  profile: Profile;
  Comment: FormGroup;

  /**
   * provide activated route to get route parameters and lodging service to get lodging
   * @param route route gives access to URL where the component will be displayed
   * @param lodgingService service that requests lodging information
   */
  constructor(
    private readonly route: ActivatedRoute,
    private readonly lodgingService: LodgingService
  ) {


    this.Comment = new FormGroup({
      score: new FormControl(''),
      message: new FormControl(''),
    })

    //Populating the profile with dummy data
    this.profile = {
      id: "1",
      email: "Email@email.com",
      type: "adult",
      givenName: "Guy",
      familyName: "Ferri",
      phone: "111-111-1111"
    }
    
    //Populating the review with empty values
    this.review = {
      id: "",
      name: "",
      comment: "",
      dateCreated: "",
      rating: 0
    };

  }

  /**
   * On init, get the lodging for which the details will be displayed
   */
  ngOnInit(): void {
    this.getLodgingById();
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
          this.lodging.reviews = [];
          console.log(this.lodging)
          this.lodgingService.getImages(idString).subscribe((urls) => {
            if (this.lodging != null) {
              this.lodging.imageUrls = urls;
            }
          });
        });
      }
    });
  }

  /*
  * Posts the user's comment on the lodging details page
  */
  OnSubmit(){
    this.review.id = this.profile.id;
    this.review.comment = this.Comment.get('message')?.value;
    this.review.dateCreated = moment().format('MMMM Do YYYY, h:mm:ss a');
    this.review.rating = this.Comment.get('score')?.value;

    //Grabs the name from local storage
    let tempName = JSON.parse(localStorage.getItem("okta-token-storage") as string);
    this.review.name = tempName.idToken.claims.name;

    //Adds the review to lodging reviews array
    this.lodging?.reviews.push(this.review);

    //Implementing adding the review to backend at a later date
    // this.lodgingService.put();
  }
}
