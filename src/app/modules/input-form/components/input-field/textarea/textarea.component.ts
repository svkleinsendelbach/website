import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { InputField } from '../../../types/input-field';

@Component({
    selector: 'input-field-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.sass']
})
export class TextareaComponent implements AfterViewInit {
  @Input() public label!: string;

  @Input() public placeholder: string | undefined = undefined;

  @Input() public inputField!: InputField<string>;

  @ViewChild('textarea') private textareaElement!: ElementRef<HTMLTextAreaElement>;

  public constructor(
    public styleConfig: StyleConfigService
  ) {}

  public ngAfterViewInit() {
      this.textareaElement.nativeElement.value = this.inputField.value;
  }

  public onBlur() {
      this.inputField.inputValue = this.textareaElement.nativeElement.value;
  }
}
