import { Component, Output, EventEmitter } from '@angular/core';
import { forkJoin } from 'rxjs';
import { BookingService } from 'src/app/services/booking/booking.service';
import { Lodging } from '../../../data/lodging.model';
import { LodgingService } from '../../../services/lodging/lodging.service';
import { Filter } from 'src/app/data/filter.model';
import {
  FormControl,
  FormGroup,
  Validators,
  ValidationErrors,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'uic-search-bar',
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  @Output() searchResults = new EventEmitter<Lodging[]>();
  @Output() searchQuery = new EventEmitter<string>();
  @Output() isSearched = new EventEmitter<boolean>();

  searchForm: FormGroup;

  constructor(
    private readonly bookingService: BookingService,
    private readonly lodgingService: LodgingService
  ) {
    const dateNow = this.getDateNow();
    this.searchForm = this.makeSearchForm(dateNow);
  }

  getDateNow(): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }

  makeSearchForm(dateNow: string): FormGroup {
    return new FormGroup({
      location: new FormControl(''),
      staydates: new FormGroup(
        {
          checkin: new FormControl(''),
          checkout: new FormControl(''),
        },
        [this.datesValidator(dateNow)]
      ),
      adults: new FormControl(''),
      children: new FormControl(''),
    });
  }

  datesValidator(dateNow: string): ValidatorFn {
    // Factory function to return a control function based on parameters
    return (thisControl: AbstractControl): ValidationErrors | null => {
      if (thisControl === undefined || thisControl.value === undefined) {
        return { undefinedInput: true };
      }
      const checkInVal = thisControl.value.checkin;
      const checkOutVal = thisControl.value.checkout;
      if ((checkInVal === '' && checkOutVal !== '') || (checkInVal !== '' && checkOutVal === '')) {
        return { incompleteDates: true }; // In/out incomplete (cannot just have one date)
      }
      if (checkInVal === '' || checkOutVal === '') {
        // In/out cannot both be empty
        return { emptyDates: true };
      }
      if (checkInVal < dateNow || checkOutVal < dateNow) {
        return { beforeNow: true }; // Search dates cannot be bafore today's date
      }
      if (checkOutVal < checkInVal) {
        return { outBeforeIn: true }; // Check-out cannot be before check-in
      }
      return null;
    };
  }

  async onSubmit(): Promise<void> {
    console.log('Submitting form');
    const form = this.searchForm;
    console.log(form);
    const adults = form.value.adults ? parseInt(form.value.adults, 10) : 0;
    const children = form.value.children ? parseInt(form.value.children, 10) : 0;
    const occupancy = `${adults + children}`;
    const splitLocation = form.value.location.split(', ', 2);
    const searchCity = splitLocation[0];
    const searchState = splitLocation[1];
    const city: string = searchCity;
    const stateProvince: string = searchState;
    const country = 'USA';
    const checkIn: string = form.value.staydates.checkin;
    const checkOut: string = form.value.staydates.checkout;

    const filter: Filter = { city, stateProvince, country, occupancy };

    const lodgings$ = this.lodgingService.get(filter);
    const bookings$ = this.bookingService.getByDateRange(checkIn, checkOut);

    forkJoin([lodgings$, bookings$]).subscribe(([lodgings, bookings]) => {
      const availableLodgings: Lodging[] = lodgings;

      // Loop through booked dates, check their lodging ids,
      // then loop through the booked rentals to compare
      // with the lodging rentals, and splice off booked rentals
      /* tslint:disable */
      for (let i = 0; i < bookings.length; i++) {
        for (let j = 0; j < lodgings.length; j++) {
          if (bookings[i].lodgingId === lodgings[j].entityId) {
            for (let k = 0; k < bookings[i].rentals.length; k++) {
              for (let l = 0; l < lodgings[j].rentals.length; l++) {
                if (bookings[i].rentals[k].lodgingRentalId === +lodgings[j].rentals[l].id) {
                  availableLodgings[j].rentals.splice(l, 1);
                }
              }
            }
          }
        }
      }
      /* tslint:enable */

      let searchResultString = '';
      if (city === undefined || city === '') {
        searchResultString += 'City: (Any)';
      } else {
        searchResultString += 'City: ' + city;
      }
      searchResultString += 'State: ' + stateProvince;
      searchResultString += 'Country: ' + country;

      if (occupancy === undefined || occupancy === '' || occupancy === '0') {
        searchResultString += ', Occupancy: (Any)';
      } else {
        searchResultString += ', Occupancy: ' + occupancy;
      }
      searchResultString += `, Dates: ${checkIn} - ${checkOut}`;

      this.searchResults.emit(availableLodgings);
      this.searchQuery.emit(searchResultString);
      this.isSearched.emit(true);
    });
  }
}
