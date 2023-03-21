import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { ErrorLevel } from '../../types/error-level';
import { InputField } from '../../types/input-field';
import { InputForm } from '../../types/input-form';

@Component({
    selector: 'input-form',
    templateUrl: './input-form.component.html',
    styleUrls: ['./input-form.component.sass']
})
export class InputFormComponent<ExtraStatus extends PropertyKey> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Input() public inputForm!: InputForm<Record<string, InputField<any>>, ExtraStatus>;

    @Input() public submitButtonText!: string;

    @Input() public cancelButtonText?: string;

    @Output() public submitButtonClicked = new EventEmitter<void>();

    @Output() public cancelButtonClicked = new EventEmitter<void>();

    public constructor(
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {}

    public get borderColor(): string {
        if (this.inputForm.error === undefined)
            return '';
        switch (this.inputForm.error.level) {
        case ErrorLevel.Error: return this.styleConfig.css('formErrorStatusColor');
        case ErrorLevel.Info: return this.styleConfig.css('formInfoStatusColor');
        case ErrorLevel.Success: return this.styleConfig.css('formSuccessStatusColor');
        }
    }
}
