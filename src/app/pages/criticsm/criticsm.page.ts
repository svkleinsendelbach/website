import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { InlineSelectComponent, InputError, InputField, InputForm, InputFormComponent, SelectOptions, TextAreaComponent, TextComponent, TextSectionComponent, Validator } from 'kleinsendelbach-website-library';
import { Criticism } from '../../types/criticism';

@Component({
    selector: 'criticsm-page',
    standalone: true,
    imports: [CommonModule, TextSectionComponent, InputFormComponent, InlineSelectComponent, TextComponent, TextAreaComponent],
    templateUrl: './criticsm.page.html',
    styleUrl: './criticsm.page.sass'
})
export class CriticsmPage {

    public inputForm = new InputForm({
        type: new InputField<Criticism.Type>('suggestion', [
            Validator.required('Der Typ ist erforderlich.'),
            Validator.isOneOf(Criticism.Type.all, 'Der Typ ist ungültig')
        ]),
        title: new InputField<string>('', [Validator.required('Ein Titel ist erforderlich.')]),
        description: new InputField<string>('', [Validator.required('Eine Beschreibung ist erforderlich.')])
    },
    {
        invalidInput: new InputError('Nicht alle Eingaben sind gültig.'),
        recaptchaFailed: new InputError('reCAPTCHA ungültig.'),
        failed: new InputError('Rückmeldung konnte nicht gespeichert werden.'),
        loading: new InputError('Rückmeldung wird gespeichert.', 'info'),
        success: new InputError('Rückmeldung wurde versandt', 'success')
    });

    constructor(
        private readonly titleService: Title
    ) {
        this.titleService.setTitle('Kritik und Vorschläge')
    }

    public get typeSelectOptions(): SelectOptions.Ungrouped<Criticism.Type> {
        return SelectOptions.ungrouped(Criticism.Type.all.map(type => ({
            id: type,
            text: Criticism.Type.description(type)
        })));
    }

    public async onSubmit() {
        // TODO
    }
}
