import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { ErrorLevel } from '../../types/error-level';
import { InputField } from '../../types/input-field';
import { InputForm } from '../../types/input-form';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'input-form',
    styleUrls: ['./input-form.component.sass'],
    templateUrl: './input-form.component.html'
})
export class InputFormComponent<ExtraStatus extends PropertyKey> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Input() public inputForm!: InputForm<Record<string, InputField<any>>, ExtraStatus>;

    @Input() public submitButtonText!: string;

    @Input() public cancelButtonText: string | null = null;

    @Output() public submitButtonClicked = new EventEmitter<void>();

    @Output() public cancelButtonClicked = new EventEmitter<void>();

    public constructor(
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {}

    public get borderColor(): string {
        if (!this.inputForm.error)
            return '';
        switch (this.inputForm.error.level) {
        case ErrorLevel.Error:
            return this.styleConfig.css('formStatusError');
        case ErrorLevel.Info:
            return this.styleConfig.css('formStatusInfo');
        case ErrorLevel.Success:
            return this.styleConfig.css('formStatusSuccess');
        default:
            return '';
        }
    }
}
