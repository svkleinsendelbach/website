import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EventGroupId } from 'src/app/modules/firebase-api/types/event';
import { ContactInfoComponent } from 'src/app/template/components/contact-info/contact-info.component';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';

@Component({
    selector: 'app-ah-team',
    templateUrl: './ah-team.component.html',
    styleUrls: ['./ah-team.component.sass']
})
export class AhTeamComponent {
    public eventGroupTitle = EventGroupId.title;

    public readonly eventGroupIds: EventGroupId[] = [
        'football-adults/ah-team'
    ];

    public readonly contactData: ContactInfoComponent.ContactItem[] = [
        {
            function: 'Ansprechpartner',
            name: 'Jürgen Drummer',
            mobile: {
                number: '01703396915',
                text: '0170 / 3396915'
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
        this.titleService.setTitle('Alte Herren');
    }
}
