import { Component } from '@angular/core';
import { TextSectionComponent, EventsComponent, ReportsComponent, BfvWidgetComponent, ContactsComponent, MapsComponent, ContactsData, EventGroup, ReportGroup } from 'kleinsendelbach-website-library';
import { bfvWidgetConfig } from '../../../config/bfv-widget.config';
import { contact } from '../../../config/contacts.config';
import { environment } from '../../../environment/environment';
import { mapsConfig } from '../../../config/maps.config';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'a-youth-page',
    standalone: true,
    imports: [TextSectionComponent, EventsComponent, ReportsComponent, BfvWidgetComponent, ContactsComponent, MapsComponent],
    templateUrl: './a-youth.page.html',
    styleUrl: './a-youth.page.sass'
})
export class AYouthPage {

    public bfvWidgetTeamId = bfvWidgetConfig['a-youth'];

    public contactsData: ContactsData = [
        contact('Trainer', 'matthias-sitter'),
        contact('Trainer', 'jochen-holzenleuchter'),
        contact('Co-Trainer', 'jannik-dressel')
    ];

    public googleMapsApiKey =  environment.googleMaps.apiKey;

    public mapOptions: google.maps.MapOptions = {
        ...mapsConfig.options,
        center: mapsConfig.coordinates['sportshome-kalchreuth']
    }

    public mapMarkers = [
        mapsConfig.coordinates['sportshome-kalchreuth']
    ]

    public eventGroups: EventGroup<never>[] = []; // TODO

    public eventGroupTitle: Record<never, string> = {}; // TODO

    public getCalendarSubscriptionLink: (eventGroupIds: never[]) => string = () => ''; // TODO

    public reportGroups: ReportGroup<never>[] = []; // TODO

    public reportGroupTitle: Record<never, string> = {}; // TODO

    constructor(
        private readonly titleService: Title,
    ) {
        this.titleService.setTitle('A-Jugend')
    }
}
