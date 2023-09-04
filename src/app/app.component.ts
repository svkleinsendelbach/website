import { Component, HostListener } from '@angular/core';
import { InternalLink, InternalPath } from './types/internal-path';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { AngularFirePerformance } from '@angular/fire/compat/performance';
import { CookieSelectionService } from './modules/cookie-selector/services/cookie-selection.service';
import { DeviceTypeService } from './services/device-type.service';
import { FooterData } from './modules/footer/types/footer-data';
import { HeaderItem } from './modules/header/types/header-item';
import { HomeLinkData } from './modules/header/types/home-link-data';
import { Link } from './types/link';
import { StyleConfigService } from './services/style-config.service';

/* eslint-disable sort-keys */
@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.sass'],
    templateUrl: './app.component.html'
})
export class AppComponent {
    public headerData: Record<'desktop' | 'mobile' | 'tablet', HeaderItem[]> = {
        desktop: [
            {
                id: 'home',
                topItem: InternalLink.all.home,
                subItems: null
            },
            {
                id: 'aboutUs',
                topItem: InternalLink.all['über-uns'],
                subItems: [
                    { id: 'managers',
                        link: InternalLink.all['über-uns'] },
                    { id: 'sportshome',
                        link: InternalLink.all.sportheim },
                    { id: 'chronicle',
                        link: InternalLink.all.chroniken },
                    { id: 'statute',
                        link: InternalLink.all.satzung },
                    { id: 'privacy',
                        link: InternalLink.all.datenschutz },
                    { id: 'request',
                        link: InternalLink.all.mitgliedsantrag }
                ]
            },
            {
                id: 'footballAdult',
                topItem: InternalLink.all['fussball/herren'],
                subItems: [
                    { id: 'footballAdultGeneral',
                        link: InternalLink.all['fussball/herren'] },
                    { id: 'footballAdultFirstTeam',
                        link: InternalLink.all['fussball/herren/erste-mannschaft'] },
                    { id: 'footballAdultSecondTeam',
                        link: InternalLink.all['fussball/herren/zweite-mannschaft'] },
                    { id: 'footballAdultAhTeam',
                        link: InternalLink.all['fussball/herren/alte-herren'] }
                ]
            },
            {
                id: 'footballYouth',
                topItem: InternalLink.all['fussball/jugend'],
                subItems: [
                    { id: 'footballYouthGeneral',
                        link: InternalLink.all['fussball/jugend'] },
                    { id: 'footballYouthAYouth',
                        link: AppComponent.headerItemLink.footballYouthA },
                    { id: 'footballYouthBYouth',
                        link: AppComponent.headerItemLink.footballYouthB },
                    { id: 'footballYouthCYouth',
                        link: InternalLink.all['fussball/jugend/c-jugend'] },
                    { id: 'footballYouthDYouth',
                        link: AppComponent.headerItemLink.footballYouthD },
                    { id: 'footballYouthEYouth',
                        link: InternalLink.all['fussball/jugend/e-jugend'] },
                    { id: 'footballYouthFYouth',
                        link: InternalLink.all['fussball/jugend/f-jugend'] },
                    { id: 'footballYouthGYouth',
                        link: InternalLink.all['fussball/jugend/g-jugend'] }
                ]
            },
            {
                id: 'gymnastics',
                topItem: InternalLink.all.gymnastik,
                subItems: null
            },
            {
                id: 'dancing',
                topItem: InternalLink.all.tanzen,
                subItems: null
            },
            {
                id: 'drive',
                topItem: InternalLink.all.anfahrt,
                subItems: null
            },
            {
                id: 'contact',
                topItem: InternalLink.all.kontakt,
                subItems: null
            }
        ],
        tablet: [
            {
                id: 'home',
                topItem: InternalLink.all.home,
                subItems: [
                    { id: 'home',
                        link: InternalLink.all.home },
                    { id: 'drive',
                        link: InternalLink.all.anfahrt },
                    { id: 'contact',
                        link: InternalLink.all.kontakt }
                ]
            },
            {
                id: 'aboutUs',
                topItem: InternalLink.all['über-uns'],
                subItems: [
                    { id: 'managers',
                        link: InternalLink.all['über-uns'] },
                    { id: 'sportshome',
                        link: InternalLink.all.sportheim },
                    { id: 'chronicle',
                        link: InternalLink.all.chroniken },
                    { id: 'statute',
                        link: InternalLink.all.satzung },
                    { id: 'privacy',
                        link: InternalLink.all.datenschutz },
                    { id: 'request',
                        link: InternalLink.all.mitgliedsantrag }
                ]
            },
            {
                id: 'footballAdult',
                topItem: InternalLink.all['fussball/herren'],
                subItems: [
                    { id: 'footballAdultGeneral',
                        link: InternalLink.all['fussball/herren'] },
                    { id: 'footballAdultFirstTeam',
                        link: InternalLink.all['fussball/herren/erste-mannschaft'] },
                    { id: 'footballAdultSecondTeam',
                        link: InternalLink.all['fussball/herren/zweite-mannschaft'] },
                    { id: 'footballAdultAhTeam',
                        link: InternalLink.all['fussball/herren/alte-herren'] }
                ]
            },
            {
                id: 'footballYouth',
                topItem: InternalLink.all['fussball/jugend'],
                subItems: [
                    { id: 'footballYouthGeneral',
                        link: InternalLink.all['fussball/jugend'] },
                    { id: 'footballYouthAYouth',
                        link: AppComponent.headerItemLink.footballYouthA },
                    { id: 'footballYouthBYouth',
                        link: AppComponent.headerItemLink.footballYouthB },
                    { id: 'footballYouthCYouth',
                        link: InternalLink.all['fussball/jugend/c-jugend'] },
                    { id: 'footballYouthDYouth',
                        link: AppComponent.headerItemLink.footballYouthD },
                    { id: 'footballYouthEYouth',
                        link: InternalLink.all['fussball/jugend/e-jugend'] },
                    { id: 'footballYouthFYouth',
                        link: InternalLink.all['fussball/jugend/f-jugend'] },
                    { id: 'footballYouthGYouth',
                        link: InternalLink.all['fussball/jugend/g-jugend'] }
                ]
            },
            {
                id: 'gymnastics',
                topItem: InternalLink.all.gymnastik,
                subItems: [
                    { id: 'gymnastics',
                        link: InternalLink.all.gymnastik },
                    { id: 'dancing',
                        link: InternalLink.all.tanzen }
                ]
            }
        ],
        mobile: [
            {
                id: 'home',
                topItem: InternalLink.all.home,
                subItems: [
                    { id: 'home',
                        link: InternalLink.all.home },
                    { id: 'drive',
                        link: InternalLink.all.anfahrt },
                    { id: 'contact',
                        link: InternalLink.all.kontakt }
                ]
            },
            {
                id: 'aboutUs',
                topItem: InternalLink.all['über-uns'],
                subItems: [
                    { id: 'managers',
                        link: InternalLink.all['über-uns'] },
                    { id: 'sportshome',
                        link: InternalLink.all.sportheim },
                    { id: 'chronicle',
                        link: InternalLink.all.chroniken },
                    { id: 'statute',
                        link: InternalLink.all.satzung },
                    { id: 'privacy',
                        link: InternalLink.all.datenschutz },
                    { id: 'request',
                        link: InternalLink.all.mitgliedsantrag }
                ]
            },
            {
                id: 'footballAdult',
                topItem: InternalLink.all['fussball/herren'],
                subItems: [
                    { id: 'footballAdultGeneral',
                        link: InternalLink.all['fussball/herren'] },
                    { id: 'footballAdultFirstTeam',
                        link: InternalLink.all['fussball/herren/erste-mannschaft'] },
                    { id: 'footballAdultSecondTeam',
                        link: InternalLink.all['fussball/herren/zweite-mannschaft'] },
                    { id: 'footballAdultAhTeam',
                        link: InternalLink.all['fussball/herren/alte-herren'] }
                ]
            },
            {
                id: 'footballYouth',
                topItem: InternalLink.all['fussball/jugend'],
                subItems: [
                    { id: 'footballYouthGeneral',
                        link: InternalLink.all['fussball/jugend'] },
                    { id: 'footballYouthAYouth',
                        link: AppComponent.headerItemLink.footballYouthA },
                    { id: 'footballYouthBYouth',
                        link: AppComponent.headerItemLink.footballYouthB },
                    { id: 'footballYouthCYouth',
                        link: InternalLink.all['fussball/jugend/c-jugend'] },
                    { id: 'footballYouthDYouth',
                        link: AppComponent.headerItemLink.footballYouthD },
                    { id: 'footballYouthEYouth',
                        link: InternalLink.all['fussball/jugend/e-jugend'] },
                    { id: 'footballYouthFYouth',
                        link: InternalLink.all['fussball/jugend/f-jugend'] },
                    { id: 'footballYouthGYouth',
                        link: InternalLink.all['fussball/jugend/g-jugend'] }
                ]
            },
            {
                id: 'gymnastics',
                topItem: InternalLink.all.gymnastik,
                subItems: [
                    { id: 'gymnastics',
                        link: InternalLink.all.gymnastik },
                    { id: 'dancing',
                        link: InternalLink.all.tanzen }
                ]
            }
        ]
    };

