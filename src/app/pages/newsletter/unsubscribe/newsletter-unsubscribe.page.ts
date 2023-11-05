import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { lastValueFrom } from 'rxjs';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { ErrorLevel } from 'src/app/modules/input-form/types/error-level';
import { InputError } from 'src/app/modules/input-form/types/input-error';
import { InputField } from 'src/app/modules/input-form/types/input-field';
import { InputForm } from 'src/app/modules/input-form/types/input-form';
import { ValidationResult } from 'src/app/modules/input-form/types/validation-result';
import { Validator } from 'src/app/modules/input-form/types/validator';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'app-newsletter-unsubscribe',
    templateUrl: './newsletter-unsubscribe.page.html',
    styleUrls: ['./newsletter-unsubscribe.page.sass']
})
export class NewsletterUnsubscribePage {
    public inputForm = new InputForm({
        email: new InputField<string>('', [
            Validator.required('Ihre E-Mail Addresse ist erforderlich.'),
            Validator.email('Das ist keine gültige E-Mail Addresse.')
        ])
    }, {
        invalidInput: new InputError('Nicht alle Eingaben sind gültig'),
        loading: new InputError('Sie werden für den Newsletter abgemeldet.', ErrorLevel.Info),
        recaptchaFailed: new InputError('reCAPTCHA ungültig.'),
        failed: new InputError('Abmeldung ist fehlgeschlagen.'),
        success: new InputError('Sie haben den Newsletter deabonniert.', ErrorLevel.Success)
    });

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly firebaseApiService: FirebaseApiService,
        private readonly recaptchaService: ReCaptchaV3Service
    ) {
        this.titleService.setTitle('Newsletter Abmeldung');
    }

    public async onSubmit() {
        if (this.inputForm.status === 'loading')
            return;
        if (this.inputForm.evaluate() === ValidationResult.Invalid)
            return;
        this.inputForm.status = 'loading';
        if (await this.verifyRecaptcha() === ValidationResult.Invalid)
            return;
        const result = await this.firebaseApiService.function('newsletter-subscription-unsubscribe').call({
            id: null,
            email: this.inputForm.field('email').value
        });
        if (result.isSuccess()) {
            this.inputForm.status = 'success';
            this.inputForm.reset();
        } else
            this.inputForm.status = 'failed';
    }

    private async verifyRecaptcha(): Promise<ValidationResult> {
        const token = await lastValueFrom(this.recaptchaService.execute('newsletterUnsubscribe'));
        const verifyResponse = await this.firebaseApiService.function('verifyRecaptcha').call({
            token: token
        });
        if (verifyResponse.isSuccess() && verifyResponse.value.action === 'newsletterUnsubscribe' && verifyResponse.value.success)
            return ValidationResult.Valid;
        this.inputForm.status = 'recaptchaFailed';
        return ValidationResult.Invalid;
    }
}
