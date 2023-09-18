import { Component } from '@angular/core';
import { CriticismSuggestion } from 'src/app/modules/firebase-api/types/criticism-sugggestion';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { ErrorLevel } from 'src/app/modules/input-form/types/error-level';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { Guid } from 'src/app/modules/firebase-api/types/guid';
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

@Component({
    selector: 'app-criticism-suggestion',
    styleUrls: ['./criticism-suggestion.page.sass'],
    templateUrl: './criticism-suggestion.page.html'
})
export class CriticismSuggestionPage {
    public inputForm = new InputForm(
        {
            description: new InputField<string>('', [Validator.required('Eine Beschreibung ist erforderlich.')]),
            email: new InputField<string>('', [
                Validator.required('Ihre E-Mail Addresse ist erforderlich.'),
                Validator.email('Das ist keine gültige E-Mail Addresse.')
            ]),
            title: new InputField<string>('', [Validator.required('Ein Titel ist erforderlich.')]),
            type: new InputField<CriticismSuggestion.Type>('suggestion', [
                Validator.required('Der Typ ist erforderlich.'),
                Validator.isOneOf(CriticismSuggestion.Type.all, 'Der Typ ist ungültig')
            ])
        },
        {
            failed: new InputError('Rückmeldung konnte nicht gespeichert werden.'),
            invalidInput: new InputError('Nicht alle Eingaben sind gültig.'),
            loading: new InputError('Rückmeldung wird gespeichert.', ErrorLevel.Info),
            recaptchaFailed: new InputError('reCAPTCHA ungültig.')
        }
    );

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly firebaseApi: FirebaseApiService,
        private readonly recaptchaService: ReCaptchaV3Service
    ) {
        this.titleService.setTitle('Kritik und Vorschläge');
    }

    public get typeSelectOptions(): SelectOptions.Ungrouped<CriticismSuggestion.Type> {
        return SelectOptions.ungrouped<CriticismSuggestion.Type>(
            CriticismSuggestion.Type.all.map(type => ({
                id: type,
                text: CriticismSuggestion.Type.description(type)
            }))
        );
    }

    public async onSubmit() {
        if (this.inputForm.status === 'loading')
            return;
        this.inputForm.status = 'valid';
        const validation = this.inputForm.evaluate();
        if (validation === ValidationResult.Invalid)
            return;
        this.inputForm.status = 'loading';
        const token = await lastValueFrom(this.recaptchaService.execute('criticismSuggestionForm'));
        const verifyResponse = await this.firebaseApi
            .function('verifyRecaptcha')
            .call({
                token: token
            });
        if (verifyResponse.action !== 'criticismSuggestionForm' || !verifyResponse.success) {
            this.inputForm.status = 'recaptchaFailed';
            return;
        }
        await this.firebaseApi
            .function('criticismSuggestion')
            .function('edit')
            .call({
                criticismSuggestion: {
                    contactEmail: this.inputForm.field('email').value,
                    description: this.inputForm.field('description').value,
                    title: this.inputForm.field('title').value,
                    type: this.inputForm.field('type').value,
                    workedOff: false
                },
                criticismSuggestionId: Guid.newGuid().guidString,
                editType: 'add'
            })
            .catch(_ => {
                this.inputForm.status = 'failed';
            })
            .then(_ => {
                this.inputForm.status = 'valid';
                this.inputForm.reset();
            });
    }
}
