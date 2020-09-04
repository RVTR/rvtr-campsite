import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { EditableComponent } from './editable.component';

describe('EditableComponent', () => {
  let component: EditableComponent;
  let fixture: ComponentFixture<EditableComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EditableComponent],
        imports: [FormsModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on input focusout should change value and trigger an event', () => {
    component.data = 'test';
    dispatchEvent(new Event('focusout'));
    fixture.detectChanges();
    expect(component.data).toBe('test', 'on focusout');
  });

  it('on input, focusout should change value and trigger an event', () => {
    component.dataChange.subscribe((e: string) => {
      expect(component.data).toBe(e, 'on focusout');
    });
    component.editMode = true;
    fixture.detectChanges();
    const ele = fixture.debugElement.nativeElement;
    const inp = ele.querySelector('input');
    inp.value = 'test';
    dispatchEvent(new Event('focusout'));
    fixture.detectChanges();
  });

  it('should adapt to the profile from setting Type', () => {
    const comp = fixture.debugElement.componentInstance;
    comp.setValidationType('name');
    fixture.whenStable().then(() => {
      expect(component.errorMessage).toBe('Names cannot contain punctuation, spaces, or numbers');
      expect(component.pattern).toEqual(/^[a-zA-Z]+(([',.-][a-zA-Z])?[a-zA-Z]*)*$/);
    });
  });

  it('should enable an error on focus out with improper input', () => {
    component.editMode = true;
    component.setValidationType('name');
    fixture.detectChanges();
    const i = Object.create(HTMLElement.prototype, {});
    i.value = '1111';
    const e = new Event('focusout');
    spyOnProperty(e, 'target', 'get').and.returnValue(i);
    component.onFocusOut(e);
    fixture.detectChanges();
    expect(component.valid).toBeFalsy();
    expect(component.error).toBeTrue();
  });

  it('should allow proper value on focus out', () => {
    component.editMode = true;
    component.setValidationType('name');
    fixture.detectChanges();
    const i = Object.create(HTMLElement.prototype, {});
    i.value = 'test';
    const e = new Event('focusout');
    spyOnProperty(e, 'target', 'get').and.returnValue(i);
    component.onFocusOut(e);
    fixture.detectChanges();
    expect(component.valid).toBeTrue();
    expect(component.error).toBeFalse();
  });
});
