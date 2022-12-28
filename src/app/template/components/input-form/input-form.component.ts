import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { InputFields } from '../../classes/input-fields';
import { DeviceTypeService } from '../../services/device-type.service';
import { StyleConfigService } from '../../services/style-config.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.sass']
})
export class InputFormComponent<ExtraStatus extends string> implements AfterViewInit {
  @Input() public inputFields!: InputFields<any, ExtraStatus> // eslint-disable-line @typescript-eslint/no-explicit-any

  @Input() public submitButtonText!: string;

  @Output() public submitButtonClicked = new EventEmitter<void>()

  @ViewChild('form') public formElement!: ElementRef<HTMLFormElement>

  public constructor(
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService
  ) {}

  public ngAfterViewInit() {
    this.inputFields.setElements(this.formElement.nativeElement)
  }

  public formStatusColor(level: InputFields.StatusLevel): string {
    switch (level) {
      case InputFields.StatusLevel.Success: return this.styleConfig.css('formSuccessStatusColor')
      case InputFields.StatusLevel.Info: return this.styleConfig.css('formInfoStatusColor')
      case InputFields.StatusLevel.Error: return this.styleConfig.css('formErrorStatusColor')
    }
  }
}
