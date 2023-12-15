import { ReportGroupId } from './../../types/report-group-id';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BannerComponent, DeviceTypeService, EventGroup, EventsComponent, Link, LinkDirective, LinksComponent, LinksData, ReportsComponent, ReportGroup, SocialMediaComponent, SponsorsRowsComponent, TextSectionComponent, FirebaseApiService, Result, ResultDisplayComponent } from 'kleinsendelbach-website-library';
import { InternalPathKey } from '../../types/internal-paths';
import { sponsorsConfig } from '../../config/sponsors.config';
import { socialMediaConfig } from '../../config/social-media.config';
import { homeBannerConfig } from '../../config/home-banner.config';
import { EventGroupId } from '../../types/event-group-id';
import { FirebaseFunctions } from '../../types/firebase-functions';

@Component({
    selector: 'home-page',
    standalone: true,
    imports: [CommonModule, TextSectionComponent, BannerComponent, LinksComponent, LinkDirective, SponsorsRowsComponent, SocialMediaComponent, EventsComponent, ReportsComponent, ResultDisplayComponent],
    templateUrl: './home.page.html',
    styleUrl: './home.page.sass'
})
export class HomePage {

    public bannerData = homeBannerConfig;

    public linksData: LinksData<InternalPathKey> = [
        {
            link: 'managers',
            icon: {
                name: 'info',
                animation: 'jump'
            },
            title: 'Über uns',
            subtitle: 'Informationen über unseren Vorstand, Sportheim,  etc.'
        },
        {
            link: 'football-adults',
            icon: {
                name: 'soccer-ball',
                animation: 'rotation'
            },
            title: 'Herrenfußball',
            subtitle: 'Ergebnisse und Tabellen der Herrenmannschaften des SV Kleinsendelbach'
        },
        {
            link: 'football-youth',
            icon: {
                name: 'soccer-ball',
                animation: 'rotation'
            },
            title: 'Jugendfußball',
            subtitle: 'Ergebnisse und Tabellen der Jugendmannschaften des SV Kleinsendelbach'
        },
        {
            link: 'gymnastics',
            icon: {
                name: 'user-group',
                animation: 'jump'
            },
            title: 'Gymnastik',
            subtitle: 'Gymnastikangebote beim SV Kleinsendelbach'
        },
        {
            link: 'dancing',
            icon: {
                name: 'child-reaching',
                animation: 'jump'
            },
            title: 'Tanzen',
            subtitle: 'Tanzgruppen der Kinder'
        },
        {
            link: 'drive',
            icon: {
                name: 'map',
                animation: 'shake'
            },
            title: 'Anfahrt',
            subtitle: 'Anfahrt zum Sportverein Kleinsendelbach'
        },
        {
            link: 'contact',
            icon: {
                name: 'address-card',
                animation: 'shake'
            },
            title: 'Kontakt',
            subtitle: 'Kontakt zum SV Kleinsendelbach aufnehmen'
        }
    ];

    public repositoryLink = Link.external('SV Kleinsendelbach e.V. Website Repository', 'https://github.com/svkleinsendelbach/website');

    public socialMediaData = socialMediaConfig;

    public sponsorsData = sponsorsConfig;

   public eventGroupsResult: Result<EventGroup<EventGroupId>[]> | null = null;

   public eventGroupTitle: Record<EventGroupId, string> = EventGroupId.title;

   public getCalendarSubscriptionLink = EventGroupId.getCalendarSubscriptionLink;

   public reportGroupsResult: Result<ReportGroup<ReportGroupId>[]> | null = null

   public reportGroupTitle: Record<ReportGroupId, string> = ReportGroupId.title;

    constructor(
        private readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        private readonly firebaseApi: FirebaseApiService<FirebaseFunctions>
    ) {
        this.titleService.setTitle('SV Kleinsendelbach');
        void this.fetchEventGroups();
        void this.fetchReportGroups();
    }

    private async fetchEventGroups() {
        this.eventGroupsResult = await this.firebaseApi.function('event-get').call({
            groupIds: ['general']
        });
    }

    private async fetchReportGroups() {
        this.reportGroupsResult = await this.firebaseApi.function('report-get').call({
            groupIds: ['general'],
            count: 5
        });
    }
}
