import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;
  const toastServiceSpy = jasmine.createSpyObj<ToastService>('ToastService', ['toastError']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ToastService, useValue: toastServiceSpy }],
    });
    service = TestBed.inject(ToastService);
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
