import { Component } from '@angular/core';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'pages-privacy',
    styleUrls: ['./privacy.page.sass'],
    templateUrl: './privacy.page.html'
})
export class PrivacyPage {
    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {
        this.titleService.setTitle('Datenschutzerklärung');
    }
}
