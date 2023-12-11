import { Component } from '@angular/core';
import { BfvWidgetComponent, ContactsComponent, ContactsData, EventGroup, EventsComponent, MapsComponent, ReportGroup, ReportsComponent, TextSectionComponent } from 'kleinsendelbach-website-library';
import { bfvWidgetConfig } from '../../../config/bfv-widget.config';
import { contact } from '../../../config/contacts.config';
import { environment } from '../../../environment/environment';
import { mapsConfig } from '../../../config/maps.config';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'f-youth-page',
    standalone: true,
    imports: [TextSectionComponent, EventsComponent, ReportsComponent, BfvWidgetComponent, ContactsComponent, MapsComponent],
    templateUrl: './f-youth.page.html',
    styleUrl: './f-youth.page.sass'
})
export class FYouthPage {

    public bfvWidgetTeamId = bfvWidgetConfig['f-youth'];

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
        this.titleService.setTitle('F-Jugend')
    }
}
