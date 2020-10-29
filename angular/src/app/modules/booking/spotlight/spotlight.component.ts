import { Component, Input, OnChanges } from '@angular/core';
import { Lodging } from 'src/app/data/lodging.model';

@Component({
  selector: 'uic-spotlight',
  templateUrl: './spotlight.component.html',
})
export class SpotlightComponent implements OnChanges {
  @Input() lodgings!: Lodging[] | null;
  selectedLodging: Lodging | null = null;
  spotlight = false;

  // Need to change this to an array of strings later because the lodgings hold an array of url strings!
  imageUrl!: string;

  ngOnChanges(): void {
    this.setSpotlight(this.lodgings);
  }

  setSpotlight(lodgings: Lodging[] | null): void {
    let temp = 0;
    this.imageUrl = '';
    // Initializing the array of url strings to be empty
    if (lodgings) {
      for (const lodging of lodgings) {
        lodging.imageUrls = [];
      }
    }
    console.log('Lodgings: ', this.lodgings);
    if (lodgings) {
      for (const lodging of lodgings) {
        if (lodging.rentals.length > temp) {
          temp = lodging.rentals.length;
          this.selectedLodging = lodging;
          console.log('Lodging:', lodging);
          console.log('SelectedLodging:', this.selectedLodging);
          // Change later!!
          if (this.selectedLodging) {
            // DUMMY DATA! Make imageURL an array and have a for loop that selects all the urls from selectedLodging
            this.selectedLodging.imageUrls[0] =
              'https://play-lh.googleusercontent.com/niSCOgqAwJyjNwyRbu1QvsBw0CM1DQg8ypE3_cbMWSnsI-0saVU3HDfPsbtYlT9ie4Q=w200-h300-rw';
            this.imageUrl = this.selectedLodging.imageUrls[0];
          }
          // Dynamically allocate the url strings from the selected lodging to the imageUrl array for display
          // this.selectedLodging.imageUrls.forEach(url => {
          //   console.log("Pushing url to imageURL array: ", url);
          //   this.imageUrl.push(url);
          // });
          // console.log("Url array after for each: ", this.imageUrl);
        }
      }
    }
  }
}
