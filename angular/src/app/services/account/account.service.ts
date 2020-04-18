import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Account } from '../../data/account/account.model';
// import { url } from 'inspector';
import { Configuration } from './config';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accountsUrl = 'api/accounts';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private config: Configuration) { }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  log(message: string) {
    console.log(message);
  }

  // Get Methods ---------------------------------------------

  // getAccounts(): Observable<Account[]> { 
  //   return this.http.get<Account[]>(this.config.url);
  // }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountsUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Account[]>('getAccounts', []))
      );
  }

  getAccountNo404<Data>(id: number): Observable<Account> { // Fail gradefully
    const url = `${this.accountsUrl}/?id=${id}`;
    return this.http.get<Account[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Account>(`getHero id=${id}`))
      );
  }


  // Post methods --------------------------------------------
  addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.accountsUrl, account, this.httpOptions).pipe(
      tap((newAccount: Account) => this.log(`added new account with id=${newAccount.accountID}`)),
      catchError(this.handleError<Account>('addAccount'))
    );
  }
  // post(){
  //   this.http.post(this.config.url, Account).toPromise().then((res) => {
  //     // some logic here 
  //   });
  // }

  // Update Account ------------------------------------------
  updateAccount(account: Account): Observable<any> {
    return this.http.put(this.accountsUrl, account, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${account.accountID}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  // Delete Account ------------------------------------------
  deleteAccount(account: Account | number): Observable<Account> {
    const id = typeof account === 'number' ? account : account.accountID;
    const url = `${this.accountsUrl}/${id}`;

    return this.http.delete<Account>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Account>('deleteHero'))
    );
  }
  
  
}