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
    selector: 'first-team-page',
    standalone: true,
    imports: [CommonModule, TextSectionComponent, EventsComponent, ReportsComponent, ContactsComponent, SquadComponent, ResultDisplayComponent, BfvWidgetComponent, MapsComponent],
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
        this.titleService.setTitle('Erste Mannschaft')
        void this.fetchEventGroups();
        void this.fetchReportGroups();
        void this.fetchSquad();
    }

    private async fetchEventGroups() {
        this.eventGroupsResult = await this.firebaseApi.function('event-get').call({
            groupIds: ['football-adults/first-team']
        });
    }

    private async fetchReportGroups() {
        this.reportGroupsResult = await this.firebaseApi.function('report-get').call({
            groupIds: ['football-adults/first-team'],
            count: 5
        });
    }

    private async fetchSquad() {
        this.squadResult = (await this.firebaseApi.function('bfvData-teamSquad').call({
            anpfiffInfoTeamParameters: anpfiffInfoTeamParametersConfig['first-team']
        })).map(teamSquad => TeamSquad.toSquadData(teamSquad));
    }
}
