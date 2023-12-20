import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NavigationBarData, AuthenticationService, FirebaseApiService, LinkService, SharedDataService, InputError, InputField, InputForm, Validator, NavigationBarComponent, AuthenticationCheckComponent, TextSectionComponent, InputFormComponent, TextInputComponent, TextAreaInputComponent } from 'kleinsendelbach-website-library';
import { FirebaseFunctions } from '../../../../types/firebase-functions';
import { InternalPathKey } from '../../../../types/internal-paths';
import { Newsletter } from '../../../../types/newsletter';
import { UserRole } from '../../../../types/user-role';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'publish-newsletter-page',
    standalone: true,
    imports: [CommonModule, NavigationBarComponent, AuthenticationCheckComponent, TextSectionComponent, InputFormComponent, TextAreaInputComponent],
    templateUrl: './publish-newsletter.page.html',
    styleUrl: './publish-newsletter.page.sass'
})
export class PublishNewsletterPage {

    public Month = Newsletter.Month;

    public navigationBarData: NavigationBarData<InternalPathKey> = [
        {
            text: 'Zurück',
            alignment: 'left',
            link: 'editing/newsletter',
            action: null
        },
        {
            text: 'Abmelden',
            alignment: 'right',
            link: 'editing/login',
            action: async () => void this.authenticationService.logout()
        }
    ];

    public inputForm = new InputForm({
        html: new InputField<string>('', [Validator.required('Html ist erforderlich.')])
    }, {
        noNewsletter: new InputError('Es wurde kein Newsletter übergeben. Gehe eine Seite zurück und versuche es erneut.'),
        failed: new InputError('Der Newsletter konnte nicht veröffentlicht werden.'),
        invalidInput: new InputError('Nicht alle Eingaben sind gültig.'),
        loading: new InputError('Der Newsletter wird veröffentlicht.', 'info')
    });

    public newsletter: Newsletter.Overview | null = null;

    constructor(
        private readonly titleService: Title,
        private readonly authenticationService: AuthenticationService<UserRole>,
        private readonly firebaseApi: FirebaseApiService<FirebaseFunctions>,
        private readonly router: Router,
        private readonly linkService: LinkService<InternalPathKey>,
        private readonly sharedData: SharedDataService<{
            publishNewsletter: Newsletter.Overview.Flatten;
        }>,
    ) {
        this.titleService.setTitle('Newsletter');
        const newsletter = this.sharedData.getValue('publishNewsletter');
        if (newsletter !== null)
            this.newsletter = Newsletter.Overview.concrete(newsletter);
    }

    public async publishNewsletter() {
        if (this.inputForm.status === 'loading')
            return;
        if (this.inputForm.evaluate() === 'invalid')
            return;
        if (!this.newsletter) {
            this.inputForm.status = 'noNewsletter';
            return;
        }
        this.inputForm.status = 'loading';
        const result = await this.firebaseApi.function('newsletter-publish').call({
            id: this.newsletter.id,
            html: this.inputForm.field('html').value
        });
        if (result.isFailure())
            this.inputForm.status = 'failed';
        else {
            await this.router.navigateByUrl(this.linkService.link('editing/newsletter').link);
            this.inputForm.status = 'valid';
        }
    }
}
