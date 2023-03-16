import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { StyleConfigService } from 'src/app/template/services/style-config.service';
import { InputField } from '../../../types/input-field';

@Component({
    selector: 'input-field-text',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.sass']
})
export class TextInputComponent implements AfterViewInit {
  @Input() public secure = false;

  @Input() public label!: string;

  @Input() public placeholder: string | undefined = undefined;

  @Input() public inputField!: InputField<string>;

  @ViewChild('input') private inputElement!: ElementRef<HTMLInputElement>;

  public constructor(
    public styleConfig: StyleConfigService
  ) {}

  public ngAfterViewInit() {
      this.inputElement.nativeElement.value = this.inputField.value;
  }

  public onBlur() {
      this.inputField.inputValue = this.inputElement.nativeElement.value;
  }
}
