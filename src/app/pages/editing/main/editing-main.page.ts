import { AuthenticationStates } from 'src/app/modules/authentication/components/authentication-check/authentication-check.component';
import { Component } from '@angular/core';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';
import { TrackBy } from 'src/app/types/track-by';
import { User } from 'src/app/modules/firebase-api/types/user';

@Component({
    selector: 'pages-editing-main',
    styleUrls: ['./editing-main.page.sass'],
    templateUrl: './editing-main.page.html'
})
export class EditingMainPage {
    public TrackBy = TrackBy;

    public User = User;

    public authenticationStates = new AuthenticationStates(['admin', 'occupancyManager', 'websiteManager']);

    public unauthenticatedUsers: User[] | null = null;

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly firebaseApiService: FirebaseApiService
    ) {
        this.titleService.setTitle('Bearbeiten');
    }

    public async handleAccessRequest(handleRequest: 'accept' | 'decline', hashedUserId: string) {
        if (this.unauthenticatedUsers)
            this.unauthenticatedUsers = this.unauthenticatedUsers.filter(user => user.hashedUserId !== hashedUserId);
        await this.firebaseApiService.function('user-handleAccessRequest').call({
            handleRequest: handleRequest,
            hashedUserId: hashedUserId
        });
    }

    public async getUnauthenticatedUsers() {
        this.unauthenticatedUsers = (await this.firebaseApiService.function('user-getAll').call({
            type: 'unauthenticated'
        })).value;
    }
}
