import { Component } from '@angular/core';
import { ContactItem } from 'src/app/modules/general-components/types/contact-item';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { EventGroupId } from 'src/app/types/event';
import { ReportGroupId } from 'src/app/types/report';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';
import { websiteConfig } from 'src/app/config/website-config';

@Component({
    selector: 'pages-f-youth',
    styleUrls: ['./f-youth.page.sass'],
    templateUrl: './f-youth.page.html'
})
export class FYouthPage {
    public eventGroupTitle = EventGroupId.title;

    public readonly eventGroupIds: EventGroupId[] = ['football-youth/f-youth'];

    public readonly reportGroupId: ReportGroupId = 'football-youth/f-youth/game-report';

    public readonly teamId = websiteConfig.bfvTeamIds['f-youth'];

    public readonly contactData: ContactItem[] = websiteConfig.contact['f-youth'];

    public readonly mapOptions: google.maps.MapOptions & { center: google.maps.LatLngLiteral } = {
        ...websiteConfig.mapOptions,
        center: websiteConfig.coordinates['a-field']
    };

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {
        this.titleService.setTitle('F-Jugend');
    }
}
