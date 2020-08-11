import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { asyncScheduler, scheduled } from 'rxjs';
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
        locale: 'string',
        longitude: 'string',
      },
      name: 'string',
      bathrooms: 1,
      rentals: [],
      reviews: [],
    },
  ];

  const configServiceStub = {
    get() {
      const config: Config = {
        api: {
          account: '',
          booking: '',
          lodging: 'test',
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
    reqOne = httpTestingController.expectOne('test?id=0');

    req.flush(lodgingMock);
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
