/**
 * importing the necessary modules, services and models.
 */
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Rental } from '../../../data/rental.model';

/**
 * Rental component metadata
 */
@Component({
  selector: 'uic-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.scss'],
})

/**
 * This class represents the Rental component
 */
export class RentalComponent implements OnInit, OnChanges {
  /**
   * rentals taken from the lodging-details lodging.rentals
   */
  @Input() rentals!: Rental[];
  /**
   * represents the set of rentals with unique types
   */
  rentalTypes: Rental[] = [];
  /**
   * maps the number of available rentals to the rental type
   */
  availabilityCount = new Map<string, number>();

  ngOnInit(): void {
    this.setRentalTypes(this.rentals);
  }

  // Whenever changes are made in the @Input, rerun setRentalTypes again to update the information
  ngOnChanges(changes?: SimpleChanges): void {
    this.setRentalTypes(this.rentals);
  }

  /**
   * populates rentalTypes and keeps track of the availability of each rental
   */
  public setRentalTypes(rentals: Rental[]): void {
    // loop through the lodging's rentals
    // check to see if a rental has the same type as one that's already in the rentalTypes
    // only keep track of the rental types that are unique
    // increment the availability count for each rental in rentals if they are available
    this.availabilityCount.clear();
    this.rentalTypes = [];
    for (const rental of rentals) {
      let count = this.availabilityCount.get(rental.type);
      if (count === undefined) {
        count = 0;
        this.rentalTypes.push(rental);
      }
      if (rental.status === 'available') {
        count += 1;
      }
      this.availabilityCount.set(rental.type, count);
    }
  }
}
