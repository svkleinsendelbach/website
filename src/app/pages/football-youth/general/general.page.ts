import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { TextSectionComponent, LinksComponent, EventsComponent, ReportsComponent, ContactsComponent, LinkDirective, LinksData, ContactsData, EventGroup, ReportGroup, Link, Result, FirebaseApiService, ResultDisplayComponent } from 'kleinsendelbach-website-library';
import { InternalPathKey } from '../../../types/internal-paths';
import { contact } from '../../../config/contacts.config';
import { EventGroupId } from '../../../types/event-group-id';
import { ReportGroupId } from '../../../types/report-group-id';
import { FirebaseFunctions } from '../../../types/firebase-functions';

@Component({
    selector: 'football-youth-page',
    standalone: true,
    imports: [CommonModule, TextSectionComponent, LinksComponent, EventsComponent, ReportsComponent, ContactsComponent, LinkDirective, ResultDisplayComponent],
    templateUrl: './general.page.html',
    styleUrl: './general.page.sass'
})
export class FootballYouthGeneralPage {

    public linksData: LinksData<InternalPathKey> = [
        {
            link: 'football-youth/a-youth',
            icon: null,
            title: 'A-Jugend',
            subtitle: 'A-Jugend der SG Schwabachtal'
        },
        {
            link: 'football-youth/b-youth',
            icon: null,
            title: 'B-Jugend',
            subtitle: 'B-Jugend der SG Schwabachtal'
        },
        {
            link: 'football-youth/c-youth',
            icon: null,
            title: 'C-Jugend',
            subtitle: 'C-Jugend der SG Schwabachtal'
        },
        {
            link: 'football-youth/d-youth',
            icon: null,
            title: 'D-Jugend',
            subtitle: 'D-Jugend der SG Schwabachtal'
        },
        {
            link: 'football-youth/e-youth',
            icon: null,
            title: 'E-Jugend',
            subtitle: 'E-Jugend des SV Kleinsendelbach'
        },
        {
            link: 'football-youth/f-youth',
            icon: null,
            title: 'F-Jugend',
            subtitle: 'F-Jugend des SV Kleinsendelbach'
        },
        {
            link: 'football-youth/g-youth',
            icon: null,
            title: 'G-Jugend',
            subtitle: 'G-Jugend des SV Kleinsendelbach'
        }
    ]

    public contactsData: ContactsData = [
        contact('Jugendleiter Großfeld', 'tim-kellermann'),
        contact('Jugendleiter Kleinfeld', 'matthias-iberl'),
        contact('Jugendleiter Kleinfeld', 'stefan-seubert')
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
        this.titleService.setTitle('Jugendfußball')
        void this.fetchEventGroups();
        void this.fetchReportGroups();
    }

    private async fetchEventGroups() {
        this.eventGroupsResult = await this.firebaseApi.function('event-get').call({
            groupIds: ['football-youth/general', 'football-youth/a-youth', 'football-youth/b-youth', 'football-youth/c-youth', 'football-youth/d-youth', 'football-youth/e-youth', 'football-youth/f-youth', 'football-youth/g-youth']
        });
    }

    private async fetchReportGroups() {
        this.reportGroupsResult = await this.firebaseApi.function('report-get').call({
            groupIds: ['football-youth/general', 'football-youth/a-youth', 'football-youth/b-youth', 'football-youth/c-youth', 'football-youth/d-youth', 'football-youth/e-youth', 'football-youth/f-youth', 'football-youth/g-youth']
        });
    }
}
