import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { allInternalLinks } from 'src/app/app.component';
import { AuthService } from 'src/app/template/services/auth.service';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public editPageLink = allInternalLinks.bearbeiten;

  public state: 'loading' | 'alreadyLoggedIn' | 'loginPage' | 'addToWaitingUserPage' = 'loading';

  public constructor(
    public readonly titleService: Title,
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    this.titleService.setTitle('Anmelden')
  }

  public ngOnInit() {
    this.state = 'addToWaitingUserPage';
    // this.checkAuthentication();
  }

  private async checkAuthentication() {
    this.state = 'loading';
    const isLoggedIn = await this.authService.isLoggedIn('websiteEditing');
    if (isLoggedIn) {
      this.state = 'alreadyLoggedIn';
      await this.router.navigateByUrl(this.editPageLink.link);
    } else {
      this.state = 'loginPage';
    }
  }

  public handleUserUnregistered() {
    this.state = 'addToWaitingUserPage';
  }

  public handleAddToWaitingUserCanceled() {
    this.state = 'loginPage';
  }
}
