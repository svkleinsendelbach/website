import { Component } from '@angular/core';
import { BfvWidgetComponent, ContactsComponent, ContactsData, EventGroup, EventsComponent, FirebaseApiService, MapsComponent, ReportGroup, ReportsComponent, Result, ResultDisplayComponent, TextSectionComponent } from 'kleinsendelbach-website-library';
import { bfvWidgetConfig } from '../../../config/bfv-widget.config';
import { contact } from '../../../config/contacts.config';
import { environment } from '../../../environment/environment';
import { mapsConfig } from '../../../config/maps.config';
import { Title } from '@angular/platform-browser';
import { EventGroupId } from '../../../types/event-group-id';
import { ReportGroupId } from '../../../types/report-group-id';
import { FirebaseFunctions } from '../../../types/firebase-functions';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'f-youth-page',
    standalone: true,
    imports: [CommonModule, TextSectionComponent, EventsComponent, ReportsComponent, BfvWidgetComponent, ContactsComponent, MapsComponent, ResultDisplayComponent],
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

    public eventGroupsResult: Result<EventGroup<EventGroupId>[]> | null = null;

    public eventGroupTitle: Record<EventGroupId, string> = EventGroupId.title;

    public getCalendarSubscriptionLink = EventGroupId.getCalendarSubscriptionLink;

    public reportGroupsResult: Result<ReportGroup<ReportGroupId>[]> | null = null

    public reportGroupTitle: Record<ReportGroupId, string> = ReportGroupId.title;

    constructor(
        private readonly titleService: Title,
        private readonly firebaseApi: FirebaseApiService<FirebaseFunctions>
    ) {
        this.titleService.setTitle('F-Jugend')
        void this.fetchEventGroups();
        void this.fetchReportGroups();
    }

    private async fetchEventGroups() {
        this.eventGroupsResult = await this.firebaseApi.function('event-get').call({
            groupIds: ['football-youth/f-youth']
        });
    }

    private async fetchReportGroups() {
        this.reportGroupsResult = await this.firebaseApi.function('report-get').call({
            groupIds: ['football-youth/f-youth'],
            count: 5
        });
    }
}
