import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturedLodgingComponent } from './featured-lodging.component';
import { Lodging } from 'src/app/data/lodging.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('FeaturedLodgingComponent', () => {
  let component: FeaturedLodgingComponent;
  let fixture: ComponentFixture<FeaturedLodgingComponent>;

  const testLodgings: Lodging[] = [
    {
      id: 0,
      location: {
        id: '',
        address: {
          id: '',
          city: '',
          postalCode: '',
          country: '',
          stateProvince: '',
          street: '',
        },
        latitude: '',
        longitude: '',
      },
      name: '',
      bathrooms: 1,
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
      reviews: [],
      imageUrls: [],
    },
  ];

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [FeaturedLodgingComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(FeaturedLodgingComponent);
      component = fixture.componentInstance;
      component.featuredLodgings = testLodgings;
      fixture.detectChanges();
    })
  );

  // beforeEach(() => {
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update on change', () => {
    expect(component.displayLodgings).toBeTruthy();
    expect(component.displayLodgings.length).toBeLessThanOrEqual(6);
  });

  it('should not update', () => {
    component.featuredLodgings = null;
    fixture.detectChanges();
    expect(component.displayLodgings.length).toEqual(0);
  });

  it('should set available lodgings', () => { 
    component.setAvailableCountsByType();
    expect(component.lotAvailableStringsByLodgingId).toBeTruthy();
  });
});
