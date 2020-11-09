import { of, Observable } from 'rxjs';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AddressComponent } from './address.component';
import { ACCOUNT_EDITING_SERVICE } from '../account-editing.token';
import { Account } from '../../../data/account.model';
import { account } from '../../../data/Mocks/account.mock';
import { address } from '../../../data/Mocks/address.mock';

import { Component, Input } from '@angular/core';

describe('AddressComponent', () => {
  const accountServiceStub = {
    get(): Observable<Account> {
      return of(account);
    },
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
