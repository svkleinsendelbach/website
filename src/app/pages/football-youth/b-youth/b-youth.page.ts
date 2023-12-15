import { Component } from '@angular/core';
import { TextSectionComponent, EventsComponent, ReportsComponent, BfvWidgetComponent, ContactsComponent, MapsComponent, ContactsData, EventGroup, ReportGroup, Result, FirebaseApiService, ResultDisplayComponent } from 'kleinsendelbach-website-library';
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
    selector: 'b-youth-page',
    standalone: true,
    imports: [CommonModule, TextSectionComponent, EventsComponent, ReportsComponent, BfvWidgetComponent, ContactsComponent, MapsComponent, ResultDisplayComponent],
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

    public eventGroupsResult: Result<EventGroup<EventGroupId>[]> | null = null;

    public eventGroupTitle: Record<EventGroupId, string> = EventGroupId.title;

    public getCalendarSubscriptionLink = EventGroupId.getCalendarSubscriptionLink;

    public reportGroupsResult: Result<ReportGroup<ReportGroupId>[]> | null = null

    public reportGroupTitle: Record<ReportGroupId, string> = ReportGroupId.title;

    constructor(
        private readonly titleService: Title,
        private readonly firebaseApi: FirebaseApiService<FirebaseFunctions>
    ) {
        this.titleService.setTitle('B-Jugend')
        void this.fetchEventGroups();
        void this.fetchReportGroups();
    }

    private async fetchEventGroups() {
        this.eventGroupsResult = await this.firebaseApi.function('event-get').call({
            groupIds: ['football-youth/b-youth']
        });
    }

    private async fetchReportGroups() {
        this.reportGroupsResult = await this.firebaseApi.function('report-get').call({
            groupIds: ['football-youth/b-youth'],
            count: 5
        });
    }
}
