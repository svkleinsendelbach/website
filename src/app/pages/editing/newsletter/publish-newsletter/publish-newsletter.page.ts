import { Newsletter } from 'src/app/types/newletter';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { UtcDate } from 'src/app/types/utc-date';
import { ErrorLevel } from 'src/app/modules/input-form/types/error-level';
import { InputError } from 'src/app/modules/input-form/types/input-error';
import { InputField } from 'src/app/modules/input-form/types/input-field';
import { InputForm } from 'src/app/modules/input-form/types/input-form';
import { Validator } from 'src/app/modules/input-form/types/validator';
import { ValidationResult } from 'src/app/modules/input-form/types/validation-result';
import { internalLinks } from 'src/app/types/internal-link-path';
import { Router } from '@angular/router';

@Component({
    selector: 'app-publish-newsletter',
    templateUrl: './publish-newsletter.page.html',
    styleUrls: ['./publish-newsletter.page.sass']
})
export class PublishNewsletterPage {
    public Month = Newsletter.Month;

    public newsletter: { id: string; date: UtcDate; title: string; description: string; month: Newsletter.Month; year: number } | null;

    public inputForm = new InputForm({
        html: new InputField<string>('', [Validator.required('Html ist erforderlich.')])
    }, {
        noNewsletter: new InputError('Es wurde kein Newsletter übergeben. Gehe eine Seite zurück und versuche es erneut.'),
        failed: new InputError('Der Newsletter konnte nicht veröffentlicht werden.'),
        invalidInput: new InputError('Nicht alle Eingaben sind gültig.'),
        loading: new InputError('Der Newsletter wird veröffentlicht.', ErrorLevel.Info)
    });

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly router: Router,
        private readonly firebaseApiService: FirebaseApiService,
        private readonly sharedData: SharedDataService<{
            publishNewsletter: { id: string; date: UtcDate; title: string; description: string; month: Newsletter.Month; year: number };
        }>
    ) {
        this.titleService.setTitle('Newsletter veröffentlichen');
        this.newsletter = this.sharedData.getValue('publishNewsletter');
    }

    public async publishNewsletter() {
        if (this.inputForm.status === 'loading')
            return;
        if (this.inputForm.evaluate() === ValidationResult.Invalid)
            return;
        if (!this.newsletter) {
            this.inputForm.status = 'noNewsletter';
            return;
        }
        this.inputForm.status = 'loading';
        const result = await this.firebaseApiService.function('newsletter-publish').call({
            id: this.newsletter.id,
            html: this.inputForm.field('html').value
        });
        if (result.isFailure())
            this.inputForm.status = 'failed';
        else {
            await this.router.navigateByUrl(internalLinks['bearbeiten/newsletter'].link);
            this.inputForm.status = 'valid';
        }
    }
}
