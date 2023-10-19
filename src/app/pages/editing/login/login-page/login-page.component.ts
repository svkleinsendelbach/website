import { Component, EventEmitter, Output } from '@angular/core';
import { AppearanceService } from 'src/app/services/appearance.service';
import { AuthService } from 'src/app/modules/authentication/services/auth.service';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { ErrorLevel } from 'src/app/modules/input-form/types/error-level';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { InputError } from 'src/app/modules/input-form/types/input-error';
import { InputField } from 'src/app/modules/input-form/types/input-field';
import { InputForm } from 'src/app/modules/input-form/types/input-form';
import { internalLinks } from 'src/app/types/internal-link-path';
import { ReCaptchaV3Service } from 'ng-recaptcha';
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

    public signInWithAppleStatus: 'loading' | 'valid' | 'failed' = 'valid';

    public signInWithGoogleStatus: 'loading' | 'valid' | 'failed' = 'valid';

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
            failed: new InputError('Anmeldung ist fehlgeschlagen.')
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
        if (verifyResponse.isFailure() || verifyResponse.value.action !== 'websiteEditingLoginForm' || !verifyResponse.value.success) {
            this.inputForm.status = 'recaptchaFailed';
            return;
        }
        try {
            const registrationStatus = await this.authService.logIn({
                email: this.inputForm.field('email').value,
                password: this.inputForm.field('password').value
            });
            await this.handleRegistrationStatus(registrationStatus);
        } catch {
            this.inputForm.status = 'failed';
        }
    }

    public async loginWithApple() {
        this.signInWithAppleStatus = 'loading';
        this.signInWithGoogleStatus = 'valid';
        this.inputForm.status = 'valid';
        this.inputForm.reset();
        try {
            const registrationStatus = await this.authService.logIn('apple');
            await this.handleRegistrationStatus(registrationStatus);
        } catch {
            this.signInWithAppleStatus = 'failed';
        }
    }

    public async loginWithGoogle() {
        this.signInWithAppleStatus = 'valid';
        this.signInWithGoogleStatus = 'loading';
        this.inputForm.status = 'valid';
        this.inputForm.reset();
        try {
            const registrationStatus = await this.authService.logIn('google');
            await this.handleRegistrationStatus(registrationStatus);
        } catch {
            this.signInWithGoogleStatus = 'failed';
        }
    }

    private async handleRegistrationStatus(registrationStatus: 'registered' | 'unregistered') {
        this.signInWithAppleStatus = 'valid';
        this.signInWithGoogleStatus = 'valid';
        this.inputForm.status = 'valid';
        this.inputForm.reset();
        if (registrationStatus === 'registered')
            await this.router.navigateByUrl(internalLinks.bearbeiten.link);
        else
            this.userUnregisteredEmitter.emit();
    }
}
