import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EventGroupId } from 'src/app/modules/firebase-api/types/event';
import { ReportGroupId } from 'src/app/modules/firebase-api/types/report';
import { ContactItem } from 'src/app/modules/general-components/types/contact-item';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'pages-f-youth',
    templateUrl: './f-youth.page.html',
    styleUrls: ['./f-youth.page.sass']
})
export class FYouthPage {
    public eventGroupTitle = EventGroupId.title;

    public readonly eventGroupIds: EventGroupId[] = [
        'football-youth/f-youth'
    ];

    public readonly reportGroupId: ReportGroupId = 'football-youth/f-youth/game-report';

    public readonly teamId = '01DVQP0J40000000VV0AG80NVSNQSIQV';

    public readonly contactData: ContactItem[] = [
        {
            function: 'Trainer',
            name: 'Bernd Aumüller',
            mobile: {
                number: '01729915405',
                text: '0172 / 9915405'
            }
        },
        {
            function: 'Trainer',
            name: 'Stefan Seubert',
            mobile: {
                number: '01712447114',
                text: '0171 / 2447114'
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
        this.titleService.setTitle('F-Jugend');
    }
}
