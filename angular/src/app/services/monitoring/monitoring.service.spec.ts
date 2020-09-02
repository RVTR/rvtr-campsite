import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { scheduled, asyncScheduler, Observable } from 'rxjs';
import { MonitoringService } from './monitoring.service';
import { ConfigService } from '../config/config.service';
import { Config } from '../../data/config.model';
import { Monitoring } from '../../data/monitoring.model';

describe('MonitorService', () => {
  const configServiceStub = {
    get(): Observable<Config> {
      const config: Config = {
        api: {
          account: { base: '', uri: { account: '', address: '', profile: '', payment: '' } },
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

  let service: MonitoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ConfigService, useValue: configServiceStub }, Monitoring],
    });
    service = TestBed.inject(MonitoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle error', fakeAsync(() => {
    expect(() => {
      service.handleError(new Error('error'));
    }).not.toThrow();

    tick();
  }));
});
