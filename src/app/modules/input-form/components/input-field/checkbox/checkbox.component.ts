import { Component, Input } from '@angular/core';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { InputField } from '../../../types/input-field';

@Component({
    selector: 'input-field-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.sass']
})
export class CheckboxComponent {

  @Input() public label!: string;

  @Input() public inputField!: InputField<boolean>;

  public constructor(
    public styleConfig: StyleConfigService
  ) {}

  public get checked(): boolean {
      return this.inputField.value;
  }

  public set checked(checked: boolean) {
      this.inputField.inputValue = checked;
  }

  public onClick() {
      this.checked = !this.inputField.value;
  }
}
