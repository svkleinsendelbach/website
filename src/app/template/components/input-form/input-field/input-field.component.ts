import { Component, Input } from '@angular/core';
import { InputField } from 'src/app/template/classes/input-fields';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.sass']
})
export class InputFieldComponent {
  @Input() public field!: InputField<any> // eslint-disable-line @typescript-eslint/no-explicit-any

  @Input() public id!: string

  @Input() public label!: string

  @Input() public type!: InputFieldComponent.FieldType

  public constructor(
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService
  ) {}
}

export namespace InputFieldComponent {
  export type FieldType = FieldType.InputText | FieldType.Textarea | FieldType.Select

  export namespace FieldType {
    export interface InputText {
      type: 'inputText',
      placeholder: string,
      secure: boolean
    }

    export interface Textarea {
      type: 'textarea',
      placeholder: string
    }

    export interface Select {
      type: 'select',
      options: string[]
    }

    export function inputText(placeholder: string): FieldType.InputText {
      return {
        type: 'inputText',
        placeholder: placeholder,
        secure: false
      }
    }

    export function secureText(placeholder: string): FieldType.InputText {
      return {
        type: 'inputText',
        placeholder: placeholder,
        secure: true
      }
    }

    export function textarea(placeholder: string): FieldType.Textarea {
      return {
        type: 'textarea',
        placeholder: placeholder
      }
    }

    export function select(options: string[]): FieldType.Select {
      return {
        type: 'select',
        options: options
      }
    }
  }
}
