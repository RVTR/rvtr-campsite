import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NewPaymentFormComponent } from './new-payment-form.component';
import { FormControl } from '@angular/forms';
import { Payment } from 'src/app/data/payment.model';

describe('NewpaymentformComponent', () => {
  let component: NewPaymentFormComponent;
  let fixture: ComponentFixture<NewPaymentFormComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NewPaymentFormComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  /**
   * This test checks if the NewpaymentformComponent is created
   */

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * This test checks if the modal is not displaying when the user clicks on the accounts page
   * Expects that the modal should not display unless the components is interacted with
   */

  it('should not show modal on init', () => {
    component.ngOnInit();
    expect(component.showModal).toBeFalsy();
  });
  /**
   * This test checks if the input for the form controls is validated
   * iterates over each control and expects the InitialValue to be invalid and the ProperValue to be valid
   */

  it('should properly validate input', () => {
    const newform = new NewPaymentFormComponent();
    newform.newPayment.subscribe((e: Payment) => {
      expect(e as Payment).toBeTrue();
    });
    const controls = [
      {
        control: 'ccNumber',
        InitialValue: '1234',
        ProperValue: '1234-1234-2134-1234',
      },
      {
        control: 'expDate',
        InitialValue: '1111',
        ProperValue: '08/24',
      },
      {
        control: 'securityNumber',
        InitialValue: '1111',
        ProperValue: '111',
      },
    ];
    controls.forEach((el) => {
      const field = newform.paymentForm.controls[el.control];
      field.setValue(el.InitialValue);
      expect(field.valid).toBeFalse();
      field.setValue(el.ProperValue);
      expect(field.valid).toBeTruthy();
    });
    component.onSubmit();
  });
  /**
   * This test checks if the getters return the form control
   * iterates over each value in the getters array and checks if they are an instance of FormControl
   */

  it('should return form controls from getters', () => {
    const getters = [component.ccNumber, component.expDate, component.securityNumber];
    for (const g of getters) {
      expect(g instanceof FormControl).toBeTruthy();
    }
  });
});
