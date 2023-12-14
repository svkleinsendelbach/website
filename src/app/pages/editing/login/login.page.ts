import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LinkDirective, TextSectionComponent, AuthenticationService, InternalLinkService, FirebaseApiService, LoginComponent, InputError, InputField, InputForm, Validator, InputFormComponent, TextInputComponent } from 'kleinsendelbach-website-library';
import { Router } from '@angular/router';
import { InternalPathKey } from '../../../types/internal-paths';
import { FirebaseFunctions } from '../../../types/firebase-functions';
import { UserRole } from '../../../types/user-role';

@Component({
    selector: 'editing-login-page',
    standalone: true,
    imports: [CommonModule, TextSectionComponent, LinkDirective, LoginComponent, InputFormComponent, TextInputComponent],
    templateUrl: './login.page.html',
    styleUrl: './login.page.sass'
})
export class LoginPage {

    public state: 'loading' | 'alreadyLoggedIn' | 'login' | 'requestAccess' = 'loading';

    public requestAccessInputForm = new InputForm({
        firstName: new InputField<string>('', [Validator.required('Der Vorname ist erforderlich.')]),
        lastName: new InputField<string>('', [Validator.required('Der Nachname ist erforderlich.')])
    },
    {
        invalidInput: new InputError('Nicht alle Eingaben sind gültig.'),
        loading: new InputError('Antrag wird übermittelt.', 'info'),
        failed: new InputError('Antrag konnte nicht übermittelt werden.')
    });

    constructor(
        private readonly titleService: Title,
        private readonly authenticationService: AuthenticationService<UserRole>,
        private readonly router: Router,
        private readonly linkService: InternalLinkService<InternalPathKey>,
        private readonly firebaseApi: FirebaseApiService<FirebaseFunctions>
    ) {
        this.titleService.setTitle('Anmelden');
        void this.checkInitialAuthentication();
    }

    private async checkInitialAuthentication() {
        const isLoggedIn = await this.authenticationService.isLoggedIn();
        if (isLoggedIn) {
            await this.router.navigateByUrl(this.linkService.link('editing/main').link);
            this.state = 'alreadyLoggedIn';
        } else {
            this.state = 'login';
        }
    }

    public async handleRegistrationState(registrationState: 'registered' | 'unregistered') {
        if (registrationState === 'registered') {
            await this.router.navigateByUrl(this.linkService.link('editing/main').link);
            this.state = 'alreadyLoggedIn';
        } else {
            this.state = 'requestAccess';
        }
    }

    public async cancelRequestAccess() {
        this.requestAccessInputForm.reset();
        await this.authenticationService.logout();
        this.state = 'login';
    }

    public async requestAccess() {
        if (this.requestAccessInputForm.evaluate() === 'invalid')
            return;
        try {
            await this.firebaseApi.function('user-requestAccess').call({
                firstName: this.requestAccessInputForm.field('firstName').value,
                lastName: this.requestAccessInputForm.field('lastName').value
            });
            this.requestAccessInputForm.reset();
            await this.router.navigateByUrl(this.linkService.link('home').link);
            this.state = 'login';
        } catch {
            this.requestAccessInputForm.status = 'failed';
        }
    }
}
