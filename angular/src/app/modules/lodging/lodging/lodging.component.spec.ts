import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { LodgingComponent } from './lodging.component';
import { Observable, of } from 'rxjs';
import { Lodging } from 'src/app/data/lodging.model';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { lodgings } from '../../../data/Mocks/lodging.mock';

describe('LodgingComponent', () => {
  let component: LodgingComponent;
  let fixture: ComponentFixture<LodgingComponent>;

  const imageUrlsMock = ['http://placecorgi.com/300'];

  const lodgingServiceStub = {
    get(): Observable<Lodging[]> {
      return of(lodgings);
    },

    getImages(id: string): Observable<string[]> {
      return of(imageUrlsMock);
    },
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LodgingComponent],
        imports: [HttpClientTestingModule, ToastrModule.forRoot()],
        providers: [{ provide: LodgingService, useValue: lodgingServiceStub }, ToastrService],
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
    expect(component.lodgings).toEqual(lodgings);
  });

  /**
   * tests if the lodging name and address is displayed in the template
   */
  it('should display lodging info in the template', () => {
    const info = fixture.debugElement.nativeElement.querySelectorAll('p');
    expect(info[0].textContent).toEqual('');
    expect(info[1].textContent).toEqual('');
    expect(info[2].textContent).toEqual(' , ,  ');
    expect(info[3].textContent).toEqual('  ');
  });
});
