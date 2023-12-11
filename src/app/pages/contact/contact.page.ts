import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { InlineSelectComponent, InputError, InputField, InputForm, InputFormComponent, LinkDirective, SelectComponent, SelectOptions, TextAreaComponent, TextComponent, TextSectionComponent, Validator, entries, keys } from 'kleinsendelbach-website-library';

@Component({
    selector: 'contact-page',
    standalone: true,
    imports: [CommonModule, TextSectionComponent, InputFormComponent, InlineSelectComponent, SelectComponent, TextComponent, TextAreaComponent, LinkDirective],
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
    }, 'invalidInput' | 'loading' | 'recaptchaFailed' | 'failed' | 'success'> = new InputForm({
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
        invalidInput: new InputError('Nicht alle Eingaben sind gültig.'),
        recaptchaFailed: new InputError('reCAPTCHA ungültig.'),
        failed: new InputError('Die Nachricht konnte nicht versandt werden.'),
        loading: new InputError('Die Nachricht wird versandt.', 'info'),
        success: new InputError('Die Nachricht wurde versandt', 'success')
    });

    constructor(
        private readonly titleService: Title
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

    public async onSubmit() {
        // TODO
    }
}
