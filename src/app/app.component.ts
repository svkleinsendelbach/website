import { Component, HostListener } from '@angular/core';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faAddressBook, faFileLines, faFutbol, faMap, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faAddressCard, faBook, faCalendarDays, faChild, faHouse, faHouseFlag, faInfo, faNewspaper, faRightToBracket, faShieldHalved, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { Link } from './template/classes/link';
import { Style } from './template/classes/style';
import { ContactInfoComponent } from './template/components/contact-info/contact-info.component';
import { FooterComponent } from './template/components/footer/footer.component';
import { HeaderComponent } from './template/components/header/header.component';
import { HomeBannerComponent } from './template/components/home-banner/home-banner.component';
import { HomeLinksComponent } from './template/components/home-links/home-links.component';
import { SocialMediaLinksComponent } from './template/components/social-media-links/social-media-links.component';
import { ToggleSwitchComponent } from './template/components/toggle-switch/toggle-switch.component';
import { DeviceTypeService } from './template/services/device-type.service';
import { StyleConfigService } from './template/services/style-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  public DeviceType = DeviceTypeService.DeviceType

  public title = 'svkleinsendelbach-website';

  public linkDataForDeviceType: HomeLinksComponent.LinkDataForDeviceType<InternalPath> = {
    desktop: [
      [allHomeLinks['über-uns'], allHomeLinks['fussball/herren'], allHomeLinks['fussball/jugend'], allHomeLinks.gymnastik],
      [allHomeLinks.tanzen, allHomeLinks.anfahrt, allHomeLinks.kontakt]
    ],
    tablet: [
      [allHomeLinks['über-uns'], allHomeLinks['fussball/herren']],
      [allHomeLinks['fussball/jugend'], allHomeLinks.gymnastik, allHomeLinks.tanzen],
      [allHomeLinks.anfahrt, allHomeLinks.kontakt]
    ],
    mobile: [
      [allHomeLinks['über-uns']],
      [allHomeLinks['fussball/herren']],
      [allHomeLinks['fussball/jugend']],
      [allHomeLinks.gymnastik],
      [allHomeLinks.tanzen],
      [allHomeLinks.anfahrt],
      [allHomeLinks.kontakt]
    ]
  }

  public socialMediaDataForDeviceType: SocialMediaLinksComponent.SocialMediaDataForDeviceType<InternalPath> = {
    desktop: [
      [allSocialMediaLinks.facebook, allSocialMediaLinks.instagram, allSocialMediaLinks.sgWebiste]
    ],
    tablet: [
      [allSocialMediaLinks.facebook, allSocialMediaLinks.instagram, allSocialMediaLinks.sgWebiste]
    ],
    mobile: [
      [allSocialMediaLinks.facebook],
      [allSocialMediaLinks.instagram],
      [allSocialMediaLinks.sgWebiste]
    ]
  }

  public headerData: HeaderComponent.HeaderDataForDeviceType<InternalPath> = {
    desktop: [
      {
        id: 'home',
        topItem: allHeaderItemLinks['home']
      },
      {
        id: 'aboutUs',
        topItem: allHeaderItemLinks['aboutUs'],
        subItems: [
          allHeaderItemLinks['managers'],
          allHeaderItemLinks['sportshome'],
          allHeaderItemLinks['chronicle'],
          allHeaderItemLinks['statute'],
          allHeaderItemLinks['privacy'],
          allHeaderItemLinks['request']
        ]
      },
      {
        id: 'footballAdult',
        topItem: allHeaderItemLinks['footballAdult'],
        subItems: [
          allHeaderItemLinks['footballAdultGeneral'],
          allHeaderItemLinks['footballAdult1'],
          allHeaderItemLinks['footballAdult2'],
          allHeaderItemLinks['footballAdultAH']
        ]
      },
      {
        id: 'footballYouth',
        topItem: allHeaderItemLinks['footballYouth'],
        subItems: [
          allHeaderItemLinks['footballYouthGeneral'],
          allHeaderItemLinks['footballYouthA'],
          allHeaderItemLinks['footballYouthB'],
          allHeaderItemLinks['footballYouthC'],
          allHeaderItemLinks['footballYouthD'],
          allHeaderItemLinks['footballYouthE'],
          allHeaderItemLinks['footballYouthF'],
          allHeaderItemLinks['footballYouthG'],
        ]
      },
      {
        id: 'gymnastics',
        topItem: allHeaderItemLinks['gymnastics']
      },
      {
        id: 'dancing',
        topItem: allHeaderItemLinks['dancing']
      },
      {
        id: 'drive',
        topItem: allHeaderItemLinks['drive']
      },
      {
        id: 'contact',
        topItem: allHeaderItemLinks['contact']
      }
    ],
    tablet: [
      {
        id: 'home',
        topItem: allHeaderItemLinks['home'],
        subItems: [
          allHeaderItemLinks['home'],
          allHeaderItemLinks['drive'],
          allHeaderItemLinks['contact']
        ]
      },
      {
        id: 'aboutUs',
        topItem: allHeaderItemLinks['aboutUs'],
        subItems: [
          allHeaderItemLinks['managers'],
          allHeaderItemLinks['sportshome'],
          allHeaderItemLinks['chronicle'],
          allHeaderItemLinks['statute'],
          allHeaderItemLinks['privacy'],
          allHeaderItemLinks['request']
        ]
      },
      {
        id: 'footballAdult',
        topItem: allHeaderItemLinks['footballAdult'],
        subItems: [
          allHeaderItemLinks['footballAdultGeneral'],
          allHeaderItemLinks['footballAdult1'],
          allHeaderItemLinks['footballAdult2'],
          allHeaderItemLinks['footballAdultAH']
        ]
      },
      {
        id: 'footballYouth',
        topItem: allHeaderItemLinks['footballYouth'],
        subItems: [
          allHeaderItemLinks['footballYouthGeneral'],
          allHeaderItemLinks['footballYouthA'],
          allHeaderItemLinks['footballYouthB'],
          allHeaderItemLinks['footballYouthC'],
          allHeaderItemLinks['footballYouthD'],
          allHeaderItemLinks['footballYouthE'],
          allHeaderItemLinks['footballYouthF'],
          allHeaderItemLinks['footballYouthG'],
        ]
      },
      {
        id: 'gymnastics',
        topItem: allHeaderItemLinks['gymnastics'],
        subItems: [
          allHeaderItemLinks['gymnastics'],
          allHeaderItemLinks['dancing']
        ]
      }
    ],
    mobile: [
      {
        id: 'home',
        topItem: allHeaderItemLinks['home'],
        subItems: [
          allHeaderItemLinks['home'],
          allHeaderItemLinks['drive'],
          allHeaderItemLinks['contact']
        ]
      },
      {
        id: 'aboutUs',
        topItem: allHeaderItemLinks['aboutUs'],
        subItems: [
          allHeaderItemLinks['managers'],
          allHeaderItemLinks['sportshome'],
          allHeaderItemLinks['chronicle'],
          allHeaderItemLinks['statute'],
          allHeaderItemLinks['privacy'],
          allHeaderItemLinks['request']
        ]
      },
      {
        id: 'footballAdult',
        topItem: allHeaderItemLinks['footballAdult'],
        subItems: [
          allHeaderItemLinks['footballAdultGeneral'],
          allHeaderItemLinks['footballAdult1'],
          allHeaderItemLinks['footballAdult2'],
          allHeaderItemLinks['footballAdultAH']
        ]
      },
      {
        id: 'footballYouth',
        topItem: allHeaderItemLinks['footballYouth'],
        subItems: [
          allHeaderItemLinks['footballYouthGeneral'],
          allHeaderItemLinks['footballYouthA'],
          allHeaderItemLinks['footballYouthB'],
          allHeaderItemLinks['footballYouthC'],
          allHeaderItemLinks['footballYouthD'],
          allHeaderItemLinks['footballYouthE'],
          allHeaderItemLinks['footballYouthF'],
          allHeaderItemLinks['footballYouthG'],
        ]
      },
      {
        id: 'gymnastics',
        topItem: allHeaderItemLinks['gymnastics'],
        subItems: [
          allHeaderItemLinks['gymnastics'],
          allHeaderItemLinks['dancing']
        ]
      }
    ]
  }

  public homeLinkData: HeaderComponent.HomeLinkData<InternalPath> = {
    title: 'SV Kleinsendelbach',
    logoSrc: 'assets/images/svk-logo.png',
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
      allHeaderItemLinks['drive'],
      allHeaderItemLinks['contact'],
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

  public privacyLink = allHeaderItemLinks['privacy'].link

  public contactData: ContactInfoComponent.ContactItem[] = [
    {
      function: 'Trainer',
      name: 'öok maa',
      mobile: {
        number: '',
        text: 'po8e7 / r9087632'
      },
      telephone: {
        number: '',
        text: 'i786283 / r9087632'
      },
      email: 'aöldifömli'
    },
    {
      function: 'alöskdfmoöi jasdlf',
      name: 'oik mba',
      telephone: {
        number: '',
        text: 'i786283 / r9087632'
      },
      email: 'löuiasdjfhb'
    },
    {
      function: 'kionakm9',
      name: 'oipuo z nb',
      mobile: {
        number: '',
        text: 'po8e7 / r9087632'
      }
    }
  ]

  public bannerData: HomeBannerComponent.BannerItem[] = [
    {
      imageSource: 'https://charts.comdirect.de/charts/rebrush/design_small.ewf.chart?DENSITY=2&ID_NOTATION=14477108&TIME_SPAN=1D&TYPE=MOUNTAIN&WITH_EARNINGS=1&HEIGHT=191&WIDTH=348',
      title: 'asdf'
    },
    {
      imageSource: 'https://kleinsendelbach.feuerwehren.bayern/media/filer_public_thumbnails/filer_public/e8/05/e805a6f1-2239-41f4-8201-323e71194811/fahrzeug_startseite.jpg__1300x400_q85_crop_subject_location_subsampling-2_upscale.jpg',
      title: 'ioujkenr'
    },
    {
      imageSource: 'https://cyprusview.com/image/estate-large/y/d/ydxcx.jpg',
      title: 'lioqw45u'
    }
  ]

  public eventGroupDescription: {
    [key in EventGroupId]: string
  } = {
    'general': 'Allgemeines',
    'football-adults/general': 'Herrenfußball',
    'football-adults/first-team': '1. Mannschaft',
    'football-adults/second-team': '2. Mannschaft',
    'football-adults/ah-team': 'Alte Herren',
    'football-youth/general': 'Jugendfußball',
    'football-youth/c-youth': 'C-Jugend',
    'football-youth/e-youth': 'E-Jugend',
    'football-youth/f-youth': 'F-Jugend',
    'football-youth/g-youth': 'G-Jugend',
    'gymnastics': 'Gymnastik',
    'dancing': 'Tanzen'
  }

  public constructor(
    public readonly deviceType: DeviceTypeService,
    private readonly styleConfig: StyleConfigService
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
    })
  }

  @HostListener('window:resize') onResize() {
    this.deviceType.windowResized()
  }
}

