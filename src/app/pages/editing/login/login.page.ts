import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/authentication/services/auth.service';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { InternalLink } from 'src/app/types/internal-path';
import { Router } from '@angular/router';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'pages-login',
    styleUrls: ['./login.page.sass'],
    templateUrl: './login.page.html'
})
export class LoginPage implements OnInit {
    public editPageLink = InternalLink.all.bearbeiten;

    public state: 'addToWaitingUserPage' | 'alreadyLoggedIn' | 'loading' | 'loginPage' = 'loading';

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly authService: AuthService,
        private readonly router: Router
    ) {
        this.titleService.setTitle('Anmelden');
    }

    public ngOnInit() {
        void this.checkAuthentication();
    }

    public handleUserUnregistered() {
        this.state = 'addToWaitingUserPage';
    }

    public handleAddToWaitingUserCanceled() {
        this.state = 'loginPage';
    }

    private async checkAuthentication() {
        this.state = 'loading';
        const isLoggedIn = await this.authService.isLoggedIn(['editEvents', 'editReports', 'authenticateUser']);
        if (isLoggedIn) {
            this.state = 'alreadyLoggedIn';
            await this.router.navigateByUrl(this.editPageLink.link);
        } else
            this.state = 'loginPage';
    }
}
