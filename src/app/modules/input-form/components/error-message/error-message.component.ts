import { Component, Input } from '@angular/core';
import { ErrorLevel } from '../../types/error-level';
import { InputError } from '../../types/input-error';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'error-message',
    styleUrls: ['./error-message.component.sass'],
    templateUrl: './error-message.component.html'
})
export class ErrorMessageComponent {
    @Input() public error!: InputError | null;

    public constructor(
        public styleConfig: StyleConfigService
    ) {}

    public get messageColor(): string {
        if (!this.error)
            return '';
        switch (this.error.level) {
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
