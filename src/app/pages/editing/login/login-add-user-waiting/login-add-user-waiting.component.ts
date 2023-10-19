import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/modules/authentication/services/auth.service';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { ErrorLevel } from 'src/app/modules/input-form/types/error-level';
import { InputError } from 'src/app/modules/input-form/types/input-error';
import { InputField } from 'src/app/modules/input-form/types/input-field';
import { InputForm } from 'src/app/modules/input-form/types/input-form';
import { internalLinks } from 'src/app/types/internal-link-path';
import { Router } from '@angular/router';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { ValidationResult } from 'src/app/modules/input-form/types/validation-result';
import { Validator } from 'src/app/modules/input-form/types/validator';

@Component({
    selector: 'app-login-add-user-waiting',
    styleUrls: ['./login-add-user-waiting.component.sass'],
    templateUrl: './login-add-user-waiting.component.html'
})
export class LoginAddUserWaitingComponent {
    @Output() private readonly addToWaitingUserCanceled = new EventEmitter<void>();

    public inputForm = new InputForm({
        firstName: new InputField<string>('', [Validator.required('Der Vorname ist erforderlich.')]),
        lastName: new InputField<string>('', [Validator.required('Der Nachname ist erforderlich.')])
    },
    {
        invalidInput: new InputError('Nicht alle Eingaben sind gültig.'),
        loading: new InputError('Antrag wird übermittelt.', ErrorLevel.Info),
        failed: new InputError('Antrag konnte nicht übermittelt werden.')
    });

    public constructor(
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly authService: AuthService,
        private readonly router: Router
    ) {}

    public async handleCancel() {
        this.inputForm.reset();
        await this.authService.logOut();
        this.addToWaitingUserCanceled.emit();
    }

    public async handleApply() {
        if (this.inputForm.status !== 'valid')
            return;
        const validation = this.inputForm.evaluate();
        if (validation === ValidationResult.Invalid)
            return;
        try {
            await this.authService.requestAccess(this.inputForm.field('firstName').value, this.inputForm.field('lastName').value);
            this.inputForm.status = 'valid';
            this.inputForm.reset();
            await this.router.navigateByUrl(internalLinks.home.link);
        } catch {
            this.inputForm.status = 'failed';
        }
    }
}
