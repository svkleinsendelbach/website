import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BannerComponent, BannerData, DeviceTypeService, EventGroup, EventsComponent, Link, LinkDirective, LinksComponent, LinksData, ReportsComponent, ReportGroup, SocialMediaComponent, SponsorsRowsComponent, TextSectionComponent } from 'kleinsendelbach-website-library';
import { InternalPathKey } from '../../types/internal-paths';
import { sponsorsConfig } from '../../config/sponsors.config';
import { socialMediaConfig } from '../../config/social-media.config';

@Component({
    selector: 'home-page',
    standalone: true,
    imports: [CommonModule, TextSectionComponent, BannerComponent, LinksComponent, LinkDirective, SponsorsRowsComponent, SocialMediaComponent, EventsComponent, ReportsComponent],
    templateUrl: './home.page.html',
    styleUrl: './home.page.sass'
})
export class HomePage {

    public bannerData: BannerData<InternalPathKey> = [
        {
            imageSource: 'assets/images/herren-mannschaft.png',
            title: 'Herren Mannschaft',
            subTitle: '1. und 2. Mannschaft 2019 / 2020',
            link: Link.external('Google', 'https://google.com'), // TODO
            isCurrent: false
        },
        {
            imageSource: 'assets/images/kleinfeld-jugend-mannschaft.jpg',
            title: 'Kleinfeld Jugend Mannschaft',
            subTitle: 'E- bis G-Jugend',
            link: Link.external('Google', 'https://google.com'), // TODO
            isCurrent: false
        },
        {
            imageSource: 'assets/images/großfeld-jugend-mannschaft.jpg',
            title: 'Großfeld Jugend Mannschaft',
            subTitle: 'A- bis D-Jugend',
            link: Link.external('Google', 'https://google.com'), // TODO
            isCurrent: false
        }
    ];

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
