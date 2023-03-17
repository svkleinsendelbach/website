import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EventGroupId } from 'src/app/modules/firebase-api/types/event';
import { ContactInfoComponent } from 'src/app/template/components/contact-info/contact-info.component';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';

@Component({
    selector: 'app-f-youth',
    templateUrl: './f-youth.component.html',
    styleUrls: ['./f-youth.component.sass']
})
export class FYouthComponent {
    public eventGroupTitle = EventGroupId.title;

    public readonly eventGroupIds: EventGroupId[] = [
        'football-youth/f-youth'
    ];

    public readonly teamId = '01DVQP0J40000000VV0AG80NVSNQSIQV';

    public readonly contactData: ContactInfoComponent.ContactItem[] = [
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
