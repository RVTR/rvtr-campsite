import { of, Observable } from 'rxjs';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AddressComponent } from './address.component';
import { ACCOUNT_EDITING_SERVICE } from '../account-editing.token';
import { Account } from '../../../data/account.model';

import { Component, Input } from '@angular/core';

describe('AddressComponent', () => {
  const accountServiceStub = {
    get(): Observable<Account> {
      const account: Account = {
        id: '',
        address: {
          id: '',
          city: '',
          country: '',
          postalCode: '',
          stateProvince: '',
          street: '',
        },
        payments: [],
        profiles: [],
      };

      return of(account);
    },
  };
  const address = {
    id: '',
    city: '',
    country: '',
    postalCode: '',
    stateProvince: '',
    street: '',
  };
  let component: AddressComponent;
  let fixture: ComponentFixture<AddressComponent>;

  @Component({ selector: 'uic-editable', template: '' })
  class EditableStubComponent {
    @Input()
    data!: string;
    @Input()
    editMode = false;
  }

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AddressComponent, EditableStubComponent],
        providers: [{ provide: ACCOUNT_EDITING_SERVICE, useValue: undefined }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressComponent);
    component = fixture.componentInstance;
    component.address = address;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
