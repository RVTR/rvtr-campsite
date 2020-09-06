import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';

const routes: Routes = [
  {
    component: OktaCallbackComponent,
    path: 'oauth2/authorize',
  },
  {
    canActivate: [OktaAuthGuard],
    loadChildren: () =>
      import('@modules/account/account.module').then((module) => module.AccountModule),
    path: 'account',
  },
  {
    canActivate: [OktaAuthGuard],
    loadChildren: () =>
      import('@modules/booking/booking.module').then((module) => module.BookingModule),
    path: 'booking',
  },
  {
    loadChildren: () => import('@modules/home/home.module').then((module) => module.HomeModule),
    path: '',
  },
  {
    loadChildren: () =>
      import('@modules/lodging/lodging.module').then((module) => module.LodgingModule),
    path: 'lodging',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
