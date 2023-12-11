import { Component } from '@angular/core';
import { TextSectionComponent, EventsComponent, ReportsComponent, BfvWidgetComponent, ContactsComponent, MapsComponent, ContactsData, EventGroup, ReportGroup } from 'kleinsendelbach-website-library';
import { bfvWidgetConfig } from '../../../config/bfv-widget.config';
import { contact } from '../../../config/contacts.config';
import { environment } from '../../../environment/environment';
import { mapsConfig } from '../../../config/maps.config';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'd-youth-page',
    standalone: true,
    imports: [TextSectionComponent, EventsComponent, ReportsComponent, BfvWidgetComponent, ContactsComponent, MapsComponent],
    templateUrl: './d-youth.page.html',
    styleUrl: './d-youth.page.sass'
})
export class DYouthPage {

    public bfvWidgetTeamId1 = bfvWidgetConfig['d-youth-1'];

    public bfvWidgetTeamId2 = bfvWidgetConfig['d-youth-2'];

    public bfvWidgetTeamId3 = bfvWidgetConfig['d-youth-3'];

    public bfvWidgetTeamId4 = bfvWidgetConfig['d-youth-4'];

    public contactsData: ContactsData = [
        contact('Trainer D1', 'robin-kugler'),
        contact('Trainer D1', 'jan-wichmann'),
        contact('Trainer D2', 'vitalij-britvak'),
        contact('Trainer D2', 'samuel-jakob'),
        contact('Trainer D3', 'jonas-nienaber'),
        contact('Trainer D3', 'felix-heinke'),
        contact('Trainer D4', 'tim-kellermann'),
        contact('Trainer D4', 'peter-hoefler')
    ];

    public googleMapsApiKey =  environment.googleMaps.apiKey;

    public mapOptions: google.maps.MapOptions = {
        ...mapsConfig.options,
        zoom: 12,
        center: mapsConfig.coordinates['sportshome-neunkirchen']
    }

    public mapMarkers = [
        mapsConfig.coordinates['sportshome-kalchreuth'],
        mapsConfig.coordinates['sportshome-hetzles'],
        mapsConfig.coordinates['sportshome-neunkirchen']
    ]

    public eventGroups: EventGroup<never>[] = []; // TODO

    public eventGroupTitle: Record<never, string> = {}; // TODO

    public getCalendarSubscriptionLink: (eventGroupIds: never[]) => string = () => ''; // TODO

    public reportGroups: ReportGroup<never>[] = []; // TODO

    public reportGroupTitle: Record<never, string> = {}; // TODO

    constructor(
        private readonly titleService: Title,
    ) {
        this.titleService.setTitle('D-Jugend')
    }
}
