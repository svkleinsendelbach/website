import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { InternalLink } from 'src/app/types/internal-path';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'pages-page-not-found',
    templateUrl: './page-not-found.page.html',
    styleUrls: ['./page-not-found.page.sass']
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
