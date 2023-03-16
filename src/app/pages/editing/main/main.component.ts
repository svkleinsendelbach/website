import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/template/services/api.service';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';
import { UserAuthenticationGetAllUnauthenticatedFunction } from 'src/app/template/services/api-functions-types';
import { AuthService } from 'src/app/template/services/auth.service';
import { Router } from '@angular/router';
import { InternalLink } from 'src/app/classes/InternalPath';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent {
  public logInPageLink = InternalLink.all['bearbeiten/anmelden'];
  public allInternalLinks = InternalLink.all;

  public unauthenticatedUsers: UserAuthenticationGetAllUnauthenticatedFunction.ReturnType | undefined = undefined;

  public constructor(
    public readonly titleService: Title,
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService,
    private readonly apiService: ApiService,
    private readonly authService: AuthService,
    private router: Router
  ) {
    this.titleService.setTitle('Bearbeiten');
    this.getUnauthenticatedUsers();
  }

  private async getUnauthenticatedUsers() {
    this.unauthenticatedUsers = await this.apiService.userAuthenticationGetAllUnauthenticated({
      type: 'websiteEditing'
    });
  }

  public async logOut() {
    await this.authService.logOut();
    await this.router.navigateByUrl(InternalLink.all['bearbeiten/anmelden'].link);
  }

  public async acceptDeclineUser(action: 'accept' | 'decline', hashedUserId: string) {
    this.unauthenticatedUsers = this.unauthenticatedUsers?.filter(user => user.hashedUserId !== hashedUserId);
    await this.apiService.userAuthenticationAcceptDecline({
      type: 'websiteEditing',
      action: action,
      hashedUserId: hashedUserId
    });
  }
}
