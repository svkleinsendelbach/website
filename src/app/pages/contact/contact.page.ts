import { Component } from '@angular/core';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { ErrorLevel } from 'src/app/modules/input-form/types/error-level';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { InputError } from 'src/app/modules/input-form/types/input-error';
import { InputField } from 'src/app/modules/input-form/types/input-field';
import { InputForm } from 'src/app/modules/input-form/types/input-form';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { SelectOptions } from 'src/app/modules/input-form/components/input-field/select/select.component';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';
import { ValidationResult } from 'src/app/modules/input-form/types/validation-result';
import { Validator } from 'src/app/modules/input-form/types/validator';
import { lastValueFrom } from 'rxjs';

type AnswerOptions = 'email' | 'whats-app-sms' | 'discord';

namespace AnswerOptions {
    export const all: AnswerOptions[] = ['email', 'whats-app-sms', 'discord'];

    export const description: Record<AnswerOptions, string> = {
        'email': 'E-Mail',
        'whats-app-sms': 'WhatsApp oder SMS',
        'discord': 'Discord'
    };
}

export type Receiver = 'managers' | 'football-adults' | 'football-youth' | 'dancing' | 'gymnastics';

namespace Receiver {
    export const all: Receiver[] = ['managers', 'football-adults', 'football-youth', 'dancing', 'gymnastics'];

    export const description: Record<Receiver, string> = {
        'managers': 'Vorstandschaft',
        'football-adults': 'Herrenfußball',
        'football-youth': 'Jugendfußball',
        'dancing': 'Tanzen',
        'gymnastics': 'Gymnastik'
    };
}

@Component({
    selector: 'pages-contact',
    styleUrls: ['./contact.page.sass'],
    templateUrl: './contact.page.html'
})
export class ContactPage {
    // eslint-disable-next-line @typescript-eslint/consistent-generic-constructors
    public inputForm: InputForm<{
        name: InputField<string>;
        answerOption: InputField<AnswerOptions>;
        email: InputField<string>;
        phoneNumber: InputField<string>;
        discordUserId: InputField<string>;
        receiver: InputField<Receiver>;
        message: InputField<string>;
    }, 'invalidInput' | 'loading' | 'recaptchaFailed' | 'failed' | 'success'> = new InputForm({
            name: new InputField<string>('', [Validator.required('Ihr Name ist erforderlich.')]),
            answerOption: new InputField<AnswerOptions>('email', [
                Validator.required('Eine Antwortoption ist erforderlich.'),
                Validator.isOneOf(AnswerOptions.all, 'Die Antwortoption ist ungültig.')
            ]),
            email: new InputField<string>('', [
                Validator.validateIf(() => this.inputForm.field('answerOption').value === 'email', Validator.required('Ihre E-Mail Addresse ist erforderlich.')),
                Validator.validateIf(() => this.inputForm.field('answerOption').value === 'email', Validator.email('Das ist keine gültige E-Mail Addresse.'))
            ]),
            phoneNumber: new InputField<string>('', [
                Validator.validateIf(() => this.inputForm.field('answerOption').value === 'whats-app-sms', Validator.required('Ihre Mobilfunknummer ist erforderlich.')),
                Validator.validateIf(() => this.inputForm.field('answerOption').value === 'whats-app-sms', Validator.phoneNumber('Das ist keine gültige Telefonnummer.'))
            ]),
            discordUserId: new InputField<string>('', [
                Validator.validateIf(() => this.inputForm.field('answerOption').value === 'discord', Validator.required('Ihre Discord Nutzer-ID ist erforderlich.')),
                Validator.validateIf(() => this.inputForm.field('answerOption').value === 'discord', Validator.pattern(/^\d{18}$/u, 'Das ist keine gültige Discord Nutzer-ID.'))
            ]),
            receiver: new InputField<Receiver>('managers', [
                Validator.required('Eine Empfänger ist erforderlich.'),
                Validator.isOneOf(Receiver.all, 'Die Empfänger ist ungültig.')
            ]),
            message: new InputField<string>('', [Validator.required('Eine Nachricht ist erforderlich.')])
        },
        {
            invalidInput: new InputError('Nicht alle Eingaben sind gültig.'),
            loading: new InputError('Die Nachricht wird versandt.', ErrorLevel.Info),
            recaptchaFailed: new InputError('reCAPTCHA ungültig.'),
            failed: new InputError('Die Nachricht konnte nicht versandt werden.'),
            success: new InputError('Die Nachricht wurde versandt', ErrorLevel.Success)
        });

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly firebaseApiService: FirebaseApiService,
        private readonly recaptchaService: ReCaptchaV3Service
    ) {
        this.titleService.setTitle('Kontakt');
    }

    public get answerOptionSelectOptions(): SelectOptions.Ungrouped<AnswerOptions> {
        return SelectOptions.ungrouped<AnswerOptions>(AnswerOptions.all.map(answerOption => ({
            id: answerOption,
            text: AnswerOptions.description[answerOption]
        })));
    }

    public get receiverSelectOptions(): SelectOptions<Receiver> {
        return SelectOptions.ungrouped<Receiver>(Receiver.all.map(receiver => ({
            id: receiver,
            text: Receiver.description[receiver]
        })));
    }

    public async onSubmit() {
        if (this.inputForm.status === 'loading')
            return;
        this.inputForm.status = 'valid';
        const validation = this.inputForm.evaluate();
        if (validation === ValidationResult.Invalid)
            return;
        this.inputForm.status = 'loading';
        const token = await lastValueFrom(this.recaptchaService.execute('contactForm'));
        const verifyResponse = await this.firebaseApiService.function('verifyRecaptcha').call({
            token: token
        });
        if (verifyResponse.isFailure() || verifyResponse.value.action !== 'contactForm' || !verifyResponse.value.success) {
            this.inputForm.status = 'recaptchaFailed';
            return;
        }
        const answer = this.inputForm.field('answerOption').value === 'email'
            ? { email: this.inputForm.field('email').value }
            : this.inputForm.field('answerOption').value === 'whats-app-sms'
                ? { phoneNumber: this.inputForm.field('phoneNumber').value }
                : { discordUserId: this.inputForm.field('discordUserId').value };
        try {
            await this.firebaseApiService.function('contact').call({
                name: this.inputForm.field('name').value,
                answer: answer,
                receiver: this.inputForm.field('receiver').value,
                message: this.inputForm.field('message').value
            });
            this.inputForm.status = 'success';
            this.inputForm.reset();
        } catch {
            this.inputForm.status = 'failed';
        }
    }
}
