import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthenticationType } from 'src/app/modules/firebase-api/types/user-authentication';
import { AuthService } from '../../services/auth.service';
import { StyleConfigService } from '../../../../services/style-config.service';
import { RegistrationStatus } from '../../types/registration-status';
import { InternalLink } from 'src/app/types/internal-path';

@Component({
    selector: 'authentication-check',
    templateUrl: './authentication-check.component.html',
    styleUrls: ['./authentication-check.component.sass']
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
        if (isLoggedIn) {
            this.state = 'registered';
        } else {
            this.state = 'unregistered';
            await this.router.navigateByUrl(InternalLink.all['bearbeiten/anmelden'].link);
        }
    }
}

export namespace AuthenticationCheckComponent {
    export type State = RegistrationStatus | 'internalError' | 'loading';
}
