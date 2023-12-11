import { Component } from '@angular/core';
import { TextSectionComponent, EventsComponent, ReportsComponent, ContactsComponent, MapsComponent, ContactsData, EventGroup, ReportGroup } from 'kleinsendelbach-website-library';
import { contact } from '../../../config/contacts.config';
import { environment } from '../../../environment/environment';
import { mapsConfig } from '../../../config/maps.config';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'g-youth-page',
    standalone: true,
    imports: [TextSectionComponent, EventsComponent, ReportsComponent, ContactsComponent, MapsComponent],
    templateUrl: './g-youth.page.html',
    styleUrl: './g-youth.page.sass'
})
export class GYouthPage {

    public contactsData: ContactsData = [
        contact('Trainer', 'max-kolder'),
        contact('Trainer', 'tobias-habermann'),
        contact('Trainer', 'alexander-burkhard')
    ];

    public googleMapsApiKey =  environment.googleMaps.apiKey;

    public mapOptions: google.maps.MapOptions = {
        ...mapsConfig.options,
        center: mapsConfig.coordinates['a-field']
    }

    public mapMarkers = [
        mapsConfig.coordinates['a-field']
    ]

    public eventGroups: EventGroup<never>[] = []; // TODO

    public eventGroupTitle: Record<never, string> = {}; // TODO

    public getCalendarSubscriptionLink: (eventGroupIds: never[]) => string = () => ''; // TODO

    public reportGroups: ReportGroup<never>[] = []; // TODO

    public reportGroupTitle: Record<never, string> = {}; // TODO

    constructor(
        private readonly titleService: Title,
    ) {
        this.titleService.setTitle('G-Jugend')
    }
}
