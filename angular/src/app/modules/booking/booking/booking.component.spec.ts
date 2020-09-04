import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingComponent } from './booking.component';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { of, Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Lodging } from 'src/app/data/lodging.model';

describe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;

  const lodgingServiceStub = {
    get(): Observable<Lodging[]> {
      return of([
        {
          id: '',
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
              id: '',
              name: '',
              price: 0,
              occupancy: 1,
              type: '',
              status: 'available',
            },
          ],
          reviews: [
            {
              id: '1',
              comment: 'comment',
              dateCreated: '2020-08-01',
              rating: 1,
            },
          ],
          bathrooms: 1,
        },
      ]);
    },
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BookingComponent],
        imports: [HttpClientTestingModule, FormsModule],
        providers: [{ provide: LodgingService, useValue: lodgingServiceStub }],
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
});
