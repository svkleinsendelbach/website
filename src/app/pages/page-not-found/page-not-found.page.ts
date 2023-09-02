import { Component } from '@angular/core';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { InternalLink } from 'src/app/types/internal-path';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'pages-page-not-found',
    styleUrls: ['./page-not-found.page.sass'],
    templateUrl: './page-not-found.page.html'
})
export class PageNotFoundPage {
    public homeLink = InternalLink.all.home;

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {
        this.titleService.setTitle('Seite nicht gefunden');
    }
}
