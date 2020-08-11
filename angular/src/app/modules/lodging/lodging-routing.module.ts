import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LodgingDetailsComponent } from './lodging-details/lodging-details.component';
import { LodgingComponent } from './lodging/lodging.component';

const routes: Routes = [
  { component: LodgingDetailsComponent, path: 'details/:id' },
  { component: LodgingComponent, path: '' },
];

@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class LodgingRoutingModule {}
