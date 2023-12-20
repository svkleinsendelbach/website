import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LinkDirective, TextSectionComponent, AuthenticationService, LinkService, FirebaseApiService, LoginComponent, InputError, InputField, InputForm, Validator, InputFormComponent, TextInputComponent, RecaptchaService } from 'kleinsendelbach-website-library';
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
        recaptchaFailed: 'Ungültige reCAPTCHA. Bitte versuchen Sie es erneut.'
    });

    constructor(
        private readonly titleService: Title,
        private readonly authenticationService: AuthenticationService<UserRole>,
        private readonly linkService: LinkService<InternalPathKey>,
        private readonly firebaseApi: FirebaseApiService<FirebaseFunctions>,
        private readonly recaptchaService: RecaptchaService
    ) {
        this.titleService.setTitle('Anmelden');
        void this.checkInitialAuthentication();
    }

    private async checkInitialAuthentication() {
        const isLoggedIn = this.authenticationService.isLoggedIn();
        if (isLoggedIn) {
            await this.linkService.navigate('editing/main');
            this.state = 'alreadyLoggedIn';
        } else {
            this.state = 'login';
        }
    }

    public async handleRegistrationState(registrationState: 'registered' | 'unregistered') {
        if (registrationState === 'registered') {
            await this.linkService.navigate('editing/main');
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
        if (this.requestAccessInputForm.evaluateAndSetLoading() === 'invalid')
            return;
        if (await this.recaptchaService.verify('login_page_request_access') === 'invalid')
            return this.requestAccessInputForm.setState('recaptchaFailed');
        const result = await this.firebaseApi.function('user-requestAccess').call({
            firstName: this.requestAccessInputForm.field('firstName').value,
            lastName: this.requestAccessInputForm.field('lastName').value
        });
        this.requestAccessInputForm.finish(result);
        if (result.isSuccess()) {
            await this.linkService.navigate('home');
            this.state = 'login';
        }
    }
}
