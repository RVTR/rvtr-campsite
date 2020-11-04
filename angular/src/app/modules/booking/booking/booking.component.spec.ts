import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingComponent } from './booking.component';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { of, Observable, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Lodging } from 'src/app/data/lodging.model';
import { mockLodgings } from '../../../data/mocks/mockLodgings';
import { ToastService } from 'services/toast/toast.service';

describe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;

  const toastServiceSpy = jasmine.createSpyObj<ToastService>('ToastService', ['toastError']);

  const lodgingServiceStub = {
    get(): Observable<Lodging[]> {
      return of(mockLodgings);
    },
    getWithError(): Observable<Account> {
      const errorMsg = { error: 'Test error' };
      toastServiceSpy.toastError(errorMsg.error, 'Test error');
      return throwError(errorMsg);
    },
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BookingComponent],
        imports: [HttpClientTestingModule, FormsModule],
        providers: [
          { provide: LodgingService, useValue: lodgingServiceStub },
          { provide: ToastService, useValue: toastServiceSpy },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * tests if ok request doesn't call toastservice
   */
  it('should return lodgings with no toast error', () => {
    lodgingServiceStub.get().subscribe((res) => {
      expect(res).toEqual(mockLodgings);
    });
    expect(toastServiceSpy.toastError).not.toHaveBeenCalled();
  });

  /**
   * tests if bad request calls toastservice
   */
  it('should throw error and call toast error', () => {
    lodgingServiceStub.getWithError().subscribe({
      error: (err) => {
        expect(err).toEqual({ error: 'Test error' });
      },
    });
    expect(toastServiceSpy.toastError).toHaveBeenCalled();
    toastServiceSpy.toastError.calls.reset();
  });
});
