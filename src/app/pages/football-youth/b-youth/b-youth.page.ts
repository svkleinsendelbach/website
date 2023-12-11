import { Component } from '@angular/core';
import { TextSectionComponent, EventsComponent, ReportsComponent, BfvWidgetComponent, ContactsComponent, MapsComponent, ContactsData, EventGroup, ReportGroup } from 'kleinsendelbach-website-library';
import { bfvWidgetConfig } from '../../../config/bfv-widget.config';
import { contact } from '../../../config/contacts.config';
import { environment } from '../../../environment/environment';
import { mapsConfig } from '../../../config/maps.config';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'b-youth-page',
    standalone: true,
    imports: [TextSectionComponent, EventsComponent, ReportsComponent, BfvWidgetComponent, ContactsComponent, MapsComponent],
    templateUrl: './b-youth.page.html',
    styleUrl: './b-youth.page.sass'
})
export class BYouthPage {

    public bfvWidgetTeamId1 = bfvWidgetConfig['b-youth-1'];

    public bfvWidgetTeamId2 = bfvWidgetConfig['b-youth-2'];

    public contactsData: ContactsData = [
        contact('Trainer', 'andreas-lorenz'),
        contact('Trainer', 'lars-schmieder'),
        contact('Trainer', 'ulrich-gruetzner')
    ];

    public googleMapsApiKey =  environment.googleMaps.apiKey;

    public mapOptions: google.maps.MapOptions = {
        ...mapsConfig.options,
        center: mapsConfig.coordinates['sportshome-dormitz']
    }

    public mapMarkers = [
        mapsConfig.coordinates['sportshome-dormitz']
    ]

    public eventGroups: EventGroup<never>[] = []; // TODO

    public eventGroupTitle: Record<never, string> = {}; // TODO

    public getCalendarSubscriptionLink: (eventGroupIds: never[]) => string = () => ''; // TODO

    public reportGroups: ReportGroup<never>[] = []; // TODO

    public reportGroupTitle: Record<never, string> = {}; // TODO

    constructor(
        private readonly titleService: Title,
    ) {
        this.titleService.setTitle('B-Jugend')
    }
}
