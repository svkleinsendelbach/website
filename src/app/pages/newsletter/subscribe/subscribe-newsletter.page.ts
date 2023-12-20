import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeviceTypeService, FirebaseApiService, InputError, InputField, InputForm, InputFormComponent, TextInputComponent, TextSectionComponent, Validator, RecaptchaService, NavigationBarComponent, NavigationBarData } from 'kleinsendelbach-website-library';
import { FirebaseFunctions } from '../../../types/firebase-functions';
import { CommonModule } from '@angular/common';
import { InternalPathKey } from '../../../types/internal-paths';

@Component({
    selector: 'subscribe-newsletter-page',
    standalone: true,
    imports: [CommonModule, TextSectionComponent, InputFormComponent, TextInputComponent, NavigationBarComponent],
    templateUrl: './subscribe-newsletter.page.html',
    styleUrl: './subscribe-newsletter.page.sass'
})
export class SubscribeNewsletterPage {

    public navigationBarData: NavigationBarData<InternalPathKey> = [
        {
            text: 'Zurück',
            alignment: 'left',
            link: 'newsletter',
            action: null
        }
    ];

    public inputForm = new InputForm({
        email: new InputField<string>('', [
            Validator.required('Ihre E-Mail Addresse ist erforderlich.'),
            Validator.email('Das ist keine gültige E-Mail Addresse.')
        ])
    }, {
        invalidInput: new InputError('Nicht alle Eingaben sind gültig'),
        loading: new InputError('Sie werden für den Newsletter angemeldet.', 'info'),
        recaptchaFailed: new InputError('reCAPTCHA ungültig.'),
        failed: new InputError('Anmeldung ist fehlgeschlagen.'),
        success: new InputError('Sie haben den Newsletter abonniert.', 'success')
    });

    constructor(
        private readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        private readonly firebaseApi: FirebaseApiService<FirebaseFunctions>,
        private readonly recaptchaService: RecaptchaService
    ) {
        this.titleService.setTitle('Newsletter Anmeldung');
    }

    public async onSubmit() {
        if (this.inputForm.evaluate() === 'invalid')
            return;
        this.inputForm.status = 'loading';
        if (await this.recaptchaService.verify('subscribe_newsletter_page') === 'invalid') {
            this.inputForm.status = 'recaptchaFailed';
            return;
        }
        const result = await this.firebaseApi.function('newsletter-subscription-subscribe').call({
            email: this.inputForm.field('email').value
        });
        if (result.isSuccess()) {
            this.inputForm.status = 'valid';
            this.inputForm.reset();
        } else {
            this.inputForm.status = 'failed';
        }
    }
}