export type EventGroupId = 'general' | 'football-adults/general' | 'football-adults/first-team' | 'football-adults/second-team' | 'football-adults/ah-team' | 'football-youth/general' | 'football-youth/c-youth' | 'football-youth/e-youth' |
  'football-youth/f-youth' | 'football-youth/g-youth' | 'gymnastics' | 'dancing';

export type InternalPath = 'home' | 'über-uns' | 'sportheim' | 'chroniken' | 'satzung' | 'datenschutz' | 'mitgliedsantrag' | 'fussball/herren' | 'fussball/herren/erste-mannschaft' | 'fussball/herren/zweite-mannschaft' | 'fussball/herren/alte-herren' |
  'fussball/jugend' | 'fussball/jugend/c-jugend' | 'fussball/jugend/e-jugend' | 'fussball/jugend/f-jugend' | 'fussball/jugend/g-jugend' | 'gymnastik' | 'tanzen' | 'anfahrt' | 'kontakt' | 'impressum' | 'bearbeiten' | 'bearbeiten/anmelden' | 'bearbeiten/termine' |
  'bearbeiten/nachrichten'

export const allInternalLinks: {
 [key in InternalPath]: Link<InternalPath>
} = {
  home: Link.internal<InternalPath>('Home', 'home'),
  'über-uns': Link.internal<InternalPath>('Über uns', 'über-uns'),
  sportheim: Link.internal<InternalPath>('Sportheim', 'sportheim'),
  chroniken: Link.internal<InternalPath>('Chronik', 'chroniken'),
  satzung: Link.internal<InternalPath>('Satzung', 'satzung'),
  datenschutz: Link.internal<InternalPath>('Datenschutz', 'datenschutz'),
  mitgliedsantrag: Link.internal<InternalPath>('Mitgliedsantrag', 'mitgliedsantrag'),
  'fussball/herren': Link.internal<InternalPath>('Herrenfussball', 'fussball/herren'),
  'fussball/herren/erste-mannschaft': Link.internal<InternalPath>('1. Mannschaft', 'fussball/herren/erste-mannschaft'),
  'fussball/herren/zweite-mannschaft': Link.internal<InternalPath>('2. Mannschaft', 'fussball/herren/zweite-mannschaft'),
  'fussball/herren/alte-herren': Link.internal<InternalPath>('Alte Herren','fussball/herren/alte-herren'),
  'fussball/jugend': Link.internal<InternalPath>('Jugendfussball', 'fussball/jugend'),
  'fussball/jugend/c-jugend': Link.internal<InternalPath>('C-Jugend', 'fussball/jugend/c-jugend'),
  'fussball/jugend/e-jugend': Link.internal<InternalPath>('E-Jugend', 'fussball/jugend/e-jugend'),
  'fussball/jugend/f-jugend': Link.internal<InternalPath>('F-Jugend', 'fussball/jugend/f-jugend'),
  'fussball/jugend/g-jugend': Link.internal<InternalPath>('G-Jugend', 'fussball/jugend/g-jugend'),
  gymnastik: Link.internal<InternalPath>('Gymnastik', 'gymnastik'),
  tanzen: Link.internal<InternalPath>('Tanzen', 'tanzen'),
  anfahrt: Link.internal<InternalPath>('Anfahrt', 'anfahrt'),
  kontakt: Link.internal<InternalPath>('Kontakt','kontakt'),
  impressum: Link.internal<InternalPath>('Impressum', 'impressum'),
  bearbeiten: Link.internal<InternalPath>('Website bearbeiten', 'bearbeiten'),
  'bearbeiten/anmelden': Link.internal<InternalPath>('Anmelden', 'bearbeiten/anmelden'),
  'bearbeiten/termine': Link.internal<InternalPath>('Termine bearbeiten', 'bearbeiten/termine'),
  'bearbeiten/nachrichten': Link.internal<InternalPath>('Nachrichten bearbeiten', 'bearbeiten/nachrichten')
 }

