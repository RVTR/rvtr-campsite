import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { LodgingComponent } from './lodging.component';
import { Observable, of, throwError } from 'rxjs';
import { Lodging } from 'src/app/data/lodging.model';
import { mockLodgings } from '../../../data/mocks/mockLodgings';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToastService } from 'services/toast/toast.service';

describe('LodgingComponent', () => {
  let component: LodgingComponent;
  let fixture: ComponentFixture<LodgingComponent>;

  const toastServiceSpy = jasmine.createSpyObj<ToastService>('ToastService', ['toastError']);
  const imageUrlsMock = ['http://placecorgi.com/300'];

  const lodgingServiceStub = {
    get(): Observable<Lodging[]> {
      return of(mockLodgings);
    },
    getWithError(): Observable<Account> {
      const errorMsg = { error: 'Test error' };
      toastServiceSpy.toastError(errorMsg.error, 'Test error');
      return throwError(errorMsg);
    },
    getImages(id: string): Observable<string[]> {
      return of(imageUrlsMock);
    },
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LodgingComponent],
        imports: [HttpClientTestingModule],
        providers: [
          { provide: LodgingService, useValue: lodgingServiceStub },
          { provide: ToastService, useValue: toastServiceSpy },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(LodgingComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      TestBed.inject(HttpTestingController);
    })
  );

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
    expect(component.lodgings).toEqual(mockLodgings);
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

  /**
   * tests if ok request doesn't call toastservice
   */
  it('should return lodgings with no toast error', () => {
    lodgingServiceStub.get().subscribe((res) => {
      expect(res).toEqual(mockLodgings);
    });
    expect(toastServiceSpy.toastError).not.toHaveBeenCalled();
  });

  /**
   * tests if bad request calls toastservice
   */
  it('should throw error and call toast error', () => {
    lodgingServiceStub.getWithError().subscribe({
      error: (err) => {
        expect(err).toEqual({ error: 'Test error' });
      },
    });
    expect(toastServiceSpy.toastError).toHaveBeenCalled();
    toastServiceSpy.toastError.calls.reset();
  });
});