    public homeLinkData: HomeLinkData = {
        title: 'SV Kleinsendelbach',
        logoSrc: 'assets/images/svk-logo.svg',
        homeLink: InternalLink.all.home
    };

    public footerData: FooterData = {
        links: [
            {
                id: 'drive',
                link: InternalLink.all.anfahrt
            },
            {
                id: 'contact',
                link: InternalLink.all.kontakt
            },
            {
                id: 'impressum',
                link: Link.internal<InternalPath>('Impressum und Datenschutz', 'impressum')
            }
        ],
        copyrightText: '2023 SV Kleinsendelbach e.V.',
        editLink: Link.internal<InternalPath>('Website bearbeite', 'bearbeiten'),
        contact: [
            {
                function: 'Sportheim',
                name: 'Sportverein Kleinsendelbach',
                street: 'Hauptstraße 21',
                city: '91077 Kleinsendelbach',
                telephone: {
                    number: '091268304',
                    text: '09126 / 8304'
                }
            },
            {
                function: 'Vertretungsberechtigter Vorstand',
                name: 'Sebastian Schuldes',
                street: 'Mühlenstraße 2',
                city: '91077 Kleinsendelbach',
                telephone: {
                    number: '015150405030',
                    text: '01515 / 0405030'
                }
            }
        ]
    };

