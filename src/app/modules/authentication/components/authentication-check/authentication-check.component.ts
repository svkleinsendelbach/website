import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthenticationType } from 'src/app/modules/firebase-api/types/user-authentication';
import { Link } from 'src/app/types/link';
import { AuthService } from '../../services/auth.service';
import { StyleConfigService } from '../../../../template/services/style-config.service';
import { RegistrationStatus } from '../../types/registration-status';

@Component({
    selector: 'app-authentication-check',
    templateUrl: './authentication-check.component.html',
    styleUrls: ['./authentication-check.component.sass']
})
export class AuthenticationCheckComponent implements OnInit {
    @Input() public authenticationTypes!: UserAuthenticationType[];

    @Input() public logInPageLink!: Link;

    public state: AuthenticationCheckComponent.State = 'loading';

    public constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
        public styleConfig: StyleConfigService
    ) {}

    public ngOnInit() {
        this.checkAuthentication();
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
            await this.router.navigateByUrl(this.logInPageLink.link);
        }
    }
}

export namespace AuthenticationCheckComponent {
    export type State = 'loading' | 'internalError' | RegistrationStatus;
}
