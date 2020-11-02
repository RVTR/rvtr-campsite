import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;
  let toastServiceSpy: jasmine.SpyObj<ToastService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ToastService', ['toastError']);
    TestBed.configureTestingModule({
      providers: [{ provide: ToastService, useValue: spy }],
    });
    service = TestBed.inject(ToastService);
    toastServiceSpy = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * tests if the toast service can be called
   */
  it('should be able to call toast service method', () => {
    toastServiceSpy.toastError('error', 'error');
    expect(toastServiceSpy.toastError.calls.any()).toBe(true);
    expect(toastServiceSpy.toastError.calls.count()).toBe(1);
  });
});
