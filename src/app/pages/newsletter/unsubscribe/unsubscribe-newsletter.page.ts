import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TextSectionComponent, InputFormComponent, TextInputComponent, NavigationBarComponent, NavigationBarData, DeviceTypeService, FirebaseApiService, RecaptchaService, InputError, InputField, InputForm, Validator } from 'kleinsendelbach-website-library';
import { InternalPathKey } from '../../../types/internal-paths';
import { Title } from '@angular/platform-browser';
import { FirebaseFunctions } from '../../../types/firebase-functions';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'unsubscribe-newsletter-page',
    standalone: true,
    imports: [CommonModule, TextSectionComponent, InputFormComponent, TextInputComponent, NavigationBarComponent],
    templateUrl: './unsubscribe-newsletter.page.html',
    styleUrl: './unsubscribe-newsletter.page.sass'
})
export class UnsubscribeNewsletterPage {

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
        loading: new InputError('Sie werden für den Newsletter abgemeldet.', 'info'),
        recaptchaFailed: new InputError('reCAPTCHA ungültig.'),
        failed: new InputError('Abmeldung ist fehlgeschlagen.'),
        success: new InputError('Sie haben den Newsletter deabonniert.', 'success')
    });

    public unsubscribeWithIdState: 'loading' | 'failed' | 'success' = 'loading';

    constructor(
        private readonly titleService: Title,
        private readonly route: ActivatedRoute,
        public readonly deviceType: DeviceTypeService,
        private readonly firebaseApi: FirebaseApiService<FirebaseFunctions>,
        private readonly recaptchaService: RecaptchaService
    ) {
        this.titleService.setTitle('Newsletter Abmeldung');
        void this.tryUnsubscribeWithId();
    }

    private async tryUnsubscribeWithId() {
        const params = await firstValueFrom(this.route.params);
        if (!('id' in params) || typeof params['id'] !== 'string') {
            this.unsubscribeWithIdState = 'failed';
            return;
        }
        const result = await this.firebaseApi.function('newsletter-subscription-unsubscribe').call({
            id: params['id'],
            email: null
        });
        if (result.isSuccess())
            this.unsubscribeWithIdState = 'success';
        else
            this.unsubscribeWithIdState = 'failed';
    }

    public async onSubmit() {
        if (this.inputForm.evaluate() === 'invalid')
            return;
        this.inputForm.status = 'loading';
        if (await this.recaptchaService.verify('unsubscribe_newsletter_page') === 'invalid') {
            this.inputForm.status = 'recaptchaFailed';
            return;
        }
        const result = await this.firebaseApi.function('newsletter-subscription-unsubscribe').call({
            id: null,
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
