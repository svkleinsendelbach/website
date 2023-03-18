import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { InternalLink } from 'src/app/types/InternalPath';

@Component({
    selector: 'pages-imprint',
    templateUrl: './imprint.page.html',
    styleUrls: ['./imprint.page.sass']
})
export class ImprintPage {
    public faPhone = faPhone;
    public faEnvelope = faEnvelope;
    public imprintLink = InternalLink.all['datenschutz'];

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {
        this.titleService.setTitle('Impressum und Datenschutz');
    }
}