import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RentalComponent } from './rental.component';
import { Rental } from 'src/app/data/rental.model';
import { rentals } from '../../../data/Mocks/rental.mock';

describe('RentalComponent', () => {
  let component: RentalComponent;
  let fixture: ComponentFixture<RentalComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RentalComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(RentalComponent);
      component = fixture.componentInstance;
      component.rentals = rentals;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // The following 4 tests are for a method that is no longer used, but is left here in case someone wants to use it later
  // it('should set rentalTypes', () => {
  //   expect(component.rentalTypes).toBeTruthy();
  //   expect(component.rentalTypes.length).toEqual(2);
  // });

  // it('should set availability count correctly', () => {
  //   expect(component.availabilityCount.get('tent')).toEqual(1);
  // });

  // it('should have none available', () => {
  //   expect(component.availabilityCount.get('rv')).toEqual(1);
  // });

  // it('should call setRentals', () => {
  //   spyOn(component, 'setRentalTypes');
  //   component.ngOnInit();
  //   expect(component.setRentalTypes).toHaveBeenCalled();
  // });

  it('should test the length of the rows', () => {
    const tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(3);
  });

  it('should test the table headers', () => {
    const tableRows = fixture.nativeElement.querySelectorAll('tr');
    const headerRow = tableRows[0];
    expect(headerRow.cells[0].innerHTML).toContain('Site');
    expect(headerRow.cells[2].innerHTML).toContain('Capacity');
  });

  it('should add and remove rental', () => {
    const rental: Rental = {
      id: '3',
      lotNumber: '3',
      unit: {
        size: '5x5',
        capacity: 2,
        name: 'tent',
      },
      status: 'available',
      price: 100,
    };

    // // Adds Rental
    // rentals.push(rental);
    // component.rentals = rentals;
    // component.ngOnChanges();
    // expect(component.availabilityCount.get('tent')).toEqual(2);

    // // Removes Rental
    // component.rentals.pop();
    // component.ngOnChanges();
    // expect(component.availabilityCount.get('tent')).toEqual(1);
  });
});
