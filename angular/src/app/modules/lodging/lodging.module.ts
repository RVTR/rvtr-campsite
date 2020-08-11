import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LodgingRoutingModule } from './lodging-routing.module';
import { LodgingComponent } from './lodging/lodging.component';

@NgModule({
  declarations: [LodgingComponent],
  imports: [CommonModule, LodgingRoutingModule],
})
export class LodgingModule {}
