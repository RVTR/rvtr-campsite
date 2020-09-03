import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { asyncScheduler, scheduled, Observable } from 'rxjs';
import { AccountService } from './account.service';
import { ConfigService } from '../config/config.service';
import { Account } from '../../data/account.model';
import { Config } from '../../data/config.model';
import { PostPayment } from 'src/app/data/payment.model';

describe('AccountService', () => {
  const accountMock: Account = {
    id: '0',
    address: {
      id: 'string',
      city: 'string',
      country: 'string',
      postalCode: 'string',
      stateProvince: 'string',
      street: 'string',
    },
    payments: [
      {
        id: 'string',
        cardExpirationDate: '2020-08-01',
        cardName: 'string',
        cardNumber: 'string',
        securityCode: '111',
      },
    ],
    profiles: [
      {
        type: 'adult',
        id: 'string',
        email: 'string',
        familyName: 'string',
        givenName: 'string',
        phone: 'string',
      },
    ],
  };

  const configServiceStub = {
    get(): Observable<Config> {
      const config: Config = {
        api: {
          account: { base: 'test', uri: { account: '', address: '', profile: '', payment: '' } },
          booking: { base: '', uri: { booking: '' } },
          lodging: { base: '', uri: { lodging: '', rental: '', review: '' } },
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
  let service: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ConfigService, useValue: configServiceStub }],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AccountService);
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

    req = httpTestingController.expectOne('test/0');
    req.flush(JSON.stringify(true));
  }));

  it('should make httpGet request', fakeAsync(() => {
    let req: TestRequest;

    service.get('0').subscribe((res) => {
      expect(res).toEqual(accountMock);
    });

    tick();

    req = httpTestingController.expectOne('test/0');
    req.flush(accountMock);
  }));

  it('should make httpPost request', fakeAsync(() => {
    let req: TestRequest;

    service.post(accountMock).subscribe((res) => {
      expect(JSON.parse(res.toString())).toBeTrue();
    });

    tick();

    req = httpTestingController.expectOne('test');
    req.flush(JSON.stringify(true));
  }));

  it('should make httpPut request', fakeAsync(() => {
    let req: TestRequest;

    service.put(accountMock).subscribe((res) => {
      expect(res).toEqual(accountMock);
    });

    tick();

    req = httpTestingController.expectOne('test');
    req.flush(accountMock);
  }));

  it('should make httpPost request for payments', fakeAsync(() => {
    let req: TestRequest;
    const mockPayment = {
      accountId: 'string',
      id: 'string',
      cardExpirationDate: '2020-08-01',
      cardName: 'string',
      cardNumber: 'string',
      securityCode: '111',
    } as PostPayment;

    service.postPayment(mockPayment).subscribe((res) => {
      expect(JSON.parse(res.toString())).toBeTrue();
    });

    tick();

    req = httpTestingController.expectOne('test');
    req.flush(JSON.stringify(true));
  }));
});
