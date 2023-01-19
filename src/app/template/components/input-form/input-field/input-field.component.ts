import { Component, Input } from '@angular/core';
import { InputField } from 'src/app/template/classes/input-field';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.sass']
})
export class InputFieldComponent {
  @Input() public id!: string

  @Input() public field!: InputField

  public constructor(
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService
  ) {}
}
