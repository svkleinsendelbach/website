import { Component, HostListener } from '@angular/core';
import { Link } from './template/classes/link';
import { Style } from './template/classes/style';
import { CookieSelectorMessageComponent } from './template/components/cookies/cookie-selector-message/cookie-selector-message.component';
import { FooterComponent } from './template/components/footer/footer.component';
import { HeaderComponent } from './template/components/header/header.component';
import { ToggleSwitchComponent } from './template/components/toggle-switch/toggle-switch.component';
import { DeviceTypeService } from './template/services/device-type.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  public title = 'svkleinsendelbach-website';

  public headerData: HeaderComponent.HeaderDataForDeviceType<InternalPath> = {
    desktop: [
      {
        id: 'home',
        topItem: allHeaderItemLinks.home
      },
      {
        id: 'aboutUs',
        topItem: allHeaderItemLinks.aboutUs,
        subItems: [
          allHeaderItemLinks.managers,
          allHeaderItemLinks.sportshome,
          allHeaderItemLinks.chronicle,
          allHeaderItemLinks.statute,
          allHeaderItemLinks.privacy,
          allHeaderItemLinks.request
        ]
      },
      {
        id: 'footballAdult',
        topItem: allHeaderItemLinks.footballAdult,
        subItems: [
          allHeaderItemLinks.footballAdultGeneral,
          allHeaderItemLinks.footballAdult1,
          allHeaderItemLinks.footballAdult2,
          allHeaderItemLinks.footballAdultAH
        ]
      },
      {
        id: 'footballYouth',
        topItem: allHeaderItemLinks.footballYouth,
        subItems: [
          allHeaderItemLinks.footballYouthGeneral,
          allHeaderItemLinks.footballYouthA,
          allHeaderItemLinks.footballYouthB,
          allHeaderItemLinks.footballYouthC,
          allHeaderItemLinks.footballYouthD,
          allHeaderItemLinks.footballYouthE,
          allHeaderItemLinks.footballYouthF,
          allHeaderItemLinks.footballYouthG,
        ]
      },
      {
        id: 'gymnastics',
        topItem: allHeaderItemLinks.gymnastics
      },
      {
        id: 'dancing',
        topItem: allHeaderItemLinks.dancing
      },
      {
        id: 'drive',
        topItem: allHeaderItemLinks.drive
      },
      {
        id: 'contact',
        topItem: allHeaderItemLinks.contact
      }
    ],
    tablet: [
      {
        id: 'home',
        topItem: allHeaderItemLinks.home,
        subItems: [
          allHeaderItemLinks.home,
          allHeaderItemLinks.drive,
          allHeaderItemLinks.contact
        ]
      },
      {
        id: 'aboutUs',
        topItem: allHeaderItemLinks.aboutUs,
        subItems: [
          allHeaderItemLinks.managers,
          allHeaderItemLinks.sportshome,
          allHeaderItemLinks.chronicle,
          allHeaderItemLinks.statute,
          allHeaderItemLinks.privacy,
          allHeaderItemLinks.request
        ]
      },
      {
        id: 'footballAdult',
        topItem: allHeaderItemLinks.footballAdult,
        subItems: [
          allHeaderItemLinks.footballAdultGeneral,
          allHeaderItemLinks.footballAdult1,
          allHeaderItemLinks.footballAdult2,
          allHeaderItemLinks.footballAdultAH
        ]
      },
      {
        id: 'footballYouth',
        topItem: allHeaderItemLinks.footballYouth,
        subItems: [
          allHeaderItemLinks.footballYouthGeneral,
          allHeaderItemLinks.footballYouthA,
          allHeaderItemLinks.footballYouthB,
          allHeaderItemLinks.footballYouthC,
          allHeaderItemLinks.footballYouthD,
          allHeaderItemLinks.footballYouthE,
          allHeaderItemLinks.footballYouthF,
          allHeaderItemLinks.footballYouthG,
        ]
      },
      {
        id: 'gymnastics',
        topItem: allHeaderItemLinks.gymnastics,
        subItems: [
          allHeaderItemLinks.gymnastics,
          allHeaderItemLinks.dancing
        ]
      }
    ],
    mobile: [
      {
        id: 'home',
        topItem: allHeaderItemLinks.home,
        subItems: [
          allHeaderItemLinks.home,
          allHeaderItemLinks.drive,
          allHeaderItemLinks.contact
        ]
      },
      {
        id: 'aboutUs',
        topItem: allHeaderItemLinks.aboutUs,
        subItems: [
          allHeaderItemLinks.managers,
          allHeaderItemLinks.sportshome,
          allHeaderItemLinks.chronicle,
          allHeaderItemLinks.statute,
          allHeaderItemLinks.privacy,
          allHeaderItemLinks.request
        ]
      },
      {
        id: 'footballAdult',
        topItem: allHeaderItemLinks.footballAdult,
        subItems: [
          allHeaderItemLinks.footballAdultGeneral,
          allHeaderItemLinks.footballAdult1,
          allHeaderItemLinks.footballAdult2,
          allHeaderItemLinks.footballAdultAH
        ]
      },
      {
        id: 'footballYouth',
        topItem: allHeaderItemLinks.footballYouth,
        subItems: [
          allHeaderItemLinks.footballYouthGeneral,
          allHeaderItemLinks.footballYouthA,
          allHeaderItemLinks.footballYouthB,
          allHeaderItemLinks.footballYouthC,
          allHeaderItemLinks.footballYouthD,
          allHeaderItemLinks.footballYouthE,
          allHeaderItemLinks.footballYouthF,
          allHeaderItemLinks.footballYouthG,
        ]
      },
      {
        id: 'gymnastics',
        topItem: allHeaderItemLinks.gymnastics,
        subItems: [
          allHeaderItemLinks.gymnastics,
          allHeaderItemLinks.dancing
        ]
      }
    ]
  }

  public homeLinkData: HeaderComponent.HomeLinkData<InternalPath> = {
    title: 'SV Kleinsendelbach',
    logoSrc: 'assets/images/svk-logo.png"',
    homeLink: Link.internal('Home', 'home')
  }

  public headerStyleConfig: HeaderComponent.StyleConfig = {
    backgroundColor: new Style.AppearanceColor(Style.Color.hex('#FFFFFF'), Style.Color.hex('#24252A')),
    backgroundColorHover: new Style.AppearanceColor(Style.Color.hex('#F0F0F0'), Style.Color.hex('#44454A')),
    primaryColor: new Style.AppearanceColor(Style.Color.hex('#C90024'), Style.Color.hex('#C4354F')),
    textColor: new Style.AppearanceColor(Style.Color.hex('#000000'), Style.Color.hex('#868E90'))
  }

  public footerData: FooterComponent.FooterData<InternalPath> = {
    links: [
      allHeaderItemLinks.drive,
      allHeaderItemLinks.contact,
      {
        id: 'impressum',
        link: Link.internal<InternalPath>('Impressum und Datenschutz', 'impressum')
      }
    ],
    copyrightText: "2022 SV Kleinsendelbach e.V.",
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
  }

  public footerStyleConfig: FooterComponent.StyleConfig = {
    backgroundColor: new Style.AppearanceColor(Style.Color.hex('#FFFFFF'), Style.Color.hex('#24252A')),
    backgroundColorHover: new Style.AppearanceColor(Style.Color.hex('#F0F0F0'), Style.Color.hex('#44454A')),
    contactBackgroundColor: new Style.AppearanceColor(Style.Color.hex('#FFFFFF'), Style.Color.hex('#3C4A57')),
    primaryColor: new Style.AppearanceColor(Style.Color.hex('#C90024'), Style.Color.hex('#C4354F')),
    textColor: new Style.AppearanceColor(Style.Color.hex('#000000'), Style.Color.hex('#868E90')),
    contactTextColor: new Style.AppearanceColor(Style.Color.hex('#000000'), Style.Color.hex('#C8D6E5')),
    contactShadow: new Style.AppearanceColor(Style.Color.hex('#80808080'), Style.Color.hex('#1C1A17'))
  }

  public toogleStyleConfig: ToggleSwitchComponent.StyleConfig = {
    backgroundColor: new Style.AppearanceColor(Style.Color.hex('#FFFFFF'), Style.Color.hex('#24252A')),
    uncheckedColor: new Style.AppearanceColor(Style.Color.hex('#F0F0F0'), Style.Color.hex('#44454A')),
    primaryColor: new Style.AppearanceColor(Style.Color.hex('#C90024'), Style.Color.hex('#C4354F'))
  }

  public privacyLink = allHeaderItemLinks.privacy.link

  public cookieSelectorMessageStyleConfig: CookieSelectorMessageComponent.StyleConfig = {
    backgroundColor: new Style.AppearanceColor(Style.Color.hex('#FFFFFF'), Style.Color.hex('#24252A')),
    primaryColor: new Style.AppearanceColor(Style.Color.hex('#C90024'), Style.Color.hex('#C4354F')),
    textColor: new Style.AppearanceColor(Style.Color.hex('#333333'), Style.Color.hex('#CCCCCC'))
  }

  public constructor(
    private readonly deviceType: DeviceTypeService
  ) {}

  @HostListener('window:resize') onResize() {
    this.deviceType.windowResized()
  }
}

