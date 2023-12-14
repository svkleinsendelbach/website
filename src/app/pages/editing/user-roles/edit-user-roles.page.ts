import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FirebaseApiService, NavigationBarData, User, AuthenticationService, NavigationBarComponent, AuthenticationCheckComponent, TextSectionComponent, OverviewListComponent, OverviewListData } from 'kleinsendelbach-website-library';
import { UserRole } from '../../../types/user-role';
import { FirebaseFunctions } from '../../../types/firebase-functions';
import { InternalPathKey } from '../../../types/internal-paths';

@Component({
    selector: 'edit-user-roles-page',
    standalone: true,
    imports: [CommonModule, NavigationBarComponent, AuthenticationCheckComponent, TextSectionComponent, OverviewListComponent],
    templateUrl: './edit-user-roles.page.html',
    styleUrl: './edit-user-roles.page.sass'
})
export class EditUserRolesPage {

    public navigationBarData: NavigationBarData<InternalPathKey> = [
        {
            text: 'Zurück',
            alignment: 'left',
            link: 'editing/main',
            action: null
        },
        {
            text: 'Abmelden',
            alignment: 'right',
            link: 'editing/login',
            action: async () => void this.authenticationService.logout()
        }
    ];

    public users: User<UserRole>[] | null = null;

    constructor(
        private readonly titleService: Title,
        private readonly authenticationService: AuthenticationService<UserRole>,
        private readonly firebaseApi: FirebaseApiService<FirebaseFunctions>
    ) {
        this.titleService.setTitle('Benutzerollen');
    }

    public async getUsers() {
        this.users = (await this.firebaseApi.function('user-getAll').call({
            type: 'authenticated'
        })).value;
    }

    public usersOverviewListData(users: User<UserRole>[]): OverviewListData<InternalPathKey> {
        return users.map(user => ({
            title: `${user.firstName} ${user.lastName}`,
            subtitle: null,
            buttons: UserRole.all.map(role => ({
                title: UserRole.title[role],
                action: () => void this.editRole(user, role),
                link: null,
                options: user.roles.includes(role) ? 'selected' : null
            }))
        }));
    }

    public async editRole(user: User<UserRole>, role: UserRole) {
        if (user.roles === 'unauthenticated')
            return;
        if (user.roles.includes(role))
            user.roles = user.roles.filter(r => r !== role);
        else
            user.roles.push(role);
        const result = await this.firebaseApi.function('user-editRoles').call({
            hashedUserId: user.hashedUserId,
            roles: user.roles
        });
        if (result.isFailure()) {
            if (user.roles.includes(role))
                user.roles = user.roles.filter(r => r !== role);
            else
                user.roles.push(role);
        }
    }
}
