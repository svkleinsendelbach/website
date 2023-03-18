import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EventGroupId } from 'src/app/modules/firebase-api/types/event';
import { ContactItem } from 'src/app/modules/general-components/types/contact-item';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'pages-c-youth',
    templateUrl: './c-youth.page.html',
    styleUrls: ['./c-youth.page.sass']
})
export class CYouthPage {
    public eventGroupTitle = EventGroupId.title;

    public readonly eventGroupIds: EventGroupId[] = [
        'football-youth/c-youth'
    ];

    public readonly teamId1 = '02GKSI5N8O000037VS5489B4VSM5S7RJ';

    public readonly teamId2 = '02GKSOGF8K000006VS5489B4VSM5S7RJ';

    public readonly contactData: ContactItem[] = [
        {
            function: 'Trainer',
            name: 'Andy Lorenz',
            mobile: {
                number: '01772485421',
                text: '0177 / 2485421'
            }
        },
        {
            function: 'Trainer',
            name: 'Steven Kellner',
            mobile: {
                number: '017653935160',
                text: '0176 / 53935160'
            }
        },
        {
            function: 'Trainer',
            name: 'Florian Veitengruber',
            mobile: {
                number: '017670820050',
                text: '0176 / 70820050'
            }
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

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {
        this.titleService.setTitle('C-Jugend');
    }
}
