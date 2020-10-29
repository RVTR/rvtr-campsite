import { Component, Input, OnChanges } from '@angular/core';
import { Lodging } from 'src/app/data/lodging.model';

@Component({
  selector: 'uic-featured-lodging',
  templateUrl: './featured-lodging.component.html',
})
export class FeaturedLodgingComponent implements OnChanges {
  @Input() featuredLodgings!: Lodging[] | null;
  displayLodgings: Lodging[] = [];

  imageUrls: string[] = [];

  ngOnChanges(): void {
    if (this.featuredLodgings) {
      this.displayLodgings = this.featuredLodgings.slice(0, 6);
      console.log('Lodging before adding imageUrl: ', this.displayLodgings);

      // Initialize the array of url strings to be an empty array
      for (const lodging of this.displayLodgings) {
        // DUMMY DATA, change later once the lodgings have their own image urls already
        lodging.imageUrls = [];
        lodging.imageUrls[0] =
          'https://btrtoday.sfo2.digitaloceanspaces.com/uploads/Featured-1.png';
      }
      console.log('Lodging after adding imageUrl: ', this.displayLodgings);
    }
  }
}
