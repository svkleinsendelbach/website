import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BannerComponent, DeviceTypeService, EventGroup, EventsComponent, Link, LinkDirective, LinksComponent, LinksData, ReportsComponent, ReportGroup, SocialMediaComponent, SponsorsRowsComponent, TextSectionComponent } from 'kleinsendelbach-website-library';
import { InternalPathKey } from '../../types/internal-paths';
import { sponsorsConfig } from '../../config/sponsors.config';
import { socialMediaConfig } from '../../config/social-media.config';
import { homeBannerConfig } from '../../config/home-banner.config';

@Component({
    selector: 'home-page',
    standalone: true,
    imports: [CommonModule, TextSectionComponent, BannerComponent, LinksComponent, LinkDirective, SponsorsRowsComponent, SocialMediaComponent, EventsComponent, ReportsComponent],
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

   public eventGroups: EventGroup<never>[] = []; // TODO

   public eventGroupTitle: Record<never, string> = {}; // TODO

   public getCalendarSubscriptionLink: (eventGroupIds: never[]) => string = () => ''; // TODO

   public reportGroups: ReportGroup<never>[] = []; // TODO

   public reportGroupTitle: Record<never, string> = {}; // TODO

    constructor(
        private readonly titleService: Title,
        public readonly deviceType: DeviceTypeService
    ) {
        this.titleService.setTitle('SV Kleinsendelbach')
    }
}
