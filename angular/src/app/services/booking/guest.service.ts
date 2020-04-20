import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Guest } from '../../data/booking/guest.model';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { Config } from './config.booking';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  constructor(private _http: HttpClient, public _config: Config) {}

  getGuests(): Observable<Guest[]> {
    return this._http.get<Guest[]>(this._config.guest.uri)
                     .pipe(
                        tap(_ => console.log("Getting all guests")),
                        catchError(this.handleError<Guest[]>("Error in get Guest", []))
                      );
  }

  saveGuest(guest: Guest): Observable<Guest> {
    return this._http.post<Guest>(this._config.guest.uri, guest, this.httpOptions)
                     .pipe(
                            tap(newGuest => console.log(`saved guest was: ${JSON.stringify(newGuest)}\n`)),
                            catchError(this.handleError<Guest>("post error"))
                      );
  }

  put(guest: Guest): Observable<Guest> {
    return this._http.put(this._config.guest.uri, guest)
                      .pipe(this.handleError<Guest>("Error in put Guest"));
  }

  delete(guestId: number): Observable<Guest> {
    const url = `${this._config.guest.uri}/${guestId}`;
    return this._http.delete(url)
                .pipe(this.handleError<Guest>("Error in deleting guest"));
  }

 private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T)
    }
  }
}