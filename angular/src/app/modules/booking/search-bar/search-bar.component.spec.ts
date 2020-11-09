import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { BookingService } from 'src/app/services/booking/booking.service';
import { of } from 'rxjs';
import { Lodging } from 'src/app/data/lodging.model';
import { Booking } from 'src/app/data/booking.model';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { lodgings } from '../../../data/Mocks/lodging.mock';
import { bookings } from '../../../data/Mocks/booking.mock';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  const testForm = {
    value: {
      adults: '',
      children: '',
      location: '',
      checkin: '',
      checkout: '',
    },
  } as NgForm;

  const lodgingService = jasmine.createSpyObj('LodgingService', ['get']);
  const bookingService = jasmine.createSpyObj('BookingService', ['getByDateRange']);

  lodgingService.get.and.returnValue(of(lodgings));
  bookingService.getByDateRange.and.returnValue(of(bookings));

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
        declarations: [SearchBarComponent],
        providers: [
          { provide: LodgingService, useValue: lodgingService },
          { provide: BookingService, useValue: bookingService },
        ],
      }).compileComponents();

      TestBed.inject(HttpClient);
      TestBed.inject(HttpTestingController);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', () => {
    const searchResultsSpy = spyOn(component.searchResults, 'emit');
    const isSearchedSpy = spyOn(component.isSearched, 'emit');

    component.onSubmit().then(() => {
      expect(lodgingService.get).toHaveBeenCalled();
      expect(bookingService.getByDateRange).toHaveBeenCalled();

      expect(searchResultsSpy).toHaveBeenCalled();
      expect(isSearchedSpy).toHaveBeenCalledWith(true);
    });
  });

  it('should emit on click', () => {
    const isSearchSpy = spyOn(component.isSearched, 'emit');

    const nativeElement = fixture.nativeElement;
    const clearButton = nativeElement.querySelector('#clearButton');

    clearButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(isSearchSpy).toHaveBeenCalledWith(false);
  });

  it('getDateNow runs', () => {
    const dateNow = component.getDateNow();
    expect(dateNow).toBeTruthy();
  });

  it('makeSearchForm makes form group', () => {
    const dateNow = component.getDateNow();
    const searchForm = component.makeSearchForm(dateNow);
    expect(searchForm).toBeTruthy();
  });

  it('testDatesValidator rejects when both empty', () => {
    const testCurrentDate = '2020-11-05';
    const testDates = new FormGroup({
      checkin: new FormControl(''),
      checkout: new FormControl(''),
    });
    const testDatesValidator = component.datesValidator(testCurrentDate);
    expect(testDatesValidator(testDates)).toEqual({ emptyDates: true });
  });

  it('testDatesValidator works when both valid', () => {
    const testCurrentDate = '2020-11-05';
    const testDates = new FormGroup({
      checkin: new FormControl('2020-11-06'),
      checkout: new FormControl('2020-11-07'),
    });
    const testDatesValidator = component.datesValidator(testCurrentDate);
    expect(testDatesValidator(testDates)).toEqual(null);
  });

  it('testDatesValidator rejects one date empty one nonempty', () => {
    const testCurrentDate = '2020-11-05';
    const testDates = new FormGroup({
      checkin: new FormControl(''),
      checkout: new FormControl('2020-11-07'),
    });
    const testDatesValidator = component.datesValidator(testCurrentDate);
    expect(testDatesValidator(testDates)).toEqual({ incompleteDates: true });
  });

  it('testDatesValidator rejects date before current', () => {
    const testCurrentDate = '2020-11-05';
    const testDates = new FormGroup({
      checkin: new FormControl('2020-11-04'),
      checkout: new FormControl('2020-11-07'),
    });
    const testDatesValidator = component.datesValidator(testCurrentDate);
    expect(testDatesValidator(testDates)).toEqual({ beforeNow: true });
  });

  it('testDatesValidator rejects out before in', () => {
    const testCurrentDate = '2020-11-05';
    const testDates = new FormGroup({
      checkin: new FormControl('2020-11-09'),
      checkout: new FormControl('2020-11-07'),
    });
    const testDatesValidator = component.datesValidator(testCurrentDate);
    expect(testDatesValidator(testDates)).toEqual({ outBeforeIn: true });
  });
});
