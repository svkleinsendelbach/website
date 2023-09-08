import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/modules/authentication/services/auth.service';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { ErrorLevel } from 'src/app/modules/input-form/types/error-level';
import { InputError } from 'src/app/modules/input-form/types/input-error';
import { InputField } from 'src/app/modules/input-form/types/input-field';
import { InputForm } from 'src/app/modules/input-form/types/input-form';
import { InternalLink } from 'src/app/types/internal-path';
import { LoginError } from 'src/app/modules/authentication/types/login-error';
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
        ...LoginError.Code.statusMessages
    });

    public constructor(
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly authService: AuthService,
        private readonly router: Router
    ) {}

    public async handleCancel() {
        this.inputForm.reset();
        await this.authService.removeRegistration();
        this.addToWaitingUserCanceled.emit();
    }

    public async handleApply() {
        if (this.inputForm.status !== 'valid')
            return;
        const validation = this.inputForm.evaluate();
        if (validation === ValidationResult.Invalid)
            return;
        const result = await this.authService
            .requestAccess(this.inputForm.field('firstName').value, this.inputForm.field('lastName').value)
            .catch(reason => this.handleLoginError(reason));
        if (result === 'error')
            return;
        this.inputForm.status = 'valid';
        this.inputForm.reset();
        await this.router.navigateByUrl(InternalLink.all.home.link);
    }

    private handleLoginError(reason: unknown): 'error' {
        if (typeof reason !== 'object' || reason === null) {
            this.inputForm.status = 'unknown';
            return 'error';
        }
        if (!('name' in reason) || (reason as Record<'name', unknown>).name !== 'WebsiteEditorAuthServiceLoginError') {
            this.inputForm.status = 'unknown';
            return 'error';
        }
        if (!('code' in reason) || typeof (reason as Record<'code', unknown>).code !== 'string' || !LoginError.Code.typeGuard((reason as Record<'code', string>).code)) {
            this.inputForm.status = 'unknown';
            return 'error';
        }
        this.inputForm.status = (reason as Record<'code', LoginError.Code>).code;
        return 'error';
    }
}
