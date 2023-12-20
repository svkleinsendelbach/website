import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FirebaseApiService, InlineSelectInputComponent, InputField, InputForm, InputFormComponent, LinkDirective, RecaptchaService, SelectInputComponent, SelectOptions, TextAreaInputComponent, TextInputComponent, TextSectionComponent, Validator, entries, keys } from 'kleinsendelbach-website-library';
import { FirebaseFunctions } from '../../types/firebase-functions';

@Component({
    selector: 'contact-page',
    standalone: true,
    imports: [CommonModule, TextSectionComponent, InputFormComponent, InlineSelectInputComponent, SelectInputComponent, TextInputComponent, TextAreaInputComponent, LinkDirective],
    templateUrl: './contact.page.html',
    styleUrl: './contact.page.sass'
})
export class ContactPage {

    public static answerOptions = {
        'email': 'E-Mail',
        'whats-app-sms': 'WhatsApp oder SMS',
        'discord': 'Discord'
    } satisfies Record<string, string>;

    public static receivers = {
        'managers': 'Vorstandschaft',
        'football-adults': 'Herrenfußball',
        'football-youth': 'Jugendfußball',
        'dancing': 'Tanzen',
        'gymnastics': 'Gymnastik'
    } satisfies Record<string, string>;

    public inputForm: InputForm<{
        name: string;
        answerOption: keyof typeof ContactPage.answerOptions;
        email: string;
        phoneNumber: string;
        discordUserId: string;
        receiver: keyof typeof ContactPage.receivers;
        message: string;
    }, 'recaptchaFailed'> = new InputForm({
        name: new InputField<string>('', [Validator.required('Ihr Name ist erforderlich.')]),
        answerOption: new InputField<keyof typeof ContactPage.answerOptions>('email', [
            Validator.required('Eine Antwortoption ist erforderlich.'),
            Validator.isOneOf(keys(ContactPage.answerOptions), 'Die Antwortoption ist ungültig.')
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
        receiver: new InputField<keyof typeof ContactPage.receivers>('managers', [
            Validator.required('Eine Empfänger ist erforderlich.'),
            Validator.isOneOf(keys(ContactPage.receivers), 'Die Empfänger ist ungültig.')
        ]),
        message: new InputField<string>('', [Validator.required('Eine Nachricht ist erforderlich.')])
    },
    {
        recaptchaFailed: 'Ungültige reCAPTCHA. Bitte versuchen Sie es erneut.'
    });

    constructor(
        private readonly titleService: Title,
        private readonly firebaseApi: FirebaseApiService<FirebaseFunctions>,
        private readonly recaptchaService: RecaptchaService
    ) {
        this.titleService.setTitle('Kontakt')
    }

    public get answerOptionSelectOptions(): SelectOptions.Ungrouped<keyof typeof ContactPage.answerOptions> {
        return SelectOptions.ungrouped(entries(ContactPage.answerOptions).map(({ key, value }) => ({
            id: key,
            text: value
        })));
    }

    public get receiverSelectOptions(): SelectOptions<keyof typeof ContactPage.receivers> {
        return SelectOptions.ungrouped(entries(ContactPage.receivers).map(({ key, value }) => ({
            id: key,
            text: value
        })));
    }

    private get answerOption(): { email: string } | { phoneNumber: string } | { discordUserId: string } {
        switch (this.inputForm.field('answerOption').value) {
        case 'email':
            return { email: this.inputForm.field('email').value };
        case 'whats-app-sms':
            return { phoneNumber: this.inputForm.field('phoneNumber').value };
        case 'discord':
            return { discordUserId: this.inputForm.field('discordUserId').value };
        }
    }

    public async onSubmit() {
        if (this.inputForm.evaluateAndSetLoading() === 'invalid')
            return;
        if (await this.recaptchaService.verify('contact_page') === 'invalid')
            return this.inputForm.setState('recaptchaFailed');
        const result = await this.firebaseApi.function('contact').call({
            name: this.inputForm.field('name').value,
            answer: this.answerOption,
            receiver: this.inputForm.field('receiver').value,
            message: this.inputForm.field('message').value
        });
        this.inputForm.finish(result);
    }
}
