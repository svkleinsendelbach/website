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
    selector: 'd-youth-page',
    standalone: true,
    imports: [CommonModule, TextSectionComponent, EventsComponent, ReportsComponent, BfvWidgetComponent, ContactsComponent, MapsComponent, ResultDisplayComponent],
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

    public eventGroupsResult: Result<EventGroup<EventGroupId>[]> | null = null;

    public eventGroupTitle: Record<EventGroupId, string> = EventGroupId.title;

    public getCalendarSubscriptionLink = EventGroupId.getCalendarSubscriptionLink;

    public reportGroupsResult: Result<ReportGroup<ReportGroupId>[]> | null = null

    public reportGroupTitle: Record<ReportGroupId, string> = ReportGroupId.title;

    constructor(
        private readonly titleService: Title,
        private readonly firebaseApi: FirebaseApiService<FirebaseFunctions>
    ) {
        this.titleService.setTitle('D-Jugend')
        void this.fetchEventGroups();
        void this.fetchReportGroups();
    }

    private async fetchEventGroups() {
        this.eventGroupsResult = await this.firebaseApi.function('event-get').call({
            groupIds: ['football-youth/d-youth']
        });
    }

    private async fetchReportGroups() {
        this.reportGroupsResult = await this.firebaseApi.function('report-get').call({
            groupIds: ['football-youth/d-youth']
        });
    }
}
