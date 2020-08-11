import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingComponent } from './booking.component';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { of } from 'rxjs';
import { SearchResultsComponent } from '../search-results/search-results.component';

describe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;

  const lodgingServiceStub = {
    get() {
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
              rentalUnit: {
                id: '',
                bedroom: {
                  id: '',
                  count: 1,
                  type: '',
                },
                name: '',
                occupancy: 1,
                type: '',
              },
              status: 'available',
            },
          ],
          reviews: [
            {
              id: '1',
              accountId: '1',
              hotelId: '1',
              comment: 'comment',
              dateCreated: new Date(Date.now()),
              rating: 1,
            },
          ],
          bathrooms: [
            {
              id: '',
              fixture: 1,
            },
          ],
        },
      ]);
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookingComponent, SearchResultsComponent],
      providers: [{ provide: LodgingService, useValue: lodgingServiceStub }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
