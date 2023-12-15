import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { ContactsComponent, EventsComponent, EventGroup, LinksComponent, LinksData, ReportsComponent, ReportGroup, TextSectionComponent, ContactsData, LinkDirective, Result, FirebaseApiService, ResultDisplayComponent } from 'kleinsendelbach-website-library';
import { InternalPathKey } from '../../../types/internal-paths';
import { contact } from '../../../config/contacts.config';
import { EventGroupId } from '../../../types/event-group-id';
import { ReportGroupId } from '../../../types/report-group-id';
import { FirebaseFunctions } from '../../../types/firebase-functions';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'football-adults-page',
    standalone: true,
    imports: [CommonModule, TextSectionComponent, LinksComponent, EventsComponent, ReportsComponent, ContactsComponent, LinkDirective, ResultDisplayComponent],
    templateUrl: './general.page.html',
    styleUrl: './general.page.sass'
})
export class FootballAdultsGeneralPage {

    public linksData: LinksData<InternalPathKey> = [
        {
            link: 'football-adults/first-team',
            icon: null,
            title: '1. Mannschaft',
            subtitle: '1. Mannschaft der SG Kleinsendelbach / Hetzles'
        },
        {
            link: 'football-adults/second-team',
            icon: null,
            title: '2. Mannschaft',
            subtitle: '2. Mannschaft der SG Kleinsendelbach / Hetzles'
        },
        {
            link: 'football-adults/ah-team',
            icon: null,
            title: 'Alte Herren',
            subtitle: 'Alte Herren des SV Kleinsendelbach'
        }
    ]

    public contactsData: ContactsData = [
        contact('Abteilungsleiter', 'josef-hoier')
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
        this.titleService.setTitle('Herrenfußball')
        void this.fetchEventGroups();
        void this.fetchReportGroups();
    }

    private async fetchEventGroups() {
        this.eventGroupsResult = await this.firebaseApi.function('event-get').call({
            groupIds: ['football-adults/general', 'football-adults/first-team', 'football-adults/second-team', 'football-adults/ah-team']
        });
    }

    private async fetchReportGroups() {
        this.reportGroupsResult = await this.firebaseApi.function('report-get').call({
            groupIds: ['football-adults/general', 'football-adults/first-team', 'football-adults/second-team', 'football-adults/ah-team']
        });
    }
}
