import { Component, HostListener } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { AngularFirePerformance } from '@angular/fire/compat/performance';
import { InternalLink, InternalPath } from './classes/InternalPath';
import { CookieService } from './modules/cookie-selector/services/cookie.service';
import { FooterData } from './modules/footer/types/footer-data';
import { HeaderData } from './modules/header/types/header-data';
import { HomeLinkData } from './modules/header/types/home-link-data';
import { Link } from './template/classes/link';
import { Style } from './template/classes/style';
import { DeviceTypeService } from './template/services/device-type.service';
import { StyleConfigService } from './template/services/style-config.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent {
    public headerData: Record<'desktop' | 'tablet' | 'mobile', HeaderData> = {
        desktop: {
            home: {
                topItem: InternalLink.all['home']
            },
            aboutUs: {
                topItem: InternalLink.all['über-uns'],
                subItems: {
                    managers: InternalLink.all['über-uns'],
                    sportshome: InternalLink.all['sportheim'],
                    chronicle: InternalLink.all['chroniken'],
                    statute: InternalLink.all['satzung'],
                    privacy: InternalLink.all['datenschutz'],
                    request: InternalLink.all['mitgliedsantrag']
                }
            },
            footballAdult: {
                topItem: InternalLink.all['fussball/herren'],
                subItems: {
                    footballAdultGeneral: InternalLink.all['fussball/herren'],
                    footballAdultFirstTeam: InternalLink.all['fussball/herren/erste-mannschaft'],
                    footballAdultSecondTeam: InternalLink.all['fussball/herren/zweite-mannschaft'],
                    footballAdultAhTeam: InternalLink.all['fussball/herren/alte-herren']
                }
            },
            footballYouth: {
                topItem: InternalLink.all['fussball/jugend'],
                subItems: {
                    footballYouthGeneral: InternalLink.all['fussball/jugend'],
                    footballYouthAYouth: AppComponent.headerItemLink.footballYouthA,
                    footballYouthBYouth: AppComponent.headerItemLink.footballYouthB,
                    footballYouthCYouth: InternalLink.all['fussball/jugend/c-jugend'],
                    footballYouthDYouth: AppComponent.headerItemLink.footballYouthD,
                    footballYouthEYouth: InternalLink.all['fussball/jugend/e-jugend'],
                    footballYouthFYouth: InternalLink.all['fussball/jugend/f-jugend'],
                    footballYouthGYouth: InternalLink.all['fussball/jugend/g-jugend'],
                }
            },
            gymnastics: {
                topItem: InternalLink.all['gymnastik']
            },
            dancing: {
                topItem: InternalLink.all['tanzen']
            },
            drive: {
                topItem: InternalLink.all['anfahrt']
            },
            contact: {
                topItem: InternalLink.all['kontakt']
            }
        },
        tablet: {
            home: {
                topItem: InternalLink.all['home'],
                subItems: {
                    home: InternalLink.all['home'],
                    drive: InternalLink.all['anfahrt'],
                    contact: InternalLink.all['kontakt']
                }
            },
            aboutUs: {
                topItem: InternalLink.all['über-uns'],
                subItems: {
                    managers: InternalLink.all['über-uns'],
                    sportshome: InternalLink.all['sportheim'],
                    chronicle: InternalLink.all['chroniken'],
                    statute: InternalLink.all['satzung'],
                    privacy: InternalLink.all['datenschutz'],
                    request: InternalLink.all['mitgliedsantrag']
                }
            },
            footballAdult: {
                topItem: InternalLink.all['fussball/herren'],
                subItems: {
                    footballAdultGeneral: InternalLink.all['fussball/herren'],
                    footballAdultFirstTeam: InternalLink.all['fussball/herren/erste-mannschaft'],
                    footballAdultSecondTeam: InternalLink.all['fussball/herren/zweite-mannschaft'],
                    footballAdultAhTeam: InternalLink.all['fussball/herren/alte-herren']
                }
            },
            footballYouth: {
                topItem: InternalLink.all['fussball/jugend'],
                subItems: {
                    footballYouthGeneral: InternalLink.all['fussball/jugend'],
                    footballYouthAYouth: AppComponent.headerItemLink.footballYouthA,
                    footballYouthBYouth: AppComponent.headerItemLink.footballYouthB,
                    footballYouthCYouth: InternalLink.all['fussball/jugend/c-jugend'],
                    footballYouthDYouth: AppComponent.headerItemLink.footballYouthD,
                    footballYouthEYouth: InternalLink.all['fussball/jugend/e-jugend'],
                    footballYouthFYouth: InternalLink.all['fussball/jugend/f-jugend'],
                    footballYouthGYouth: InternalLink.all['fussball/jugend/g-jugend'],
                }
            },
            gymnastics: {
                topItem: InternalLink.all['gymnastik'],
                subItems: {
                    gymnastics: InternalLink.all['gymnastik'],
                    dancing: InternalLink.all['tanzen']
                }
            }
        },
        mobile: {
            home: {
                topItem: InternalLink.all['home'],
                subItems: {
                    home: InternalLink.all['home'],
                    drive: InternalLink.all['anfahrt'],
                    contact: InternalLink.all['kontakt']
                }
            },
            aboutUs: {
                topItem: InternalLink.all['über-uns'],
                subItems: {
                    managers: InternalLink.all['über-uns'],
                    sportshome: InternalLink.all['sportheim'],
                    chronicle: InternalLink.all['chroniken'],
                    statute: InternalLink.all['satzung'],
                    privacy: InternalLink.all['datenschutz'],
                    request: InternalLink.all['mitgliedsantrag']
                }
            },
            footballAdult: {
                topItem: InternalLink.all['fussball/herren'],
                subItems: {
                    footballAdultGeneral: InternalLink.all['fussball/herren'],
                    footballAdultFirstTeam: InternalLink.all['fussball/herren/erste-mannschaft'],
                    footballAdultSecondTeam: InternalLink.all['fussball/herren/zweite-mannschaft'],
                    footballAdultAhTeam: InternalLink.all['fussball/herren/alte-herren']
                }
            },
            footballYouth: {
                topItem: InternalLink.all['fussball/jugend'],
                subItems: {
                    footballYouthGeneral: InternalLink.all['fussball/jugend'],
                    footballYouthAYouth: AppComponent.headerItemLink.footballYouthA,
                    footballYouthBYouth: AppComponent.headerItemLink.footballYouthB,
                    footballYouthCYouth: InternalLink.all['fussball/jugend/c-jugend'],
                    footballYouthDYouth: AppComponent.headerItemLink.footballYouthD,
                    footballYouthEYouth: InternalLink.all['fussball/jugend/e-jugend'],
                    footballYouthFYouth: InternalLink.all['fussball/jugend/f-jugend'],
                    footballYouthGYouth: InternalLink.all['fussball/jugend/g-jugend'],
                }
            },
            gymnastics: {
                topItem: InternalLink.all['gymnastik'],
                subItems: {
                    gymnastics: InternalLink.all['gymnastik'],
                    dancing: InternalLink.all['tanzen']
                }
            }
        }
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
                link: InternalLink.all['anfahrt']
            },
            {
                id: 'contact',
                link: InternalLink.all['kontakt']
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

    public privacyLink = InternalLink.all['datenschutz'];

    public constructor(
    public readonly deviceType: DeviceTypeService,
    private readonly styleConfig: StyleConfigService,
    private readonly cookieService: CookieService,
    private fireAnalytics: AngularFireAnalytics,
    private firePerformance: AngularFirePerformance
    ) {
        this.styleConfig.setConfig({
            primaryColor: new Style.AppearanceColor(Style.Color.hex('#C90024'), Style.Color.hex('#C4354F')),
            backgroundColor: new Style.AppearanceColor(Style.Color.hex('#FFFFFF'), Style.Color.hex('#24252A')),
            secondaryBackgroundColor: new Style.AppearanceColor(Style.Color.hex('#FFFFFF'), Style.Color.hex('#3C4A57')),
            hoveredBackgroundColor: new Style.AppearanceColor(Style.Color.hex('#E0E0E0'), Style.Color.hex('#44454A')),
            textColor: new Style.AppearanceColor(Style.Color.hex('#24252A'), Style.Color.hex('#C8D6E5')),
            secondaryTextColor: new Style.AppearanceColor(Style.Color.hex('#868E90'), Style.Color.hex('#868E90')),
            formSuccessStatusColor: new Style.AppearanceColor(Style.Color.hex('#54B435'), Style.Color.hex('#B6E2A1')),
            formErrorStatusColor: new Style.AppearanceColor(Style.Color.hex('#CE3A0F'), Style.Color.hex('#EB4511')),
            formInfoStatusColor: new Style.AppearanceColor(Style.Color.hex('#FFBF00'), Style.Color.hex('#FFE15D'))
        });
        const statisticsCookie = this.cookieService.cookiesSelection?.statistics;
        this.fireAnalytics.setAnalyticsCollectionEnabled(statisticsCookie === 'selected');
        this.firePerformance.instrumentationEnabled = (statisticsCookie === 'selected') as unknown as Promise<boolean>;
        this.firePerformance.dataCollectionEnabled = (statisticsCookie === 'selected') as unknown as Promise<boolean>;
        this.cookieService.listeners.add('fireAnalytics', selection => {
            this.fireAnalytics.setAnalyticsCollectionEnabled(selection.functionality === 'selected');
            this.firePerformance.instrumentationEnabled = (selection.functionality === 'selected') as unknown as Promise<boolean>;
            this.firePerformance.dataCollectionEnabled = (selection.functionality === 'selected') as unknown as Promise<boolean>;
        });
    }

  @HostListener('window:resize') onResize() {
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
