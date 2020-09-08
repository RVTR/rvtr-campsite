import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { Lodging } from '../../data/lodging.model';
import { Filter } from 'data/filter.model';

@Injectable({
  providedIn: 'root',
})
export class LodgingService {
  private readonly lodgingsUrl$: Observable<string>;
  private readonly rentalsUrl$: Observable<string>;
  private readonly reviewsUrl$: Observable<string>;

  /**
   * Represents the _Lodging Service_ `constructor` method
   *
   * @param config ConfigService
   * @param http HttpClient
   */
  constructor(config: ConfigService, private readonly http: HttpClient) {
    const config$ = config.get();
    this.lodgingsUrl$ = config$.pipe(
      map((cfg) => `${cfg.api.lodging.base}${cfg.api.lodging.uri.lodging}`)
    );
    this.rentalsUrl$ = config$.pipe(
      map((cfg) => `${cfg.api.lodging.base}${cfg.api.lodging.uri.rental}`)
    );
    this.reviewsUrl$ = config$.pipe(
      map((cfg) => `${cfg.api.lodging.base}${cfg.api.lodging.uri.review}`)
    );
  }

  /**
   * Gets all lodgings filtered by city and occupancy
   * with at least one rental marked 'available'
   *
   * @param city string
   * @param occupancy string
   */
  getAvailable(city: string, occupancy: string): Observable<Lodging[]> {
    const params = new HttpParams().set('city', city).set('occupancy', occupancy);
    return this.lodgingsUrl$.pipe(
      concatMap((url) => this.http.get<Lodging[]>(`${url}/available`, { params }))
    );
  }

  /**
   * Represents the _Lodging Service_ `get` method
   *
   * @param id string
   */
  get(filter?: Filter): Observable<Lodging[]> {
    const opts = filter ? { params: new HttpParams()} : {};
    if (filter){
      if (opts.params){
        if (filter.city){
          opts.params.set('city', filter.city);
        }
        if (filter.occupancy){
          opts.params.set('occupancy', filter.occupancy);
        }
      }
    }
    
    return this.lodgingsUrl$.pipe(concatMap((url) => this.http.get<Lodging[]>(url, opts)));
  }

  /* const options = filter ? { params: new HttpParams().set('filter', filter) } : {};
  return this.lodgingsUrl$.pipe(concatMap((url) => this.http.get<Lodging[]>(url, options))); */

  /**
   * Represents the _Lodging Service_ `delete` method
   *
   * @param id string
   */
  delete(id: string): Observable<boolean> {
    return this.lodgingsUrl$.pipe(
      concatMap((url) => this.http.delete<boolean>(url, { params: { id } }))
    );
  }

  /**
   * Represents the _Lodging Service_ `getById` method
   *
   * @param id string
   */
  getById(id: string): Observable<Lodging> {
    return this.lodgingsUrl$.pipe(concatMap((url) => this.http.get<Lodging>(`${url}/${id}`)));
  }

  /**
   * Represents the _Lodging Service_ `post` method
   *
   * @param lodging Lodging
   */
  post(lodging: Lodging): Observable<boolean> {
    return this.lodgingsUrl$.pipe(concatMap((url) => this.http.post<boolean>(url, lodging)));
  }

  /**
   * Represents the _Lodging Service_ `put` method
   *
   * @param lodging Lodging
   */
  put(lodging: Lodging): Observable<Lodging> {
    return this.lodgingsUrl$.pipe(concatMap((url) => this.http.put<Lodging>(url, lodging)));
  }
}
