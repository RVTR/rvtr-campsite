import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SpotlightComponent } from './spotlight.component';
import { Lodging } from 'src/app/data/lodging.model';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { testLodgings } from '../../../data/Mocks/lodging.mock';

describe('SpotlightComponent', () => {
  let component: SpotlightComponent;
  let fixture: ComponentFixture<SpotlightComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule.withRoutes([])],
        declarations: [SpotlightComponent],
        providers: [{ provide: Router, useValue: mockRouter }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have spotlight', () => {
    component.setSpotlight(testLodgings);
    expect(component.selectedLodging).toBe(testLodgings[0]);
  });

  it('should not have spotlight', () => {
    component.setSpotlight(null);
    expect(component.selectedLodging).toBe(null);
  });

  it('should change spotlight', () => {
    spyOn(component, 'setSpotlight');
    component.lodgings = testLodgings;
    component.ngOnChanges();
    expect(component.setSpotlight).toHaveBeenCalled();
  });

  it('lodging redirect should work', () => {
    component.featureClick(testLodgings[0]);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/lodging/details/1']);
  });

  it('img should be the placeholder', () => {
    component.lodgings = testLodgings;
    const img: HTMLElement = fixture.debugElement.nativeElement.querySelector('img');
    expect(img.getAttribute('alt')).toMatch('Placeholder image');
  });
});
