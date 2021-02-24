import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { Lodging } from '../../data/lodging.model';
import { Filter } from '../../data/filter.model';
import { Review } from '../../data/review.model';

@Injectable({
  providedIn: 'root',
})
export class LodgingService {
  private readonly lodgingsUrl$: Observable<string>;
  // private readonly rentalsUrl$: Observable<string>;
  private readonly reviewsUrl$: Observable<string>;
  private readonly imagesUrl$: Observable<string>;

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
    this.reviewsUrl$ = config$.pipe(
      map((cfg) => `${cfg.api.lodging.base}${cfg.api.lodging.uri.review}`)
    );
    this.imagesUrl$ = config$.pipe(
      map((cfg) => `${cfg.api.lodging.base}${cfg.api.lodging.uri.image}`)
    );
  }

  /**
   * Represents the _Lodging Service_ `put` method for reviews
   *
   * @param review Review
   */
  putReview(review: Review): Observable<Review> {
    return this.reviewsUrl$.pipe(concatMap((url) => this.http.put<Review>(url, review)));
  }

  /**
   * Represents the _Lodging Service_ `put` method for reviews
   *
   * @param review Review
   */
  postReview(review: Review): Observable<Review> {
    return this.reviewsUrl$.pipe(concatMap((url) => this.http.post<Review>(url, review)));
  }

  /**
   * Represents the _Lodging Service_ `delete` method
   *
   * @param id string
   */
  delete(id: string): Observable<void> {
    return this.lodgingsUrl$.pipe(
      map((url) => url.concat(`/${id}`)),
      concatMap((url) => this.http.delete<void>(url))
    );
  }

  /**
   * Represents the _Lodging Service_ `get` method
   *
   * @param filter Filter
   */
  get(filter?: Filter): Observable<Lodging[]> {
    if (!filter) {
      return this.lodgingsUrl$.pipe(concatMap((url) => this.http.get<Lodging[]>(url)));
    } else {
      const params = new HttpParams()
        .set('city', filter.city)
        .set('stateProvince', filter.stateProvince)
        .set('country', filter.country)
        .set('occupancy', filter.occupancy);
      return this.lodgingsUrl$.pipe(
        concatMap((url) => this.http.get<Lodging[]>(`${url}/available`, { params }))
      );
    }
  }

  /**
   * Represents the _Lodging Service_ `getById` method
   *
   * @param id string
   */
  getById(id: string): Observable<Lodging> {
    return this.lodgingsUrl$.pipe(
      map((url) => url.concat(`/${id}`)),
      concatMap((url) => this.http.get<Lodging>(url))
    );
  }

  /**
   * Represents the _Lodging Service_ `post` method
   *
   * @param lodging Lodging
   */
  post(lodging: Lodging): Observable<Lodging> {
    return this.lodgingsUrl$.pipe(concatMap((url) => this.http.post<Lodging>(url, lodging)));
  }

  /**
   * Represents the _Lodging Service_ `put` method
   *
   * @param lodging Lodging
   */
  put(lodging: Lodging): Observable<Lodging> {
    return this.lodgingsUrl$.pipe(concatMap((url) => this.http.put<Lodging>(url, lodging)));
  }

  /**
   * Represents the _Lodging Service_ `get` method for imgaes
   *
   * lodging id
   * @param id string
   */
  getImages(id: string): Observable<string[]> {
    return this.imagesUrl$.pipe(
      map((url) => url.concat(`/${id}`)),
      concatMap((url) => this.http.get<string[]>(url))
    );
  }
}
