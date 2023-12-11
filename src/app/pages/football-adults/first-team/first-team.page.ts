import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { BfvWidgetComponent, ContactsComponent, ContactsData, EventGroup, EventsComponent, MapsComponent, ReportGroup, ReportsComponent, SquadComponent, SquadData, TextSectionComponent } from 'kleinsendelbach-website-library';
import { bfvWidgetConfig } from '../../../config/bfv-widget.config';
import { contact } from '../../../config/contacts.config';
import { environment } from '../../../environment/environment';
import { mapsConfig } from '../../../config/maps.config';

@Component({
    selector: 'first-team-page',
    standalone: true,
    imports: [TextSectionComponent, EventsComponent, ReportsComponent, BfvWidgetComponent, ContactsComponent, MapsComponent, SquadComponent],
    templateUrl: './first-team.page.html',
    styleUrl: './first-team.page.sass'
})
export class FirstTeamPage {

    public bfvWidgetTeamId = bfvWidgetConfig['first-team'];

    public contactsData: ContactsData = [
        contact('Trainer', 'sven-rauh'),
        contact('Co-Trainer', 'florian-frosch'),
        contact('Spielleiter', 'josef-hoier'),
        contact('Spielleiter Hetzles', 'benedikt-mehl')
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

    public squadData: SquadData = []; // TODO

    constructor(
        private readonly titleService: Title,
    ) {
        this.titleService.setTitle('Erste Mannschaft')
    }
}
