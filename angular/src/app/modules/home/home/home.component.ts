import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'uic-home',
  templateUrl: './home.component.html',
  styleUrls: [],
})
export class HomeComponent implements OnInit {
  isAuthenticated$!: Observable<boolean>;

  constructor(private readonly identity: OktaAuthService) {
    this.isAuthenticated$ = identity.$authenticationState;
  }

  ngOnInit(): void {
    this.isAuthenticated$ = from(this.identity.isAuthenticated());
  }

  signIn(): void {
    this.identity.loginRedirect('/account');
  }

  signOut(): void {
    this.identity.logout();
  }
}
