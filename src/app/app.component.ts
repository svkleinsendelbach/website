import { Component, HostListener } from '@angular/core';
import { Link } from './template/classes/link';
import { Style } from './template/classes/style';
import { CookieSelectorMessageComponent } from './template/components/cookies/cookie-selector-message/cookie-selector-message.component';
import { HeaderComponent } from './template/components/header/header.component';
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

  public cookieSelectorMessageStyleConfig: CookieSelectorMessageComponent.StyleConfig = {
    backgroundColor: new Style.AppearanceColor(Style.Color.hex('#FFFFFF'), Style.Color.hex('#000000')),
    primaryColor: new Style.AppearanceColor(Style.Color.hex('#C90024')),
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
  'fussball/jugend' | 'fussball/jugend/c-jugend' | 'fussball/jugend/e-jugend' | 'fussball/jugend/f-jugend' | 'fussball/jugend/g-jugend' | 'gymnastik' | 'tanzen' | 'anfahrt' | 'kontakt'

export const allHeaderItemLinks = {
 home: {
    id: 'home',
    name: 'Home',
    link: Link.internal<InternalPath>('Home', 'home')
  },
 aboutUs: {
    id: 'aboutUs',
    name: 'Über uns',
    link: Link.internal<InternalPath>('Über uns', 'über-uns')
  },
 managers: {
    id: 'managers',
    name: 'Vorstandschaft',
    link: Link.internal<InternalPath>('Vorstandschaft', 'über-uns')
  },
 sportshome: {
    id: 'sportshome',
    name: 'Sportheim',
    link: Link.internal<InternalPath>('Sportheim', 'sportheim')
  },
 chronicle: {
    id: 'chronicle',
    name: 'Chronik',
    link: Link.internal<InternalPath>('Chronik', 'chroniken')
  },
 statute: {
    id: 'statute',
    name: 'Satzung',
    link: Link.internal<InternalPath>('Satzung', 'satzung')
  },
 privacy: {
    id: 'privacy',
    name: 'Datenschutz',
    link: Link.internal<InternalPath>('Datenschutz', 'datenschutz')
  },
 request: {
    id: 'request',
    name: 'Mitgliedsantrag',
    link: Link.internal<InternalPath>('Mitgliedsantrag', 'mitgliedsantrag')
  },
 footballAdult: {
    id: 'footballAdult',
    name: 'Herrenfussball',
    link: Link.internal<InternalPath>('Herrenfussball', 'fussball/herren')
  },
 footballAdultGeneral: {
    id: 'footballAdultGeneral',
    name: 'Abteilungsübersicht',
    link: Link.internal<InternalPath>('Abteilungsübersicht', 'fussball/herren')
  },
 footballAdult1: {
    id: 'footballAdult1',
    name: '1. Mannschaft',
    link: Link.internal<InternalPath>('1. Mannschaft', 'fussball/herren/erste-mannschaft')
  },
 footballAdult2: {
    id: 'footballAdult2',
    name: '2. Mannschaft',
    link: Link.internal<InternalPath>('2. Mannschaft', 'fussball/herren/zweite-mannschaft')
  },
 footballAdultAH: {
    id: 'footballAdultAH',
    name: 'Alte Herren',
    link: Link.internal<InternalPath>('Alte Herren','fussball/herren/alte-herren')
  },
 footballYouth: {
    id: 'footballYouth',
    name: 'Jugendfussball',
    link: Link.internal<InternalPath>('Jugendfussball', 'fussball/jugend')
  },
 footballYouthGeneral: {
    id: 'footballYouthGeneral',
    name: 'Abteilungsübersicht',
    link: Link.internal<InternalPath>('Abteilungsübersicht', 'fussball/jugend')
  },
 footballYouthA: {
    id: 'footballYouthA',
    name: 'A-Jugend (SV Hetzles)',
    link: Link.external<InternalPath>('A-Jugend (SV Hetzles)', 'http://sv-hetzles.de/index.php/a-junioren', true)
  },
 footballYouthB: {
    id: 'footballYouthB',
    name: 'B-Jugend (SV Hetzles)',
    link: Link.external<InternalPath>('B-Jugend (SV Hetzles)', 'http://sv-hetzles.de/index.php/b-junioren-u17', true)
  },
 footballYouthC: {
    id: 'footballYouthC',
    name: 'C-Jugend',
    link: Link.internal<InternalPath>('C-Jugend', 'fussball/jugend/c-jugend')
  },
 footballYouthD: {
    id: 'footballYouthD',
    name: 'D-Jugend (TSV Neunk. a. B.)',
    link: Link.external<InternalPath>('D-Jugend (TSV Neunk. a. B.)', 'http://www.tsv-neunkirchen-am-brand.de/fu/junioren', true)
  },
 footballYouthE: {
    id: 'footballYouthE',
    name: 'E-Jugend',
    link: Link.internal<InternalPath>('E-Jugend', 'fussball/jugend/e-jugend')
  },
 footballYouthF: {
    id: 'footballYouthF',
    name: 'F-Jugend',
    link: Link.internal<InternalPath>('F-Jugend', 'fussball/jugend/f-jugend')
  },
 footballYouthG: {
    id: 'footballYouthG',
    name: 'G-Jugend',
    link: Link.internal<InternalPath>('G-Jugend', 'fussball/jugend/g-jugend')
  },
 gymnastics: {
    id: 'gymnastics',
    name: 'Gymnastik',
    link: Link.internal<InternalPath>('Gymnastik', 'gymnastik')
  },
 dancing: {
    id: 'dancing',
    name: 'Tanzen',
    link: Link.internal<InternalPath>('Tanzen', 'tanzen')
  },
 drive: {
    id: 'drive',
    name: 'Anfahrt',
    link: Link.internal<InternalPath>('Anfahrt', 'anfahrt')
  },
 contact: {
    id: 'contact',
    name: 'Kontakt',
    link: Link.internal<InternalPath>('Kontakt','kontakt')
  }
}
