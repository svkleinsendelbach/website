import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EventGroupId } from 'src/app/modules/firebase-api/types/event';
import { ContactInfoComponent } from 'src/app/template/components/contact-info/contact-info.component';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';

@Component({
    selector: 'app-e-youth',
    templateUrl: './e-youth.component.html',
    styleUrls: ['./e-youth.component.sass']
})
export class EYouthComponent {
    public eventGroupTitle = EventGroupId.title;

    public readonly eventGroupIds: EventGroupId[] = [
        'football-youth/e-youth'
    ];

    public readonly teamId = '01L3BHPM88000000VV0AG811VV4PB99G';

    public readonly contactData: ContactInfoComponent.ContactItem[] = [
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
