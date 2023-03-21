import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
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

    public readonly teamId = '02EO9BK2JS000000VS5489B2VSAS84KM';

    public readonly contactData: ContactItem[] = [
        {
            function: 'Abteilungsleiter Fußball',
            name: 'Josef Hoier',
            mobile: {
                number: '017657857884',
                text: '0176 / 57857884'
            }
        },
        {
            function: 'Trainer',
            name: 'Tim Kellermann',
            mobile: {
                number: '015112441784',
                text: '0151 / 12441784'
            },
            email: 'kellermann.tim@gmx.de'
        }
    ];

    public readonly mapOptions: google.maps.MapOptions = {
        zoom: 14,
        center: {
            lat: 49.589936,
            lng: 11.162849
        },
        scrollwheel: false,
        maxZoom: 18,
        minZoom: 5
    };

    public readonly mapMarkers: google.maps.LatLngLiteral[] = [
        {
            lat: 49.589936,
            lng: 11.162849
        }
    ];

    public readonly squadParametersType: AnpfiffInfoTeamParameters.Type = 'second-team';

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {
        this.titleService.setTitle('Zweite Mannschaft');
    }
}
