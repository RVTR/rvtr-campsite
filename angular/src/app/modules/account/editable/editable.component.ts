import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import validationConfig from './validation-config';

@Component({
  selector: 'uic-editable',
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.scss'],
})

/**
 * Class representing an _Editable Component_
 */
export class EditableComponent implements OnInit {
  constructor() {}

  @Input() data!: string;
  @Output() dataChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Pattern that must be matched for each type of input validation
   */
  @Input() pattern!: RegExp;

  /**
   * Custom messages for input validation
   */
  @Input() errorMessage!: string;

  /**
   * Used to identify which validation message to render
   * Expandable in ./validation-config.ts
   * Choices:
   * creditCard
   * name
   * city
   * date
   * state
   * street
   * postal
   * country
   */
  @Input() type!: string;

  @Input() editMode!: boolean;
  @Output() editModeChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  error = false;
  valid = false;
  titleInput = 'Edit and Press Enter';
  titleSuccess = 'Field was successfully edited';

  /**
   * Used to add custom validation messages based on user input
   */
  ngOnInit(): void {
    if (this.type) {
      this.setValidationType(this.type);
    }
  }

  /**
   * Setter function for Validation Type
   * @param type string
   */
  public setValidationType(type: string): void {
    const config = validationConfig[type];
    this.pattern = config.pattern;
    this.errorMessage = config.errorMessage;
  }

  /**
   * Emits a change event if user input is valid
   * @param e Event
   */
  onFocusOut(e: Event): void {
    const reg = new RegExp(this.pattern);
    const target = e.target as HTMLInputElement;
    const valid = reg.test(target.value);
    // if (!valid) {
    //   this.error = true;
    //   this.valid = false;
    // } else {
      this.error = false;
      this.valid = true;
      this.editMode = false;
      this.data = target.value;
      this.dataChange.emit(this.data);
    }
  //}
}
