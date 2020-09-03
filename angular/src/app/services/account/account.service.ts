import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { Account } from '../../data/account.model';
import { PostPayment } from '../../data/payment.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly accountsUrl$: Observable<string>;
  private readonly addressesUrl$: Observable<string>;
  private readonly profilesUrl$: Observable<string>;
  private readonly paymentsUrl$: Observable<string>;

  /**
   * Represents the _Account Service_ `constructor` method
   *
   * @param config ConfigService
   * @param http HttpClient
   */
  constructor(config: ConfigService, private readonly http: HttpClient) {
    const config$ = config.get();
    this.accountsUrl$ = config$.pipe(
      map((cfg) => `${cfg.api.account.base}${cfg.api.account.uri.account}`)
    );
    this.addressesUrl$ = config$.pipe(
      map((cfg) => `${cfg.api.account.base}${cfg.api.account.uri.address}`)
    );
    this.profilesUrl$ = config$.pipe(
      map((cfg) => `${cfg.api.account.base}${cfg.api.account.uri.profile}`)
    );
    this.paymentsUrl$ = config$.pipe(
      map((cfg) => `${cfg.api.account.base}${cfg.api.account.uri.payment}`)
    );
  }

  /**
   * Represents the _Account Service_ `delete` method
   *
   * @param id string
   */
  delete(id: string): Observable<boolean> {
    return this.accountsUrl$.pipe(
      map((url) => url.concat(`/${id}`)),
      concatMap((url) => this.http.delete<boolean>(url))
    );
  }

  /**
   * Represents the _Account Service_ `get` method
   *
   * @param id string
   */
  get(id: string): Observable<Account> {
    return this.accountsUrl$.pipe(
      map((url) => url.concat(`/${id}`)),
      concatMap((url) => this.http.get<Account>(url))
    );
  }

  /**
   * Represents the _Account Service_ `post` method
   *
   * @param account Account
   */
  post(account: Account): Observable<boolean> {
    return this.accountsUrl$.pipe(concatMap((url) => this.http.post<boolean>(url, account)));
  }

  /**
   * Represents the _Account Service_ `put` method
   *
   * @param account Account
   */
  put(account: Account): Observable<Account> {
    return this.accountsUrl$.pipe(concatMap((url) => this.http.put<Account>(url, account)));
  }

  /**
   *
   * @param payment
   * Represents the _Account Service_ 'post' method for payments
   */
  postPayment(payment: PostPayment): Observable<boolean> {
    return this.paymentsUrl$.pipe(concatMap((url) => this.http.post<boolean>(url, payment)));
  }
}
