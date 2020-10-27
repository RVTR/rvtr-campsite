import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MonitoringService } from './monitoring.service';

describe('MonitorService', () => {
  const routerMock = {
    navigate(urls: string[]): void {},
  };

  let service: MonitoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: Router, useValue: routerMock }],
    });
    service = TestBed.inject(MonitoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle error', fakeAsync(() => {
    expect(() => {
      service.handleError(null);
    }).not.toThrow();
    tick();
  }));
});
