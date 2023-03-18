import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EventGroupId } from 'src/app/modules/firebase-api/types/event';
import { ContactItem } from 'src/app/modules/general-components/types/contact-item';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'app-g-youth',
    templateUrl: './g-youth.component.html',
    styleUrls: ['./g-youth.component.sass']
})
export class GYouthComponent {
    public eventGroupTitle = EventGroupId.title;

    public readonly eventGroupIds: EventGroupId[] = [
        'football-youth/g-youth'
    ];

    public readonly contactData: ContactItem[] = [
        {
            function: 'Trainer',
            name: 'Markus Schmitt',
            mobile: {
                number: '017632844763',
                text: '0176 / 32844763'
            }
        },
        {
            function: 'Trainer',
            name: 'Dominic Schmitt',
            mobile: {
                number: '01708087516',
                text: '0170 / 8087516'
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
        this.titleService.setTitle('G-Jugend');
    }
}
