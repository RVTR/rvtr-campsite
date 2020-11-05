import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Lodging } from 'src/app/data/lodging.model';

@Component({
  selector: 'uic-spotlight',
  templateUrl: './spotlight.component.html',
})
export class SpotlightComponent implements OnChanges {
  @Input() lodgings!: Lodging[] | null;
  selectedLodging: Lodging | null = null;
  spotlight = true;

  constructor(private router: Router) {}

  ngOnChanges(): void {
    this.setSpotlight(this.lodgings);
  }

  setSpotlight(lodgings: Lodging[] | null): void {
    let temp = 0;
    if (lodgings) {
      for (const lodging of lodgings) {
        if (lodging.rentals.length > temp) {
          temp = lodging.rentals.length;
          this.selectedLodging = lodging;
        }
      }
    }
  }

  featureClick(thisLodging: Lodging): void {
    console.log('Going to lodging details for' + thisLodging.name);
    this.router.navigate(['/lodging/details/' + thisLodging.id]);
  }
}
