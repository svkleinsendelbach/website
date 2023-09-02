import { Component } from '@angular/core';
import { ContactItem } from 'src/app/modules/general-components/types/contact-item';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { EventGroupId } from 'src/app/modules/firebase-api/types/event';
import { ReportGroupId } from 'src/app/modules/firebase-api/types/report';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';
import { websiteConfig } from 'src/app/config/website-config';

@Component({
    selector: 'pages-c-youth',
    styleUrls: ['./c-youth.page.sass'],
    templateUrl: './c-youth.page.html'
})
export class CYouthPage {
    public eventGroupTitle = EventGroupId.title;

    public readonly eventGroupIds: EventGroupId[] = ['football-youth/c-youth'];

    public readonly reportGroupId: ReportGroupId = 'football-youth/c-youth/game-report';

    public readonly teamId1 = websiteConfig.bfvTeamIds['c-youth-1'];

    public readonly teamId2 = websiteConfig.bfvTeamIds['c-youth-2'];

    public readonly contactData: ContactItem[] = websiteConfig.contact['c-youth'];

    public readonly mapOptions: google.maps.MapOptions & { center: google.maps.LatLngLiteral } = {
        ...websiteConfig.mapOptions,
        center: websiteConfig.coordinates['b-field']
    };

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {
        this.titleService.setTitle('C-Jugend');
    }
}
