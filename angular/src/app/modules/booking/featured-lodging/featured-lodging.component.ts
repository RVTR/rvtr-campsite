import { Component, Input, OnChanges } from '@angular/core';
import { Lodging } from 'src/app/data/lodging.model';
import { Router } from '@angular/router';
import { Rental } from '../../../data/rental.model';

@Component({
  selector: 'uic-featured-lodging',
  templateUrl: './featured-lodging.component.html',
})
export class FeaturedLodgingComponent implements OnChanges {
  @Input() featuredLodgings!: Lodging[] | null;
  displayLodgings: Lodging[] = [];
  lotAvailableStringsByLodgingId = new Map<number, string[]>();

  constructor(private router: Router) {}

  ngOnChanges(): void {
    if (this.featuredLodgings) {
      this.displayLodgings = this.featuredLodgings.slice(0, 6);
      this.setAvailableCountsByType();
    }
  }

  /**
   * Sets a map property in this.displayLodgings to keep track of availible rentals by type
   */
  public setAvailableCountsByType(): void {
    console.log('Lodgings:');
    console.log(this.displayLodgings);
    for (const thisLodging of this.displayLodgings) {
      const thisLodgingId = thisLodging.id;
      const lodgingLotTypes: string[] = [];
      const totalCountByType: Map<string, number> = new Map<string, number>();
      const availableCountByType: Map<string, number> = new Map<string, number>();
      for (const thisLot of thisLodging.rentals) {
        const thisLotType = thisLot.unit.name;
        if (lodgingLotTypes.indexOf(thisLotType) === -1) {
          lodgingLotTypes.push(thisLotType);
        }
        let incrementIfAvailable = 0;
        if (thisLot.status.toLocaleLowerCase() === 'available') {
          incrementIfAvailable = 1;
        }
        const thisTypeCount = availableCountByType.get(thisLotType);
        if (thisTypeCount === undefined) {
          availableCountByType.set(thisLotType, incrementIfAvailable);
        } else {
          availableCountByType.set(thisLotType, thisTypeCount + incrementIfAvailable);
        }
        const thisTypeTotalCount = totalCountByType.get(thisLotType);
        if (thisTypeTotalCount === undefined) {
          totalCountByType.set(thisLotType, 1);
        } else {
          totalCountByType.set(thisLotType, thisTypeTotalCount + 1);
        }
      }
      const thisLodgingLotCountStrings: string[] = [];
      for (const thisLodgingLotType of lodgingLotTypes) {
        if (thisLodgingLotType !== undefined) {
          const thisLodgingTypeCount = availableCountByType.get(thisLodgingLotType);
          const thisLodgingTypeTotalCount = totalCountByType.get(thisLodgingLotType);
          thisLodgingLotCountStrings.push(
            thisLodgingLotType +
              ': ' +
              thisLodgingTypeCount +
              ' of ' +
              thisLodgingTypeTotalCount +
              ' Available'
          );
        }
      }
      this.lotAvailableStringsByLodgingId.set(thisLodgingId, thisLodgingLotCountStrings);
    }
    console.log('Lodging count strings:');
    console.log(this.lotAvailableStringsByLodgingId);
  }

  featureClick(thisLodging: Lodging): void {
    console.log('Going to lodging details for' + thisLodging.name);
    this.router.navigate(['/lodging/details/' + thisLodging.id]);
  }
}
