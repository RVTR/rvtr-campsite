import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { ReservationComponent } from './reservation/reservation.component';

const routes: Routes = [
  { component: ReservationComponent, path: 'reservation/:id' },
  { component: BookingComponent, path: '' }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class BookingRoutingModule {}
