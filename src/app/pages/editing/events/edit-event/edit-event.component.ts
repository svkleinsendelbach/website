import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { WebsiteEditorAuthService } from 'src/app/services/api/website-editor-auth.service';
import { HeaderIntransparentService } from 'src/app/services/header-intransparent.service';
import { ShareEventEditService } from 'src/app/services/shared-data/share-event-edit.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.sass'],
})
export class EditEventComponent {
  public isStartupLoading: boolean = true;

  constructor(
    private titleService: Title,
    private headerIntransparentService: HeaderIntransparentService,
    private authService: WebsiteEditorAuthService,
    private router: Router,
    private shareEventEdit: ShareEventEditService,
  ) {
    this.titleService.setTitle('Termin Hinzufügen');
    this.headerIntransparentService.makeIntransparent();
    const event = this.shareEventEdit.event;
    if (event !== undefined) {
      this.titleService.setTitle('Termin Bearbeiten');
    }
    this.authService.isLoggedIn.then(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigateByUrl('/bearbeiten/anmelden').then(success => {
          if (!success) throw new Error("Couldn't navigate to url.");
        });
      } else {
        this.isStartupLoading = false;
      }
    });
  }
}
