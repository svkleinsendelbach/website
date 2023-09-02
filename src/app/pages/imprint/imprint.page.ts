import { Component } from '@angular/core';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { InternalLink } from 'src/app/types/internal-path';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'pages-imprint',
    styleUrls: ['./imprint.page.sass'],
    templateUrl: './imprint.page.html'
})
export class ImprintPage {
    public faPhone = faPhone;

    public faEnvelope = faEnvelope;

    public imprintLink = InternalLink.all.datenschutz;

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {
        this.titleService.setTitle('Impressum und Datenschutz');
    }
}
