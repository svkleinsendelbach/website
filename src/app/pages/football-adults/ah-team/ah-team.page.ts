import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { ContactsComponent, ContactsData, EventGroup, EventsComponent, MapsComponent, ReportGroup, ReportsComponent, TextSectionComponent } from 'kleinsendelbach-website-library';
import { contact } from '../../../config/contacts.config';
import { environment } from '../../../environment/environment';
import { mapsConfig } from '../../../config/maps.config';

@Component({
    selector: 'ah-team-page',
    standalone: true,
    imports: [TextSectionComponent, ContactsComponent, MapsComponent, EventsComponent, ReportsComponent],
    templateUrl: './ah-team.page.html',
    styleUrl: './ah-team.page.sass'
})
export class AhTeamPage {

    public contactsData: ContactsData = [
        contact('Trainer', 'juergen-drummer')
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
        this.titleService.setTitle('Alte Herren')
    }
}
