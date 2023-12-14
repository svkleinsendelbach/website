import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthenticationCheckComponent, AuthenticationService, AuthenticationStates, ButtonComponent, FirebaseApiService, NavigationBarComponent, NavigationBarData, TextSectionComponent, UnauthenticatedUsersComponent, User } from 'kleinsendelbach-website-library';
import { UserRole } from '../../../types/user-role';
import { InternalPathKey } from '../../../types/internal-paths';
import { FirebaseFunctions } from '../../../types/firebase-functions';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'editing-main-page',
    standalone: true,
    imports: [CommonModule, AuthenticationCheckComponent, NavigationBarComponent, UnauthenticatedUsersComponent, TextSectionComponent, ButtonComponent],
    templateUrl: './editing-main.page.html',
    styleUrl: './editing-main.page.sass'
})
export class EditingMainPage {

    public navigationBarData: NavigationBarData<InternalPathKey> = [{
        text: 'Abmelden',
        alignment: 'right',
        link: 'editing/login',
        action: async () => void this.authenticationService.logout()
    }];

    public authenticationStates = new AuthenticationStates(['admin', 'occupancyManager', 'websiteManager']);

    public unauthenticatedUsers: User<UserRole>[] | null = null;

    constructor(
        private readonly titleService: Title,
        private readonly authenticationService: AuthenticationService<UserRole>,
        private readonly firebaseApi: FirebaseApiService<FirebaseFunctions>
    ) {
        this.titleService.setTitle('Bearbeiten');
    }

    public async getUnauthenticatedUsers() {
        this.unauthenticatedUsers = (await this.firebaseApi.function('user-getAll').call({
            type: 'unauthenticated'
        })).value;
    }

    public async handleAccessRequest(type: 'accept' | 'decline', user: User<UserRole>) {
        if (this.unauthenticatedUsers)
            this.unauthenticatedUsers = this.unauthenticatedUsers.filter(_user => _user.hashedUserId !== user.hashedUserId);
        await this.firebaseApi.function('user-handleAccessRequest').call({
            handleRequest: type,
            hashedUserId: user.hashedUserId
        });
    }
}