    public privacyLink = InternalLink.all.datenschutz;

    public constructor(
        public readonly deviceType: DeviceTypeService,
        private readonly styleConfig: StyleConfigService,
        private readonly cookieSelectionService: CookieSelectionService,
        private readonly fireAnalytics: AngularFireAnalytics,
        private readonly firePerformance: AngularFirePerformance
    ) {
        this.styleConfig.setConfig();
        const statisticsCookie = this.cookieSelectionService.cookiesSelection ? this.cookieSelectionService.cookiesSelection.statistics : null;
        void this.fireAnalytics.setAnalyticsCollectionEnabled(statisticsCookie === 'selected');
        this.firePerformance.instrumentationEnabled = (statisticsCookie === 'selected') as unknown as Promise<boolean>;
        this.firePerformance.dataCollectionEnabled = (statisticsCookie === 'selected') as unknown as Promise<boolean>;
        this.cookieSelectionService.listeners.add('fireAnalytics', selection => {
            void this.fireAnalytics.setAnalyticsCollectionEnabled(selection.functionality === 'selected');
            this.firePerformance.instrumentationEnabled = (selection.functionality === 'selected') as unknown as Promise<boolean>;
            this.firePerformance.dataCollectionEnabled = (selection.functionality === 'selected') as unknown as Promise<boolean>;
        });
    }

    @HostListener('window:resize') public onResize() {
        this.deviceType.windowResized();
    }
}

export namespace AppComponent {
    export const headerItemLink: Record<'footballYouthA' | 'footballYouthB' | 'footballYouthD', Link> = {
        footballYouthA: Link.external('A-Jugend (SV Hetzles)', 'http://sv-hetzles.de/index.php/a-junioren', true),
        footballYouthB: Link.external('B-Jugend (SV Hetzles)', 'http://sv-hetzles.de/index.php/b-junioren-u17', true),
        footballYouthD: Link.external('D-Jugend (TSV Neunk. a. B.)', 'http://www.tsv-neunkirchen-am-brand.de/fu/junioren', true)
    };
}
