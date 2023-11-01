import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { EventGroupId } from 'src/app/types/event';
import { internalLinks } from 'src/app/types/internal-link-path';
import { Newsletter } from 'src/app/types/newletter';

@Component({
    selector: 'app-editing-newsletter',
    templateUrl: './editing-newsletter.page.html',
    styleUrls: ['./editing-newsletter.page.sass']
})
export class EditingNewsletterPage {
    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly firebaseApiService: FirebaseApiService,
        private readonly sharedData: SharedDataService<{
            editNewsletter: Newsletter;
        }>,
        private readonly router: Router
    ) {
        this.titleService.setTitle('Newsletter bearbeiten');
    }

    public async getNewsletter() {}

    public async addNewNewsletter() {
        this.sharedData.removeValue('editNewsletter');
        await this.router.navigateByUrl(internalLinks['bearbeiten/newsletter/bearbeiten'].link);
    }
}
