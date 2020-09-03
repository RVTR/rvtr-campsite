import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { asyncScheduler, scheduled, Observable } from 'rxjs';
import { LodgingService } from './lodging.service';
import { ConfigService } from '../config/config.service';
import { Config } from '../../data/config.model';
import { Lodging } from '../../data/lodging.model';

describe('LodgingService', () => {
  const lodgingMock: Lodging[] = [
    {
      id: 'string',
      location: {
        id: 'string',
        address: {
          id: 'string',
          city: 'string',
          country: 'string',
          postalCode: 'string',
          stateProvince: 'string',
          street: 'string',
        },
        latitude: 'string',
        longitude: 'string',
      },
      name: 'string',
      bathrooms: 1,
      rentals: [],
      reviews: [],
    },
  ];

  const configServiceStub = {
    get(): Observable<Config> {
      const config: Config = {
        api: {
          account: { base: '', uri: { account: '', address: '', profile: '', payment: '' } },
          booking: { base: '', uri: { booking: '' } },
          lodging: { base: 'test', uri: { lodging: '', rental: '', review: '' } },
          monitoring: '',
        },
        navigation: {
          footer: [
            {
              icon: 'string',
              text: 'string',
              url: 'string',
            },
          ],
          header: [
            {
              icon: 'string',
              text: 'string',
              url: 'string',
            },
          ],
        },
      };

      return scheduled([config], asyncScheduler);
    },
  };

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: LodgingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ConfigService, useValue: configServiceStub }],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(LodgingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make httpGet request for available', fakeAsync(() => {
    let req: TestRequest;

    service.getAvailable('string', 'string').subscribe((res) => {
      const lodgings: Lodging[] = JSON.parse(res.toString());
      expect(lodgings.length).toEqual(1);
    });

    tick();

    req = httpTestingController.expectOne('test/available?city=string&occupancy=string');
    req.flush(JSON.stringify(lodgingMock));
  }));

  it('should make httpDelete request', fakeAsync(() => {
    let req: TestRequest;

    service.delete('0').subscribe((res) => {
      expect(JSON.parse(res.toString())).toBeTrue();
    });

    tick();

    req = httpTestingController.expectOne('test?id=0');
    req.flush(JSON.stringify(true));
  }));

  it('should make httpGet request', fakeAsync(() => {
    let req: TestRequest;
    let reqOne: TestRequest;

    service.get().subscribe((res) => {
      expect(res.length).toEqual(lodgingMock.length);
    });

    service.get('0').subscribe((res) => {
      expect(res[0]).toEqual(lodgingMock[0]);
    });

    tick();

    req = httpTestingController.expectOne('test');
    reqOne = httpTestingController.expectOne('test?filter=0');

    req.flush(lodgingMock);
    reqOne.flush(lodgingMock);
  }));

  it('should make httpGet request when calling getById', fakeAsync(() => {
    let reqOne: TestRequest;

    service.getById('0').subscribe((res) => {
      expect(res).toBeTruthy();
    });

    tick();

    reqOne = httpTestingController.expectOne('test/0');

    reqOne.flush(lodgingMock);
  }));

  it('should make httpPost request', fakeAsync(() => {
    let req: TestRequest;

    service.post(lodgingMock[0]).subscribe((res) => {
      expect(JSON.parse(res.toString())).toBeTrue();
    });

    tick();

    req = httpTestingController.expectOne('test');
    req.flush(JSON.stringify(true));
  }));

  it('should make httpPut request', fakeAsync(() => {
    let req: TestRequest;

    service.put(lodgingMock[0]).subscribe((res) => {
      expect(res).toEqual(lodgingMock[0]);
    });

    tick();

    req = httpTestingController.expectOne('test');
    req.flush(lodgingMock[0]);
  }));
});
