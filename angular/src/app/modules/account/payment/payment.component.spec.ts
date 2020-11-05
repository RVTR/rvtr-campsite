import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PaymentComponent } from './payment.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { Payment, PostPayment } from '../../../data/payment.model';
import { AccountService } from '../../../services/account/account.service';

describe('PaymentComponent', () => {
  const payments = [
    {
      cardName: '',
      cardNumber: '',
      cardExpirationDate: '2020-08-01',
      id: '',
      securityCode: '',
    },
  ];
  const mockPayment: Payment = {
    id: 'string',
    cardExpirationDate: '2020-08-01',
    cardName: 'string',
    cardNumber: 'string',
    securityCode: '111',
  };
  const accountServiceStub = {
    postPayment(payment: PostPayment): Observable<PostPayment> {
      return of(payment);
    },
  };
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [{ provide: AccountService, useValue: accountServiceStub }],
        declarations: [PaymentComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    component.payments = payments;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new card', () => {
    const mockPostPayment: PostPayment = {
      email: '',
      id: mockPayment.id,
      cardName: mockPayment.cardName,
      cardNumber: mockPayment.cardNumber,
      securityCode: mockPayment.securityCode,
      cardExpirationDate: mockPayment.cardExpirationDate,
    };

    component.addCard(mockPostPayment);

    expect(component.payments.length).toEqual(2);
    expect(component.payments[1]).toEqual(mockPayment);
  });
});
