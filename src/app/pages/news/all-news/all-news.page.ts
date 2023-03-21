import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { InternalLink } from 'src/app/types/internal-path';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'pages-all-news',
    templateUrl: './all-news.page.html',
    styleUrls: ['./all-news.page.sass']
})
export class AllNewsPage {
    public allInternalLinks = InternalLink.all;

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {
        this.titleService.setTitle('Aktuelle Nachrichten');
    }
}
