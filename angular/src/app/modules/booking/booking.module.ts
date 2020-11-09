import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './booking/booking.component';
import { BookingRoutingModule } from './booking-routing.module';
import { SpotlightComponent } from './spotlight/spotlight.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { FeaturedLodgingComponent } from './featured-lodging/featured-lodging.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [
    BookingComponent,
    SearchBarComponent,
    SpotlightComponent,
    SearchResultsComponent,
    FeaturedLodgingComponent,
  ],
  imports: [BookingRoutingModule, CommonModule, ReactiveFormsModule],
})
export class BookingModule {}
