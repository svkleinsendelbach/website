import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { ContactsComponent, ContactsData, EventGroup, EventsComponent, FirebaseApiService, MapsComponent, ReportGroup, ReportsComponent, Result, ResultDisplayComponent, TextSectionComponent } from 'kleinsendelbach-website-library';
import { contact } from '../../../config/contacts.config';
import { environment } from '../../../environment/environment';
import { mapsConfig } from '../../../config/maps.config';
import { EventGroupId } from '../../../types/event-group-id';
import { ReportGroupId } from '../../../types/report-group-id';
import { FirebaseFunctions } from '../../../types/firebase-functions';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ah-team-page',
    standalone: true,
    imports: [CommonModule, TextSectionComponent, ContactsComponent, MapsComponent, EventsComponent, ReportsComponent, ResultDisplayComponent],
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

    public eventGroupsResult: Result<EventGroup<EventGroupId>[]> | null = null;

    public eventGroupTitle: Record<EventGroupId, string> = EventGroupId.title;

    public getCalendarSubscriptionLink = EventGroupId.getCalendarSubscriptionLink;

    public reportGroupsResult: Result<ReportGroup<ReportGroupId>[]> | null = null

    public reportGroupTitle: Record<ReportGroupId, string> = ReportGroupId.title;

    constructor(
        private readonly titleService: Title,
        private readonly firebaseApi: FirebaseApiService<FirebaseFunctions>
    ) {
        this.titleService.setTitle('Alte Herren')
        void this.fetchEventGroups();
        void this.fetchReportGroups();
    }

    private async fetchEventGroups() {
        this.eventGroupsResult = await this.firebaseApi.function('event-get').call({
            groupIds: ['football-adults/ah-team']
        });
    }

    private async fetchReportGroups() {
        this.reportGroupsResult = await this.firebaseApi.function('report-get').call({
            groupIds: ['football-adults/ah-team']
        });
    }
}
