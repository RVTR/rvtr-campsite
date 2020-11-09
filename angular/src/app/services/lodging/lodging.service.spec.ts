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
import { Filter } from 'src/app/data/filter.model';
import { lodgingMock } from '../../data/Mocks/lodging.mock';

describe('LodgingService', () => {
  const configServiceStub = {
    get(): Observable<Config> {
      const config: Config = {
        api: {
          account: { base: '', uri: { account: '', address: '', profile: '', payment: '' } },
          booking: { base: '', uri: { booking: '' } },
          lodging: { base: 'test', uri: { lodging: '', rental: '', review: '', image: '' } },
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
    const filter: Filter = { city: 'string', occupancy: 'string' };

    service.get(filter).subscribe((res) => {
      const lodgings: Lodging[] = JSON.parse(res.toString());
      expect(lodgings.length).toEqual(1);
    });

    tick();

    req = httpTestingController.expectOne('test/available?city=string&occupancy=string');
    req.flush(JSON.stringify(lodgingMock));
  }));

  it('should make httpDelete request', fakeAsync(() => {
    let req: TestRequest;

    service.delete('0').subscribe();

    tick();

    req = httpTestingController.expectOne('test/0');
    req.flush(null);
  }));

  it('should make httpGet request', fakeAsync(() => {
    let req: TestRequest;
    let reqOne: TestRequest;
    const filter: Filter = { city: 'string', occupancy: 'string' };

    service.get().subscribe((res) => {
      expect(res.length).toEqual(lodgingMock.length);
    });

    service.get(filter).subscribe((res) => {
      expect(res[0]).toEqual(lodgingMock[0]);
    });

    tick();

    req = httpTestingController.expectOne('test');
    reqOne = httpTestingController.expectOne('test/available?city=string&occupancy=string');

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
      expect(res).toEqual(lodgingMock[0]);
    });

    tick();

    req = httpTestingController.expectOne('test');
    req.flush(lodgingMock[0]);
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

  it('should make httpGet request for image', fakeAsync(() => {
    let req: TestRequest;
    const mockImageUrls = ['https://bulma.io/images/placeholders/1280x960.png'];

    service.getImages('0').subscribe((res) => {
      expect(res).toEqual(mockImageUrls);
    });

    tick();

    req = httpTestingController.expectOne('test/0');
    req.flush(mockImageUrls);
  }));
});
