import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HeaderIntransparentService } from 'src/app/services/header-intransparent.service';
import { Router } from '@angular/router';
import { WebsiteEditorAuthService } from '../../../services/website-editor-auth.service';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { DeviceTypeService } from '../../../services/device-type.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  public pageState: 'startupLoading' | 'loginFields' | 'userUnregistered' = 'startupLoading';

  constructor(
    private titleService: Title,
    private headerIntransparentService: HeaderIntransparentService,
    private authService: WebsiteEditorAuthService,
    private router: Router,
    public darkMode: DarkModeService,
    public deviceType: DeviceTypeService,
  ) {
    this.titleService.setTitle('Anmelden');
    this.headerIntransparentService.makeIntransparent();
    this.authService.isLoggedIn.then(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigateByUrl('/bearbeiten');
      }
      this.pageState = 'loginFields';
    });
  }

  public handleUserUnregistered() {
    this.pageState = 'userUnregistered';
  }

  public handleUnregisteredCanceled() {
    this.pageState = 'loginFields';
  }
}
