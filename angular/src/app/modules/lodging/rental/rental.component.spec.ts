import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RentalComponent } from './rental.component';
import { Rental } from 'src/app/data/rental.model';

describe('RentalComponent', () => {
  let component: RentalComponent;
  let fixture: ComponentFixture<RentalComponent>;

  const rentals: Rental[] = [
    {
      id: '1',
      name: 'Rental1',
      occupancy: 2,
      type: 'tent',
      status: 'available',
      price: 100,
    },
    {
      id: '2',
      name: 'Rental2',
      occupancy: 2,
      type: 'tent',
      status: 'available',
      price: 100,
    },
    {
      id: '3',
      name: 'Rental3',
      occupancy: 2,
      type: 'cabin',
      status: 'booked',
      price: 100,
    },
    {
      id: '4',
      name: 'Rental4',
      occupancy: 2,
      type: 'cabin',
      status: 'booked',
      price: 100,
    },
  ];

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

  it('should set rentalTypes', () => {
    expect(component.rentalTypes).toBeTruthy();
    expect(component.rentalTypes.length).toEqual(2);
  });

  it('should set availability count correctly', () => {
    expect(component.availabilityCount.get('tent')).toEqual(2);
  });

  it('should have none available', () => {
    expect(component.availabilityCount.get('cabin')).toEqual(0);
  });

  it('should call setRentals', () => {
    spyOn(component, 'setRentalTypes');
    component.ngOnInit();
    expect(component.setRentalTypes).toHaveBeenCalled();
  });

  it('should test the length of the rows', () => {
    const tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(3);
  });

  it('should test the table headers', () => {
    const tableRows = fixture.nativeElement.querySelectorAll('tr');
    const headerRow = tableRows[0];
    expect(headerRow.cells[0].innerHTML).toContain('Site');
    expect(headerRow.cells[2].innerHTML).toContain('Sites Available');
  });

  it('should add rental', () => {
    const rental = {
      id: '5',
      name: 'Rental5',
      occupancy: 2,
      type: 'tent',
      status: 'available',
      price: 100,
    };
    const newRentals = JSON.parse(JSON.stringify(rentals)) as Rental[];
    newRentals.push(rental);
    component.rentals = newRentals;
    component.ngOnChanges();
    expect(component.availabilityCount.get('tent')).toEqual(3);
  });

  it('should remove rental', () => {
    const newRentals = JSON.parse(JSON.stringify(rentals)) as Rental[];
    newRentals.splice(0, 1);
    component.rentals = newRentals;
    component.ngOnChanges();
    expect(component.availabilityCount.get('tent')).toEqual(1);
  });
});
