import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { lastValueFrom } from 'rxjs';
import { ErrorLevel } from 'src/app/modules/input-form/types/error-level';
import { InputError } from 'src/app/modules/input-form/types/input-error';
import { InputField } from 'src/app/modules/input-form/types/input-field';
import { InputForm } from 'src/app/modules/input-form/types/input-form';
import { ValidationResult } from 'src/app/modules/input-form/types/validation-result';
import { Validator } from 'src/app/modules/input-form/types/validator';
import { SelectOptions } from 'src/app/modules/input-form/components/input-field/select/select.component';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { FunctionType } from 'src/app/modules/firebase-api/types/function-type';
import { SendMailContactFunctionType } from 'src/app/modules/firebase-api/function-types';

@Component({
    selector: 'pages-contact',
    templateUrl: './contact.page.html',
    styleUrls: ['./contact.page.sass']
})
export class ContactPage {
    public inputForm = new InputForm(
        {
            name: new InputField<string>('', [
                Validator.required('Ihr Name ist erforderlich.')
            ]),
            email: new InputField<string>('', [
                Validator.required('Ihre E-Mail Addresse ist erforderlich.'),
                Validator.email('Das ist keine gültige E-Mail Addresse.')
            ]),
            receiver: new InputField<keyof typeof ContactPage.receivers>('managers', [
                Validator.required('Ein Empfänger ist erforderlich.'),
                Validator.isOneOf(Object.keys(ContactPage.receivers), 'Der Empfänger ist ungültig')
            ]),
            message: new InputField<string>('', [
                Validator.required('Eine Nachricht ist erforderlich.')
            ])
        },
        {
            invalidInput: new InputError('Nicht alle Eingaben sind gültig.'),
            loading: new InputError('Email wird versandt.', ErrorLevel.Info),
            recaptchaFailed: new InputError('reCAPTCHA ungültig.'),
            sendFailed: new InputError('Es gab einen Fehler beim Senden.'),
            sendSucceded: new InputError('Email wurde versendet.', ErrorLevel.Success)
        }
    );

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly firebaseApiService: FirebaseApiService,
        private recaptchaService: ReCaptchaV3Service
    ) {
        this.titleService.setTitle('Kontakt');
    }

    public get receiverSelectOptions(): SelectOptions<keyof typeof ContactPage.receivers> {
        return SelectOptions.ungrouped<keyof typeof ContactPage.receivers>(
            Object.entries(ContactPage.receivers).map(receiverEntry => {
                return {
                    id: receiverEntry[0] as keyof typeof ContactPage.receivers,
                    text: receiverEntry[1].name
                };
            })
        );
    }

    public onSubmit() {
        if (this.inputForm.status === 'loading')
            return;
        this.inputForm.status = 'valid';
        const validation = this.inputForm.evaluate();
        if (validation === ValidationResult.Invalid)
            return;
        this.sendContactMail();
    }

    private async sendContactMail() {
        const receiver = ContactPage.receivers[this.inputForm.field('receiver').value];
        this.inputForm.status = 'loading';
        const token = await lastValueFrom(this.recaptchaService.execute('contactForm'));
        const verifyResponse = await this.firebaseApiService.function('verifyRecaptcha').call({
            token: token
        });
        if (verifyResponse.action !== 'contactForm' || !verifyResponse.success) {
            this.inputForm.status = 'recaptchaFailed';
            return;
        }
        const request: FunctionType.Parameters<SendMailContactFunctionType> = {
            senderName: this.inputForm.field('name').value,
            senderAddress: this.inputForm.field('email').value,
            receiverName: receiver.name,
            receiverAddress: receiver.address,
            message: this.inputForm.field('message').value,
        };
        const response = await this.firebaseApiService.function('sendMail').function('contact').call(request);
        const status: 'sendSucceded' | 'sendFailed' = response.success ? 'sendSucceded' : 'sendFailed';
        this.inputForm.status = status;
        if (response.success) {
            this.inputForm.reset();
        }
    }
}

export namespace ContactPage {
    export const receivers = {
        managers: {
            name: 'Vorstandschaft',
            address: 'vorstand@sv-kleinsendelbach.de'
        },
        footballAdults: {
            name: 'Herrenfußball',
            address: 'herrenfußball@sv-kleinsendelbach.de'
        },
        footballYouth: {
            name: 'Jugendfußball',
            address: 'jugenfußball@sv-kleinsendelbach.de'
        },
        gymnastics: {
            name: 'Gymnastik',
            address: 'gymnastik@sv-kleinsendelbach.de'
        },
        dancing: {
            name: 'Tanzen',
            address: 'tanzen@sv-kleinsendelbach.de'
        },
    };
}
