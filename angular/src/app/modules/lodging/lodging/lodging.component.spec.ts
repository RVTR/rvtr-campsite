import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LodgingComponent } from './lodging.component';
import { of } from 'rxjs';
import { Lodging } from 'src/app/data/lodging.model';
import { LodgingService } from 'src/app/services/lodging/lodging.service';

describe('LodgingComponent', () => {
  let component: LodgingComponent;
  let fixture: ComponentFixture<LodgingComponent>;

  const lodgings: Lodging[] = [
    {
      id: '1',
      location: {
        id: '1',
        address: {
          id: '1',
          city: 'testCity',
          country: 'testCountry',
          postalCode: 'testCode',
          stateProvince: 'testState',
          street: 'testStreet',
        },
        latitude: 'testLat',
        locale: 'testLocale',
        longitude: 'testLong',
      },
      name: 'test',
      rentals: [],
      reviews: [],
      bathrooms: 1,
    },
  ];

  beforeEach(async(() => {
    const lodgingService = jasmine.createSpyObj('LodgingService', ['get']);
    lodgingService.get.and.returnValue(of(lodgings));

    TestBed.configureTestingModule({
      declarations: [LodgingComponent],
      providers: [{ provide: LodgingService, useValue: lodgingService }],
    }).compileComponents();

    fixture = TestBed.createComponent(LodgingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  /**
   * tests the whole lodging component
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * tests if the lodges are returned correctly
   */
  it('should get lodgings on initialization', () => {
    expect(component.lodgings).toBeTruthy();
    expect(component.lodgings).toEqual(lodgings);
  });

  /**
   * tests if the lodging name and address is displayed in the template
   */
  it('should display lodging info in the template', () => {
    const info = fixture.debugElement.nativeElement.querySelectorAll('p');
    expect(info[0].textContent).toContain('test');
    expect(info[1].textContent).toContain('testStreet');
    expect(info[2].textContent).toContain('testCity, testState, testCountry');
    expect(info[3].textContent).toContain('testCode');
  });
});
