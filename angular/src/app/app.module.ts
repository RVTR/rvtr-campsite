import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from './layout/layout.module';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HelpComponent } from './data/help/help.component';

@NgModule({
  declarations: [AppComponent, HelpComponent],
  imports: [AppRoutingModule, BrowserModule, LayoutModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
