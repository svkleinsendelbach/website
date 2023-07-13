import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { websiteConfig } from 'src/app/config/website-config';
import { AnpfiffInfoTeamParameters } from 'src/app/modules/firebase-api/types/anpfiff-info-team-parameters';
import { EventGroupId } from 'src/app/modules/firebase-api/types/event';
import { ReportGroupId } from 'src/app/modules/firebase-api/types/report';
import { ContactItem } from 'src/app/modules/general-components/types/contact-item';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'pages-second-team',
    templateUrl: './second-team.page.html',
    styleUrls: ['./second-team.page.sass']
})
export class SecondTeamPage {
    public eventGroupTitle = EventGroupId.title;

    public readonly eventGroupIds: EventGroupId[] = [
        'football-adults/second-team'
    ];

    public readonly reportGroupId: ReportGroupId = 'football-adults/second-team/game-report';

    public readonly teamId = websiteConfig.bfvTeamIds['second-team'];

    public readonly contactData: ContactItem[] = websiteConfig.contact['second-team'];

    public readonly mapOptions: google.maps.MapOptions & { center: google.maps.LatLngLiteral } = {
        zoom: 16,
        center: websiteConfig.coordinates['b-field'],
        scrollwheel: false,
        maxZoom: 20,
        minZoom: 5
    };

    public readonly squadParametersType: AnpfiffInfoTeamParameters.Type = 'second-team';

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {
        this.titleService.setTitle('Zweite Mannschaft');
    }
}
