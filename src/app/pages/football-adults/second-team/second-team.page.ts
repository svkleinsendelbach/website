import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { BfvWidgetComponent, ContactsComponent, ContactsData, EventGroup, EventsComponent, FirebaseApiService, MapsComponent, ReportGroup, ReportsComponent, Result, ResultDisplayComponent, SquadComponent, SquadData, TextSectionComponent } from 'kleinsendelbach-website-library';
import { bfvWidgetConfig } from '../../../config/bfv-widget.config';
import { contact } from '../../../config/contacts.config';
import { environment } from '../../../environment/environment';
import { mapsConfig } from '../../../config/maps.config';
import { EventGroupId } from '../../../types/event-group-id';
import { ReportGroupId } from '../../../types/report-group-id';
import { FirebaseFunctions } from '../../../types/firebase-functions';
import { CommonModule } from '@angular/common';
import { anpfiffInfoTeamParametersConfig } from '../../../config/anpfiffInfoTeamParameters.config';
import { TeamSquad } from '../../../types/team-squad';

@Component({
    selector: 'second-team-page',
    standalone: true,
    imports: [CommonModule, TextSectionComponent, EventsComponent, ReportsComponent, BfvWidgetComponent, ContactsComponent, MapsComponent, SquadComponent, ResultDisplayComponent],
    templateUrl: './second-team.page.html',
    styleUrl: './second-team.page.sass'
})
export class SecondTeamPage {

    public bfvWidgetTeamId = bfvWidgetConfig['second-team'];

    public contactsData: ContactsData = [
        contact('Trainer', 'tim-kellermann'),
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

    public eventGroupsResult: Result<EventGroup<EventGroupId>[]> | null = null;

    public eventGroupTitle: Record<EventGroupId, string> = EventGroupId.title;

    public getCalendarSubscriptionLink = EventGroupId.getCalendarSubscriptionLink;

    public reportGroupsResult: Result<ReportGroup<ReportGroupId>[]> | null = null

    public reportGroupTitle: Record<ReportGroupId, string> = ReportGroupId.title;

    public squadResult: Result<SquadData> | null = null;

    constructor(
        private readonly titleService: Title,
        private readonly firebaseApi: FirebaseApiService<FirebaseFunctions>
    ) {
        this.titleService.setTitle('Zweite Mannschaft')
        void this.fetchEventGroups();
        void this.fetchReportGroups();
        void this.fetchSquad();
    }

    private async fetchEventGroups() {
        this.eventGroupsResult = await this.firebaseApi.function('event-get').call({
            groupIds: ['football-adults/second-team']
        });
    }

    private async fetchReportGroups() {
        this.reportGroupsResult = await this.firebaseApi.function('report-get').call({
            groupIds: ['football-adults/second-team'],
            count: 5
        });
    }

    private async fetchSquad() {
        this.squadResult = (await this.firebaseApi.function('bfvData-teamSquad').call({
            anpfiffInfoTeamParameters: anpfiffInfoTeamParametersConfig['second-team']
        })).map(teamSquad => TeamSquad.toSquadData(teamSquad));
    }
}
