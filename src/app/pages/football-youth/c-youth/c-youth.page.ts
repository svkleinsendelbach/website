import { Component } from '@angular/core';
import { BfvWidgetComponent, ContactsComponent, ContactsData, EventGroup, EventsComponent, MapsComponent, ReportGroup, ReportsComponent, TextSectionComponent } from 'kleinsendelbach-website-library';
import { bfvWidgetConfig } from '../../../config/bfv-widget.config';
import { contact } from '../../../config/contacts.config';
import { environment } from '../../../environment/environment';
import { mapsConfig } from '../../../config/maps.config';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'c-youth-page',
    standalone: true,
    imports: [TextSectionComponent, EventsComponent, ReportsComponent, BfvWidgetComponent, ContactsComponent, MapsComponent],
    templateUrl: './c-youth.page.html',
    styleUrl: './c-youth.page.sass'
})
export class CYouthPage {

    public bfvWidgetTeamId1 = bfvWidgetConfig['c-youth-1'];

    public bfvWidgetTeamId2 = bfvWidgetConfig['c-youth-2'];

    public contactsData: ContactsData = [
        contact('Trainer C1', 'peter-hoefler'),
        contact('Trainer C1', 'steven-kellner'),
        contact('Trainer C2', 'juergen-haas')
    ];

    public googleMapsApiKey =  environment.googleMaps.apiKey;

    public mapOptions: google.maps.MapOptions = {
        ...mapsConfig.options,
        center: mapsConfig.coordinates['b-field']
    }

    public mapMarkers = [
        mapsConfig.coordinates['b-field']
    ]

    public eventGroups: EventGroup<never>[] = []; // TODO

    public eventGroupTitle: Record<never, string> = {}; // TODO

    public getCalendarSubscriptionLink: (eventGroupIds: never[]) => string = () => ''; // TODO

    public reportGroups: ReportGroup<never>[] = []; // TODO

    public reportGroupTitle: Record<never, string> = {}; // TODO

    constructor(
        private readonly titleService: Title,
    ) {
        this.titleService.setTitle('C-Jugend')
    }
}
