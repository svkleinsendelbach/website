import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as shajs from 'sha.js';
import { HeaderIntransparentService } from 'src/app/services/header-intransparent.service';
import { WebsiteEditorAuthService } from 'src/app/services/website-editor-auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
})
export class MainComponent {
  constructor(
    private titleService: Title,
    private headerIntransparentService: HeaderIntransparentService,
    private auth: AngularFireAuth,
    private authService: WebsiteEditorAuthService,
    private router: Router
  ) {
    this.titleService.setTitle('Bearbeiten');
    this.headerIntransparentService.makeIntransparent();
    this.auth.currentUser.then(user => {
      console.log(user?.uid);
      console.log(shajs('sha256').update(user?.uid ?? '').digest('hex'));
    });
    this.authService.isLoggedIn.then(loggedIn => {
      console.log(loggedIn ? 'Logged in' : 'Logged out');
    })
  }

  logOut() {
    this.authService.logOut().then(() => {
      this.router.navigateByUrl('/bearbeiten/anmelden');
    });
  }
}
