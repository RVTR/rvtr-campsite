import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { Booking } from '../../data/booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private readonly bookingsUrl$: Observable<string>;

  /**
   * Represents the _Booking Service_ `constructor` method
   *
   * @param config ConfigService
   * @param http HttpClient
   */
  constructor(config: ConfigService, private readonly http: HttpClient) {
    const config$ = config.get();
    this.bookingsUrl$ = config$.pipe(
      map((cfg) => `${cfg.api.booking.base}${cfg.api.booking.uri.booking}`)
    );
  }

  /**
   * Gets all bookings where the existing checkIn and checkOut dates
   * intersect with the given checkIn and checkOut dates
   *
   * @param checkIn string
   * @param checkOut string
   */
  getByDateRange(checkIn: string, checkOut: string): Observable<Booking[]> {
    const params = new HttpParams().set('checkIn', checkIn).set('checkOut', checkOut);
    return this.bookingsUrl$.pipe(
      concatMap((url) => this.http.get<Booking[]>(url, { params }))
    );
  }

  /**
   * Represents the _Booking Service_ `delete` method
   *
   * @param id string
   */
  delete(id: string): Observable<void> {
    return this.bookingsUrl$.pipe(
      map((url) => url.concat(`/${id}`)),
      concatMap((url) => this.http.delete<void>(url))
    );
  }

  /**
   * Represents the _Booking Service_ `get` method
   *
   * @param id string
   */
  get(id?: string): Observable<Booking[]> {
    return this.bookingsUrl$.pipe(
      map((url) => (id ? url.concat(`/${id}`) : url)),
      concatMap((url) => this.http.get<Booking[]>(url))
    );
  }

  /**
   * Represents the _Booking Service_ `post` method
   *
   * @param booking Booking
   */
  post(booking: Booking): Observable<Booking> {
    return this.bookingsUrl$.pipe(concatMap((url) => this.http.post<Booking>(url, booking)));
  }

  /**
   * Represents the _Booking Service_ `put` method
   *
   * @param booking Booking
   */
  put(booking: Booking): Observable<Booking> {
    return this.bookingsUrl$.pipe(concatMap((url) => this.http.put<Booking>(url, booking)));
  }
}
