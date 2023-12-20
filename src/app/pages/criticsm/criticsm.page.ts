import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FirebaseApiService, Guid, InlineSelectInputComponent, InputError, InputField, InputForm, InputFormComponent, SelectOptions, TextAreaInputComponent, TextInputComponent, TextSectionComponent, Validator, RecaptchaService } from 'kleinsendelbach-website-library';
import { Criticism } from '../../types/criticism';
import { FirebaseFunctions } from '../../types/firebase-functions';

@Component({
    selector: 'criticsm-page',
    standalone: true,
    imports: [CommonModule, TextSectionComponent, InputFormComponent, InlineSelectInputComponent, TextInputComponent, TextAreaInputComponent],
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
        recaptchaFailed: 'Ungültige reCAPTCHA. Bitte versuchen Sie es erneut.'
    });

    constructor(
        private readonly titleService: Title,
        private readonly firebaseApi: FirebaseApiService<FirebaseFunctions>,
        private readonly recaptchaService: RecaptchaService
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
        if (this.inputForm.evaluateAndSetLoading() === 'invalid')
            return;
        if (await this.recaptchaService.verify('criticism_page') === 'invalid')
            return this.inputForm.setState('recaptchaFailed');
        const result = await this.firebaseApi.function('criticism-edit').call({
            editType: 'add',
            criticismId: Guid.newGuid().guidString,
            criticism: {
                type: this.inputForm.field('type').value,
                title: this.inputForm.field('title').value,
                description: this.inputForm.field('description').value,
                workedOff: false
            }
        });
        this.inputForm.finish(result);
    }
}
