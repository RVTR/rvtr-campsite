import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingComponent } from './booking.component';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { of, Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Lodging } from 'src/app/data/lodging.model';
import { ToastService } from 'services/toast/toast.service';

describe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;

  let toastServiceSpy: jasmine.SpyObj<ToastService>;

  const lodgingServiceStub = {
    get(): Observable<Lodging[]> {
      return of([
        {
          id: 1,
          location: {
            id: '',
            address: {
              id: '',
              city: '',
              country: '',
              postalCode: '',
              stateProvince: '',
              street: '',
            },
            latitude: '',
            locale: '',
            longitude: '',
          },
          name: '',
          rentals: [
            {
              id: '1',
              lotNumber: '1',
              unit: {
                size: '5x5',
                capacity: 2,
                name: 'tent',
              },
              status: 'available',
              price: 100,
            },
          ],
          reviews: [
            {
              accountId: 1,
              comment: 'comment',
              dateCreated: '2020-08-01',
              rating: 1,
              lodgingId: 1,
            },
          ],
          bathrooms: 1,
          imageUrls: [],
        },
      ]);
    },
  };

  beforeEach(
    waitForAsync(() => {
      const spy = jasmine.createSpyObj('ToastService', ['toastError']);

      TestBed.configureTestingModule({
        declarations: [BookingComponent],
        imports: [HttpClientTestingModule, FormsModule],
        providers: [
          { provide: LodgingService, useValue: lodgingServiceStub },
          { provide: ToastService, useValue: spy },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      })
        .compileComponents()
        .then(() => {
          toastServiceSpy = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
        });
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
   * tests if the toast service can be called
   */
  it('should be able to call toast service method', () => {
    toastServiceSpy.toastError('error', 'error');
    expect(toastServiceSpy.toastError.calls.any()).toBe(true);
    expect(toastServiceSpy.toastError.calls.count()).toBe(1);
  });
});
