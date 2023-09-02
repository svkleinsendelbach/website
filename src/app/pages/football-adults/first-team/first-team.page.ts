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
    selector: 'pages-first-team',
    styleUrls: ['./first-team.page.sass'],
    templateUrl: './first-team.page.html'
})
export class FirstTeamPage {
    public eventGroupTitle = EventGroupId.title;

    public readonly eventGroupIds: EventGroupId[] = ['football-adults/first-team'];

    public readonly reportGroupId: ReportGroupId = 'football-adults/first-team/game-report';

    public readonly teamId = websiteConfig.bfvTeamIds['first-team'];

    public readonly contactData: ContactItem[] = websiteConfig.contact['first-team'];

    public readonly mapOptions: google.maps.MapOptions & { center: google.maps.LatLngLiteral } = {
        ...websiteConfig.mapOptions,
        center: websiteConfig.coordinates['b-field']
    };

    public readonly squadParametersType: AnpfiffInfoTeamParameters.Type = 'first-team';

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {
        this.titleService.setTitle('Erste Mannschaft');
    }
}
