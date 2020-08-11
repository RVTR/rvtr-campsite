import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsComponent } from './search-results.component';
import { Lodging } from 'src/app/data/lodging.model';

describe('SearchResultsComponent', () => {
  const lodgings: Lodging[] = [
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
          dateCreated: new Date(),
          rating: 1,
        },
      ],
      bathrooms: 1,
    },
  ];
  const rating: boolean[] = [false, false, false, false, false, false, false, false, false, true];

  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    component.lodgings = lodgings;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have rating of', () => {
    expect(component.averageRating(lodgings[0])).toEqual(rating);
  });
});
