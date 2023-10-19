import { Component } from '@angular/core';
import { ContactItem } from 'src/app/modules/general-components/types/contact-item';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { EventGroupId } from 'src/app/types/event';
import { ReportGroupId } from 'src/app/types/report';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';
import { websiteConfig } from 'src/app/config/website-config';

@Component({
    selector: 'pages-g-youth',
    styleUrls: ['./g-youth.page.sass'],
    templateUrl: './g-youth.page.html'
})
export class GYouthPage {
    public eventGroupTitle = EventGroupId.title;

    public readonly eventGroupIds: EventGroupId[] = ['football-youth/g-youth'];

    public readonly reportGroupId: ReportGroupId = 'football-youth/g-youth/game-report';

    public readonly contactData: ContactItem[] = websiteConfig.contact['g-youth'];

    public readonly mapOptions: google.maps.MapOptions & { center: google.maps.LatLngLiteral } = {
        ...websiteConfig.mapOptions,
        center: websiteConfig.coordinates['a-field']
    };

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {
        this.titleService.setTitle('G-Jugend');
    }
}
