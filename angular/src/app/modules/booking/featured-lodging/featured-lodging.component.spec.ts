import { waitForAsync, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FeaturedLodgingComponent } from './featured-lodging.component';
import { Lodging } from 'src/app/data/lodging.model';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('FeaturedLodgingComponent', () => {
  let component: FeaturedLodgingComponent;
  let fixture: ComponentFixture<FeaturedLodgingComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  const testLodgings: Lodging[] = [
    {
      id: 1,
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
        imports: [RouterTestingModule.withRoutes([])],
        declarations: [FeaturedLodgingComponent],
        providers: [{ provide: Router, useValue: mockRouter }],
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
    component.displayLodgings = testLodgings;
    component.setAvailableCountsByType();
    expect(component.lotAvailableStringsByLodgingId).toBeTruthy();
  });

  it('lodging available string should match expectations', () => {
    component.displayLodgings = testLodgings;
    component.setAvailableCountsByType();
    let outstr = '';
    const stringArray1 = component.lotAvailableStringsByLodgingId.get(1);
    if (stringArray1 !== undefined) {
      outstr = stringArray1[0];
    }
    expect(outstr).toEqual('tent: 1 of 1 Available');
  });

  it('lodging redirect should work', () => {
    component.featureClick(testLodgings[0]);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/lodging/details/1']);
  });
});
