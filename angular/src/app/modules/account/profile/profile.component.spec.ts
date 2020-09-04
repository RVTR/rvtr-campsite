import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of, Observable } from 'rxjs';
import { Account } from '../../../data/account.model';
import { ProfileComponent } from './profile.component';
import { ACCOUNT_EDITING_SERVICE } from '../account-editing.token';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  const profiles = [
    {
      id: '',
      email: '',
      givenName: '',
      familyName: '',
      phone: '',
      type: '',
    },
  ];

  const editingService = {
    update(e: Partial<Account>): Observable<Partial<Account>> {
      return of(e);
    },
  };

  @Component({ selector: 'uic-editable', template: '' })
  class EditableStubComponent {
    @Input() data!: string;
    @Input() editMode = false;
  }

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProfileComponent, EditableStubComponent],
        providers: [{ provide: ACCOUNT_EDITING_SERVICE, useValue: editingService }],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    component.profiles = profiles;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the editing service', () => {
    component.profiles = profiles;
    fixture.detectChanges();
    editingService.update({ profiles }).subscribe((e: Partial<Account>) => {
      expect(e.profiles).toBeTruthy();
    });
    component.edited();
  });
});