export const allHeaderItemLinks: {
  [key: string]: HeaderComponent.HeaderItemLink<InternalPath>
}  = {
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

export const allHomeLinks: {
  [key in InternalPath]: HomeLinksComponent.LinkItem<InternalPath>
} = {
  home: {
    name: 'Home',
    link: allInternalLinks.home,
    description: 'TODO',
    icon: faHouse,
    animation: 'shake'
  },
  'über-uns': {
    name: 'Über uns',
    link: allInternalLinks['über-uns'],
    description: 'Informationen über unseren Vorstand, Sportheim, etc.',
    icon: faInfo,
    animation: 'jump'
  },
  sportheim: {
    name: 'Sportheim',
    link: allInternalLinks.sportheim,
    description: 'TODO',
    icon: faHouseFlag,
    animation: 'shake'
  },
  chroniken: {
    name: 'Chronik',
    link: allInternalLinks.chroniken,
    description: 'TODO',
    icon: faBook,
    animation: 'shake'
  },
  satzung: {
    name: 'Satzung',
    link: allInternalLinks.satzung,
    description: 'TODO',
    icon: faFileLines,
    animation: 'shake'
  },
  datenschutz: {
    name: 'Datenschutz',
    link: allInternalLinks.datenschutz,
    description: 'TODO',
    icon: faShieldHalved,
    animation: 'shake'
  },
  mitgliedsantrag: {
    name: 'Mitgliedsantrag',
    link: allInternalLinks.mitgliedsantrag,
    description: 'TODO',
    icon: faFileLines,
    animation: 'shake'
  },
  'fussball/herren': {
    name: 'Herrenfussball',
    link: allInternalLinks['fussball/herren'],
    description: 'Ergebnisse und Tabellen der Herrenmannschaften des SV Kleinsendelbach',
    icon: faFutbol,
    animation: 'rotation'
  },
  'fussball/herren/erste-mannschaft': {
    name: '1. Mannschaft',
    link: allInternalLinks['fussball/herren/erste-mannschaft'],
    description: 'TODO',
    icon: faFutbol,
    animation: 'rotation'
  },
  'fussball/herren/zweite-mannschaft': {
    name: '2. Mannschaft',
    link: allInternalLinks['fussball/herren/zweite-mannschaft'],
    description: 'TODO',
    icon: faFutbol,
    animation: 'rotation'
  },
  'fussball/herren/alte-herren': {
    name: 'Alte Herren',
    link: allInternalLinks['fussball/herren/alte-herren'],
    description: 'TODO',
    icon: faFutbol,
    animation: 'rotation'
  },
  'fussball/jugend': {
    name: 'Jugendfussball',
    link: allInternalLinks['fussball/jugend'],
    description: 'Ergebnisse und Tabellen der Jugendmannschaften',
    icon: faFutbol,
    animation: 'rotation'
  },
  'fussball/jugend/c-jugend': {
    name: 'C-Jugend',
    link: allInternalLinks['fussball/jugend/c-jugend'],
    description: 'TODO',
    icon: faFutbol,
    animation: 'rotation'
  },
  'fussball/jugend/e-jugend': {
    name: 'E-Jugend',
    link: allInternalLinks['fussball/jugend/e-jugend'],
    description: 'TODO',
    icon: faFutbol,
    animation: 'rotation'
  },
  'fussball/jugend/f-jugend': {
    name: 'F-Jugend',
    link: allInternalLinks['fussball/jugend/f-jugend'],
    description: 'TODO',
    icon: faFutbol,
    animation: 'rotation'
  },
  'fussball/jugend/g-jugend': {
    name: 'G-Jugend',
    link: allInternalLinks['fussball/jugend/g-jugend'],
    description: 'TODO',
    icon: faFutbol,
    animation: 'rotation'
  },
  gymnastik: {
    name: 'Gymnastik',
    link: allInternalLinks.gymnastik,
    description: 'Gymnastikangebote beim SV Kleinsendelbach',
    icon: faUserFriends,
    animation: 'jump'
  },
  tanzen: {
    name: 'Tanzen',
    link: allInternalLinks.tanzen,
    description: 'Tanzgruppen der Kinder',
    icon: faChild,
    animation: 'jump'
  },
  anfahrt: {
    name: 'Anfahrt',
    link: allInternalLinks.anfahrt,
    description: 'Anfahrt zum Sportheim Kleinsendelbach',
    icon: faMap,
    animation: 'shake'
  },
  kontakt: {
    name: 'Kontakt',
    link: allInternalLinks.kontakt,
    description: 'Kontakt zum SV Kleinsendelbach aufnehmen',
    icon: faAddressCard,
    animation: 'shake'
  },
  impressum: {
    name: 'Impressum',
    link: allInternalLinks.impressum,
    description: 'TODO',
    icon: faAddressBook,
    animation: 'shake'
  },
  bearbeiten: {
    name: 'Website bearbeiten',
    link: allInternalLinks.bearbeiten,
    description: 'TODO',
    icon: faPenToSquare,
    animation: 'shake'
  },
  'bearbeiten/anmelden': {
    name: 'Anmelden',
    link: allInternalLinks['bearbeiten/anmelden'],
    description: 'TODO',
    icon: faRightToBracket,
    animation: 'shake'
  },
  'bearbeiten/termine': {
    name: 'Termine bearbeiten',
    link: allInternalLinks['bearbeiten/termine'],
    description: 'TODO',
    icon: faCalendarDays,
    animation: 'shake'
  },
  'bearbeiten/nachrichten': {
    name: 'Nachrichten bearbeiten',
    link: allInternalLinks['bearbeiten/nachrichten'],
    description: 'TODO',
    icon: faNewspaper,
    animation: 'shake'
  }
}

export const allSocialMediaLinks: {
  facebook: SocialMediaLinksComponent.SocialMediaItem<InternalPath>,
  instagram: SocialMediaLinksComponent.SocialMediaItem<InternalPath>,
  sgWebiste: SocialMediaLinksComponent.SocialMediaItem<InternalPath>
} = {
  facebook: {
    id: 'facebook',
    name: 'Facebook',
    title: 'SV Kleinsendelbach',
    link: Link.external('Facebook', 'https://www.facebook.com/svkleinsendelbach/', true),
    image: faFacebookF
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    title: 'SG Kleinsendelbach / Hetzles',
    link: Link.external('Instagram', 'https://www.instagram.com/sgkleinsendelbachhetzles/', true),
    image: faInstagram
  },
  sgWebiste: {
    id: 'sgWebiste',
    name: 'Website',
    title: 'SG Kleinsendelbach / Hetzles',
    link: Link.external('SG Kleinsendelbach / Hetzles', 'http://sg-kh.de', true),
    image: {
      lightModeSource: 'assets/images/sg-logo.png',
      darkModeSource: 'assets/images/sg-logo-dark-appearence.png'
    }
  }
}
export const eventGroupDescription: {
  [key in EventGroupId]: string
} = {
  'general': 'Allgemeines',
  'football-adults/general': 'Herrenfußball',
  'football-adults/first-team': '1. Mannschaft',
  'football-adults/second-team': '2. Mannschaft',
  'football-adults/ah-team': 'Alte Herren',
  'football-youth/general': 'Jugendfußball',
  'football-youth/c-youth': 'C-Jugend',
  'football-youth/e-youth': 'E-Jugend',
  'football-youth/f-youth': 'F-Jugend',
  'football-youth/g-youth': 'G-Jugend',
  'gymnastics': 'Gymnastik',
  'dancing': 'Tanzen'
}
