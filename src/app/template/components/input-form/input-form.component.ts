import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { InputField } from '../../classes/input-field';
import { InputForm } from '../../classes/input-form';
import { DeviceTypeService } from '../../services/device-type.service';
import { StyleConfigService } from '../../services/style-config.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.sass']
})
export class InputFormComponent<ExtraStatus extends string> implements AfterViewInit {
  @Input() public inputForm!: InputForm<Record<string, InputField>, ExtraStatus>

  @Input() public submitButtonText!: string;

  @Input() public cancelButtonText?: string;

  @Output() public submitButtonClicked = new EventEmitter<void>();

  @Output() public cancelButtonClicked = new EventEmitter<void>();

  @ViewChild('form') public formElement!: ElementRef<HTMLElement>

  public constructor(
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService
  ) {}

  public ngAfterViewInit() {
    this.inputForm.setElements(this.formElement.nativeElement)
  }

  public formStatusColor(level: InputForm.StatusLevel): string {
    switch (level) {
      case InputForm.StatusLevel.Success: return this.styleConfig.css('formSuccessStatusColor')
      case InputForm.StatusLevel.Info: return this.styleConfig.css('formInfoStatusColor')
      case InputForm.StatusLevel.Error: return this.styleConfig.css('formErrorStatusColor')
    }
  }

  public asdf(v: string) {
    console.log(v)
  }
}
