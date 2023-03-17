import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';
import { Router } from '@angular/router';
import { InternalLink } from 'src/app/types/InternalPath';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { FunctionType } from 'src/app/modules/firebase-api/types/function-type';
import { UserAuthenticationGetAllUnauthenticatedFunctionType } from 'src/app/modules/firebase-api/function-types';
import { AuthService } from 'src/app/modules/authentication/services/auth.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.sass']
})
export class MainComponent {
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
            authenticationTypes: ['authenticateUser', 'editEvents', 'editNews', 'editReports', 'notification']
        });
    }

    public async logOut() {
        await this.authService.logOut();
        await this.router.navigateByUrl(InternalLink.all['bearbeiten/anmelden'].link);
    }

    public async acceptDeclineUser(action: 'accept' | 'decline', hashedUserId: string) {
        this.unauthenticatedUsers = this.unauthenticatedUsers?.filter(user => user.hashedUserId !== hashedUserId);
        await this.firebaseApiService.function('userAuthentication').function('acceptDecline').call({
            authenticationTypes: ['authenticateUser', 'editEvents', 'editNews', 'editReports', 'notification'],
            action: action,
            hashedUserId: hashedUserId
        });
    }
}