export type InternalPath = 'home' | 'über-uns' | 'sportheim' | 'chroniken' | 'satzung' | 'datenschutz' | 'mitgliedsantrag' | 'fussball/herren' | 'fussball/herren/erste-mannschaft' | 'fussball/herren/zweite-mannschaft' | 'fussball/herren/alte-herren' |
  'fussball/jugend' | 'fussball/jugend/c-jugend' | 'fussball/jugend/e-jugend' | 'fussball/jugend/f-jugend' | 'fussball/jugend/g-jugend' | 'gymnastik' | 'tanzen' | 'anfahrt' | 'kontakt' | 'impressum' | 'bearbeiten'

export const allHeaderItemLinks = {
 home: {
    id: 'home',
    link: Link.internal<InternalPath>('Home', 'home')
  },
 aboutUs: {
    id: 'aboutUs',
    link: Link.internal<InternalPath>('Über uns', 'über-uns')
  },
 managers: {
    id: 'managers',
    link: Link.internal<InternalPath>('Vorstandschaft', 'über-uns')
  },
 sportshome: {
    id: 'sportshome',
    link: Link.internal<InternalPath>('Sportheim', 'sportheim')
  },
 chronicle: {
    id: 'chronicle',
    link: Link.internal<InternalPath>('Chronik', 'chroniken')
  },
 statute: {
    id: 'statute',
    link: Link.internal<InternalPath>('Satzung', 'satzung')
  },
 privacy: {
    id: 'privacy',
    link: Link.internal<InternalPath>('Datenschutz', 'datenschutz')
  },
 request: {
    id: 'request',
    link: Link.internal<InternalPath>('Mitgliedsantrag', 'mitgliedsantrag')
  },
 footballAdult: {
    id: 'footballAdult',
    link: Link.internal<InternalPath>('Herrenfussball', 'fussball/herren')
  },
 footballAdultGeneral: {
    id: 'footballAdultGeneral',
    link: Link.internal<InternalPath>('Abteilungsübersicht', 'fussball/herren')
  },
 footballAdult1: {
    id: 'footballAdult1',
    link: Link.internal<InternalPath>('1. Mannschaft', 'fussball/herren/erste-mannschaft')
  },
 footballAdult2: {
    id: 'footballAdult2',
    link: Link.internal<InternalPath>('2. Mannschaft', 'fussball/herren/zweite-mannschaft')
  },
 footballAdultAH: {
    id: 'footballAdultAH',
    link: Link.internal<InternalPath>('Alte Herren','fussball/herren/alte-herren')
  },
 footballYouth: {
    id: 'footballYouth',
    link: Link.internal<InternalPath>('Jugendfussball', 'fussball/jugend')
  },
 footballYouthGeneral: {
    id: 'footballYouthGeneral',
    link: Link.internal<InternalPath>('Abteilungsübersicht', 'fussball/jugend')
  },
 footballYouthA: {
    id: 'footballYouthA',
    link: Link.external<InternalPath>('A-Jugend (SV Hetzles)', 'http://sv-hetzles.de/index.php/a-junioren', true)
  },
 footballYouthB: {
    id: 'footballYouthB',
    link: Link.external<InternalPath>('B-Jugend (SV Hetzles)', 'http://sv-hetzles.de/index.php/b-junioren-u17', true)
  },
 footballYouthC: {
    id: 'footballYouthC',
    link: Link.internal<InternalPath>('C-Jugend', 'fussball/jugend/c-jugend')
  },
 footballYouthD: {
    id: 'footballYouthD',
    link: Link.external<InternalPath>('D-Jugend (TSV Neunk. a. B.)', 'http://www.tsv-neunkirchen-am-brand.de/fu/junioren', true)
  },
 footballYouthE: {
    id: 'footballYouthE',
    link: Link.internal<InternalPath>('E-Jugend', 'fussball/jugend/e-jugend')
  },
 footballYouthF: {
    id: 'footballYouthF',
    link: Link.internal<InternalPath>('F-Jugend', 'fussball/jugend/f-jugend')
  },
 footballYouthG: {
    id: 'footballYouthG',
    link: Link.internal<InternalPath>('G-Jugend', 'fussball/jugend/g-jugend')
  },
 gymnastics: {
    id: 'gymnastics',
    link: Link.internal<InternalPath>('Gymnastik', 'gymnastik')
  },
 dancing: {
    id: 'dancing',
    link: Link.internal<InternalPath>('Tanzen', 'tanzen')
  },
 drive: {
    id: 'drive',
    link: Link.internal<InternalPath>('Anfahrt', 'anfahrt')
  },
 contact: {
    id: 'contact',
    link: Link.internal<InternalPath>('Kontakt','kontakt')
  },
  impressum: {
    id: 'impressum',
    link: Link.internal<InternalPath>('Impressum', 'impressum')
  }
}
