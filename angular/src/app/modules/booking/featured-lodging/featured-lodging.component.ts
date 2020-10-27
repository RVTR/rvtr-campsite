import { Component, Input, OnChanges } from '@angular/core';
import { Lodging } from 'src/app/data/lodging.model';
import { Router } from '@angular/router';

@Component({
  selector: 'uic-featured-lodging',
  templateUrl: './featured-lodging.component.html',
})
export class FeaturedLodgingComponent implements OnChanges {
  @Input() featuredLodgings!: Lodging[] | null;
  displayLodgings: Lodging[] = [];

  constructor(private router: Router) { }

  ngOnChanges(): void {
    if (this.featuredLodgings) {
      this.displayLodgings = this.featuredLodgings.slice(0, 6);
    }
  }

  featureClick(thisLodging: Lodging){
    console.log("Going to lodging details for"+ thisLodging.name);
    // console.log(thisLodging);
    this.router.navigate(['/lodging/details/'+ thisLodging.id]);
  }
}
