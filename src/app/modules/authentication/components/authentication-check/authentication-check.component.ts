import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { InternalLink } from 'src/app/types/internal-path';
import { RegistrationStatus } from '../../types/registration-status';
import { Router } from '@angular/router';
import { StyleConfigService } from '../../../../services/style-config.service';
import { UserAuthenticationType } from 'src/app/modules/firebase-api/types/user-authentication';

@Component({
    selector: 'authentication-check',
    styleUrls: ['./authentication-check.component.sass'],
    templateUrl: './authentication-check.component.html'
})
export class AuthenticationCheckComponent implements OnInit {
    @Input() public authenticationTypes!: UserAuthenticationType[];

    public logInPageLink = InternalLink.all['bearbeiten/anmelden'];

    public state: AuthenticationCheckComponent.State = 'loading';

    public constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
        public readonly styleConfig: StyleConfigService
    ) {}

    public ngOnInit() {
        void this.checkAuthentication();
    }

    private async checkAuthentication() {
        this.state = 'loading';
        const isLoggedIn = await this.authService
            .isLoggedIn(this.authenticationTypes)
            .catch(reason => {
                this.state = 'internalError';
                throw reason;
            });
        if (isLoggedIn)
            this.state = 'registered';
        else {
            this.state = 'unregistered';
            await this.router.navigateByUrl(InternalLink.all['bearbeiten/anmelden'].link);
        }
    }
}

export namespace AuthenticationCheckComponent {
    export type State = RegistrationStatus | 'internalError' | 'loading';
}
