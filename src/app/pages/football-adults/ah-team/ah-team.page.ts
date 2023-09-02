import { Component } from '@angular/core';
import { ContactItem } from 'src/app/modules/general-components/types/contact-item';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { EventGroupId } from 'src/app/modules/firebase-api/types/event';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';
import { websiteConfig } from 'src/app/config/website-config';

@Component({
    selector: 'pages-ah-team',
    styleUrls: ['./ah-team.page.sass'],
    templateUrl: './ah-team.page.html'
})
export class AhTeamPage {
    public eventGroupTitle = EventGroupId.title;

    public readonly eventGroupIds: EventGroupId[] = ['football-adults/ah-team'];

    public readonly contactData: ContactItem[] = websiteConfig.contact['ah-team'];

    public readonly mapOptions: google.maps.MapOptions & { center: google.maps.LatLngLiteral } = {
        ...websiteConfig.mapOptions,
        center: websiteConfig.coordinates['b-field']
    };

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {
        this.titleService.setTitle('Alte Herren');
    }
}
