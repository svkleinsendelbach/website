import { AnpfiffInfoTeamParameters } from 'src/app/modules/firebase-api/types/anpfiff-info-team-parameters';
import { Component } from '@angular/core';
import { ContactItem } from 'src/app/modules/general-components/types/contact-item';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { EventGroupId } from 'src/app/modules/firebase-api/types/event';
import { ReportGroupId } from 'src/app/modules/firebase-api/types/report';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';
import { websiteConfig } from 'src/app/config/website-config';

@Component({
    selector: 'pages-second-team',
    styleUrls: ['./second-team.page.sass'],
    templateUrl: './second-team.page.html'
})
export class SecondTeamPage {
    public eventGroupTitle = EventGroupId.title;

    public readonly eventGroupIds: EventGroupId[] = ['football-adults/second-team'];

    public readonly reportGroupId: ReportGroupId = 'football-adults/second-team/game-report';

    public readonly teamId = websiteConfig.bfvTeamIds['second-team'];

    public readonly contactData: ContactItem[] = websiteConfig.contact['second-team'];

    public readonly mapOptions: google.maps.MapOptions & { center: google.maps.LatLngLiteral } = {
        ...websiteConfig.mapOptions,
        center: websiteConfig.coordinates['b-field']
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
