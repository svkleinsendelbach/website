import { Component, EventEmitter, Output } from '@angular/core';
import { AppearanceService } from 'src/app/services/appearance.service';
import { AuthService } from 'src/app/modules/authentication/services/auth.service';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { ErrorLevel } from 'src/app/modules/input-form/types/error-level';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { InputError } from 'src/app/modules/input-form/types/input-error';
import { InputField } from 'src/app/modules/input-form/types/input-field';
import { InputForm } from 'src/app/modules/input-form/types/input-form';
import { InternalLink } from 'src/app/types/internal-path';
import { LoginError } from 'src/app/modules/authentication/types/login-error';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { RegistrationStatus } from 'src/app/modules/authentication/types/registration-status';
import { Router } from '@angular/router';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { ValidationResult } from 'src/app/modules/input-form/types/validation-result';
import { Validator } from 'src/app/modules/input-form/types/validator';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-login-page',
    styleUrls: ['./login-page.component.sass'],
    templateUrl: './login-page.component.html'
})
export class LoginPageComponent {
    @Output() private readonly userUnregisteredEmitter = new EventEmitter<void>();

    public signInWithAppleStatus: LoginError.Code | 'loading' | 'valid' = 'valid';

    public signInWithGoogleStatus: LoginError.Code | 'loading' | 'valid' = 'valid';

    public inputForm = new InputForm(
        {
            email: new InputField<string>('', [
                Validator.required('Die E-Mail Addresse ist erforderlich.'),
                Validator.email('Das ist keine gültige E-Mail Addresse.')
            ]),
            password: new InputField<string>('', [
                Validator.required('Das Passwort ist erforderlich.'),
                Validator.minLength(8, 'Das Passwort muss mindestens 8 Zeichen lang sein.'),
                Validator.containsAnInteger('Das Passwort muss eine Zahl enthalten.'),
                Validator.containsALowercasedCharacter('Das Passwort muss einen Kleinbuchstaben enthalten.'),
                Validator.containsAnUppercasedCharacter('Das Passwort muss einen Großbuchstaben enthalten.')
            ])
        },
        {
            invalidInput: new InputError('Nicht alle Eingaben sind gültig.'),
            loading: new InputError('Anmeldung wird geprüft.', ErrorLevel.Info),
            recaptchaFailed: new InputError('reCAPTCHA ungültig.'),
            ...LoginError.Code.statusMessages
        }
    );

    public constructor(
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        public readonly appearance: AppearanceService,
        private readonly authService: AuthService,
        private readonly firebaseApiService: FirebaseApiService,
        private readonly recaptchaService: ReCaptchaV3Service,
        private readonly router: Router
    ) {}

    public onSubmit() {
        if (this.inputForm.status !== 'valid')
            return;
        const validation = this.inputForm.evaluate();
        if (validation === ValidationResult.Invalid)
            return;
        void this.loginWithEmail();
    }

    public async loginWithEmail() {
        this.signInWithAppleStatus = 'valid';
        this.signInWithGoogleStatus = 'valid';
        this.inputForm.status = 'loading';
        const token = await lastValueFrom(this.recaptchaService.execute('websiteEditingLoginForm'));
        const verifyResponse = await this.firebaseApiService.function('verifyRecaptcha').call({
            token: token
        });
        if (verifyResponse.action !== 'websiteEditingLoginForm' || !verifyResponse.success) {
            this.inputForm.status = 'recaptchaFailed';
            return;
        }
        const registrationStatus = await this.authService
            .loginWithEmail(this.inputForm.field('email').value, this.inputForm.field('password').value)
            .catch(reason => this.handleLoginError(reason, 'inputForm'));
        if (registrationStatus === 'error')
            return;
        await this.handleRegistrationStatus(registrationStatus);
    }

    public async loginWithApple() {
        this.signInWithAppleStatus = 'loading';
        this.signInWithGoogleStatus = 'valid';
        this.inputForm.status = 'valid';
        this.inputForm.reset();
        const registrationStatus = await this.authService
            .loginWithApple()
            .catch(reason => this.handleLoginError(reason, 'apple'));
        if (registrationStatus === 'error')
            return;
        await this.handleRegistrationStatus(registrationStatus);
    }

    public async loginWithGoogle() {
        this.signInWithAppleStatus = 'valid';
        this.signInWithGoogleStatus = 'loading';
        this.inputForm.status = 'valid';
        this.inputForm.reset();
        const registrationStatus = await this.authService
            .loginWithGoogle()
            .catch(reason => this.handleLoginError(reason, 'google'));
        if (registrationStatus === 'error')
            return;
        await this.handleRegistrationStatus(registrationStatus);
    }

    public loginErrorMessage(code: LoginError.Code): string {
        return LoginError.Code.statusMessages[code].message;
    }

    private handleLoginError(reason: unknown, type: 'apple' | 'google' | 'inputForm'): 'error' {
        if (typeof reason !== 'object' || reason === null)
            return this.setStatus(type, 'unknown');
        if (!('name' in reason) || (reason as Record<'name', unknown>).name !== 'WebsiteEditorAuthServiceLoginError')
            return this.setStatus(type, 'unknown');
        if (!('code' in reason) || typeof (reason as Record<'code', unknown>).code !== 'string' || !LoginError.Code.typeGuard((reason as Record<'code', string>).code))
            return this.setStatus(type, 'unknown');
        return this.setStatus(type, (reason as Record<'code', LoginError.Code>).code);
    }

    private setStatus(type: 'apple' | 'google' | 'inputForm', status: LoginError.Code): 'error' {
        switch (type) {
        case 'inputForm':
            this.inputForm.status = status;
            break;
        case 'apple':
            this.signInWithAppleStatus = status;
            break;
        case 'google':
            this.signInWithGoogleStatus = status;
            break;
        default:
            break;
        }
        return 'error';
    }

    private async handleRegistrationStatus(registrationStatus: RegistrationStatus) {
        this.signInWithAppleStatus = 'valid';
        this.signInWithGoogleStatus = 'valid';
        this.inputForm.status = 'valid';
        this.inputForm.reset();
        if (registrationStatus === 'registered')
            await this.router.navigateByUrl(InternalLink.all.bearbeiten.link);
        else
            this.userUnregisteredEmitter.emit();
    }
}
