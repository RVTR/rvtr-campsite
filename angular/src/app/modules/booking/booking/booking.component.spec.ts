import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingComponent } from './booking.component';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { of, Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Lodging } from 'src/app/data/lodging.model';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';

describe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;

  const lodgingServiceStub = {
    get(): Observable<Lodging[]> {
      return of([
        {
          entityId: 1,
          address: {
            entityId: '',
            city: '',
            country: '',
            postalCode: '',
            stateProvince: '',
            street: '',
            latitude: '',
            locale: '',
            longitude: '',
          },
          name: '',
          rentals: [
            {
              id: '1',
              lotNumber: '1',
              size: '5x5',
              capacity: 2,
              siteName: 'tent',
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
              lodgingModelId: 1,
            },
          ],
          bathrooms: 1,
          images: [],
        },
      ]);
    },
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BookingComponent],
        imports: [HttpClientTestingModule, FormsModule, ToastrModule.forRoot()],
        providers: [{ provide: LodgingService, useValue: lodgingServiceStub }, ToastrService],
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
