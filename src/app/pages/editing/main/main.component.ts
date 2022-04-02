import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HeaderIntransparentService } from 'src/app/services/header-intransparent.service';
import { WebsiteEditorAuthService } from 'src/app/services/api/website-editor-auth.service';
import { WebsiteEditingService } from '../../../services/api/website-editing.service';
import { DeviceTypeService } from '../../../services/device-type.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
})
export class MainComponent {
  public isStartupLoading: boolean = true;

  public waitingUsers: WebsiteEditingService.WebsiteEditor[] | undefined = undefined;

  constructor(
    private titleService: Title,
    private headerIntransparentService: HeaderIntransparentService,
    private authService: WebsiteEditorAuthService,
    private router: Router,
    private websiteEditingService: WebsiteEditingService,
    public deviceType: DeviceTypeService,
  ) {
    this.titleService.setTitle('Bearbeiten');
    this.headerIntransparentService.makeIntransparent();
    this.authService.isLoggedIn.then(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigateByUrl('/bearbeiten/anmelden').then(success => {
          if (!success) throw new Error("Couldn't navigate to url.");
        });
      } else {
          this.isStartupLoading = false;
      }
    });
    this.websiteEditingService.getUsersWaitingForEditing().then(users => {
      if (users.length !== 0)
        this.waitingUsers = users;
    });
  }

  public logOut() {
    this.authService.logOut().then(() => {
      this.router.navigateByUrl('/bearbeiten/anmelden');
    });
  }

  public acceptDeclineUserWaiting(acceptDecline: 'accept' | 'decline', userId: string) {
    console.log(acceptDecline, userId);
    this.websiteEditingService.acceptDeclineUserWaitingForEditing(acceptDecline, userId);
    this.waitingUsers = this.waitingUsers?.filter(user => user.id !== userId);
    if (this.waitingUsers?.length === 0)
      this.waitingUsers = undefined;
  }
}
