import { AuthService } from 'src/app/modules/authentication/services/auth.service';
import { Component } from '@angular/core';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';
import { TrackBy } from 'src/app/types/track-by';
import { User } from 'src/app/modules/firebase-api/types/user';

@Component({
    selector: 'user-roles-page',
    styleUrls: ['./editing-user-roles.page.sass'],
    templateUrl: './editing-user-roles.page.html'
})
export class EditingUserRolesPage {
    public TrackBy = TrackBy;

    public User = User;

    public users: User[] | null = null;

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly firebaseApiService: FirebaseApiService,
        private readonly authService: AuthService
    ) {
        this.titleService.setTitle('Benutzer Rollen');
    }

    public async getUsers() {
        this.users = await this.firebaseApiService
            .function('user')
            .function('getAll')
            .call({
                type: 'authenticated'
            });
    }

    public async editRole(user: User, role: User.Role) {
        if (user.roles === 'unauthenticated')
            return;
        if (user.roles.includes(role))
            user.roles = user.roles.filter(r => r !== role);
        else
            user.roles.push(role);
        await this.firebaseApiService
            .function('user')
            .function('editRoles')
            .call({
                hashedUserId: user.hashedUserId,
                roles: user.roles
            })
            .catch(_ => {
                if (user.roles === 'unauthenticated')
                    return;
                if (user.roles.includes(role))
                    user.roles = user.roles.filter(r => r !== role);
                else
                    user.roles.push(role);
            });
    }
}
