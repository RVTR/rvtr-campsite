import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    const city: string = form.value.location;

    const checkIn: string = form.value.staydates.checkin;
    const checkOut: string = form.value.staydates.checkout;

    const filter: Filter = { city, occupancy };

    const lodgings$ = this.lodgingService.get(filter);
    const bookings$ = this.bookingService.getByDateRange(checkIn, checkOut);

    forkJoin([lodgings$, bookings$]).subscribe(([lodgings, bookings]) => {
      const bookedLodgingIds: number[] = bookings.map((booking) => booking.lodgingId);
      const availableLodgings: Lodging[] = lodgings.filter(
        (lodging) => !bookedLodgingIds.includes(lodging.id)
      );

      this.searchResults.emit(availableLodgings);
      this.searchQuery.emit(
        `City: ${city}, Occupancy: ${occupancy}, Dates: ${checkIn} - ${checkOut}`
      );
      this.isSearched.emit(true);
    });
  }
}
