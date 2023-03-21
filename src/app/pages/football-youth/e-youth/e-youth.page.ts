import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EventGroupId } from 'src/app/modules/firebase-api/types/event';
import { ReportGroupId } from 'src/app/modules/firebase-api/types/report';
import { ContactItem } from 'src/app/modules/general-components/types/contact-item';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'pages-e-youth',
    templateUrl: './e-youth.page.html',
    styleUrls: ['./e-youth.page.sass']
})
export class EYouthPage {
    public eventGroupTitle = EventGroupId.title;

    public readonly eventGroupIds: EventGroupId[] = [
        'football-youth/e-youth'
    ];

    public readonly reportGroupId: ReportGroupId = 'football-youth/e-youth/game-report';

    public readonly teamId = '01L3BHPM88000000VV0AG811VV4PB99G';

    public readonly contactData: ContactItem[] = [
        {
            function: 'Trainer',
            name: 'Matthias Iberl',
            mobile: {
                number: '01606120508',
                text: '0160 / 6120508'
            }
        },
        {
            function: 'Trainer',
            name: 'Steven Kellner',
            mobile: {
                number: '01702911886',
                text: '0170 / 2911886'
            }
        }
    ];

    public readonly mapOptions: google.maps.MapOptions = {
        zoom: 14,
        center: {
            lat: 49.59271272107774,
            lng: 11.158062149547574
        },
        scrollwheel: false,
        maxZoom: 18,
        minZoom: 5
    };

    public readonly mapMarkers: google.maps.LatLngLiteral[] = [
        {
            lat: 49.59271272107774,
            lng: 11.158062149547574
        }
    ];

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {
        this.titleService.setTitle('E-Jugend');
    }
}
