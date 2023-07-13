import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { websiteConfig } from 'src/app/config/website-config';
import { EventGroupId } from 'src/app/modules/firebase-api/types/event';
import { ReportGroupId } from 'src/app/modules/firebase-api/types/report';
import { ContactItem } from 'src/app/modules/general-components/types/contact-item';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'pages-g-youth',
    templateUrl: './g-youth.page.html',
    styleUrls: ['./g-youth.page.sass']
})
export class GYouthPage {
    public eventGroupTitle = EventGroupId.title;

    public readonly eventGroupIds: EventGroupId[] = [
        'football-youth/g-youth'
    ];

    public readonly reportGroupId: ReportGroupId = 'football-youth/g-youth/game-report';

    public readonly contactData: ContactItem[] = websiteConfig.contact['g-youth'];

    public readonly mapOptions: google.maps.MapOptions & { center: google.maps.LatLngLiteral } = {
        zoom: 16,
        center: websiteConfig.coordinates['a-field'],
        scrollwheel: false,
        maxZoom: 20,
        minZoom: 5
    };

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {
        this.titleService.setTitle('G-Jugend');
    }
}
