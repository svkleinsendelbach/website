import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Router } from '@angular/router';
import { InternalLink } from 'src/app/types/internal-path';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { FunctionType } from 'src/app/modules/firebase-api/types/function-type';
import { UserAuthenticationGetAllUnauthenticatedFunctionType } from 'src/app/modules/firebase-api/function-types';
import { AuthService } from 'src/app/modules/authentication/services/auth.service';

@Component({
    selector: 'pages-editing-main',
    templateUrl: './editing-main.page.html',
    styleUrls: ['./editing-main.page.sass']
})
export class EditingMainPage {
    public logInPageLink = InternalLink.all['bearbeiten/anmelden'];
    public allInternalLinks = InternalLink.all;

    public unauthenticatedUsers: FunctionType.ReturnType<UserAuthenticationGetAllUnauthenticatedFunctionType> | undefined = undefined;

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly firebaseApiService: FirebaseApiService,
        private readonly authService: AuthService,
        private router: Router
    ) {
        this.titleService.setTitle('Bearbeiten');
        this.getUnauthenticatedUsers();
    }

    private async getUnauthenticatedUsers() {
        this.unauthenticatedUsers = await this.firebaseApiService.function('userAuthentication').function('getAllUnauthenticated').call({
            authenticationTypes: ['authenticateUser', 'editEvents', 'editReports', 'notification']
        });
    }

    public async logOut() {
        await this.authService.logOut();
        await this.router.navigateByUrl(InternalLink.all['bearbeiten/anmelden'].link);
    }

    public async acceptDeclineUser(action: 'accept' | 'decline', hashedUserId: string) {
        this.unauthenticatedUsers = this.unauthenticatedUsers?.filter(user => user.hashedUserId !== hashedUserId);
        await this.firebaseApiService.function('userAuthentication').function('acceptDecline').call({
            authenticationTypes: ['authenticateUser', 'editEvents', 'editReports', 'notification'],
            action: action,
            hashedUserId: hashedUserId
        });
    }
}
