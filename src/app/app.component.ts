import { Component, HostListener } from '@angular/core';
import { InternalLink, InternalPath } from './classes/InternalPath';
import { Link } from './template/classes/link';
import { Style } from './template/classes/style';
import { FooterComponent } from './template/components/footer/footer.component';
import { HeaderComponent } from './template/components/header/header.component';
import { DeviceTypeService } from './template/services/device-type.service';
import { StyleConfigService } from './template/services/style-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  public headerData: Record<'desktop' | 'tablet' | 'mobile', HeaderComponent.HeaderData<InternalPath>> = {
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

  public homeLinkData: HeaderComponent.HomeLinkData<InternalPath> = {
    title: 'SV Kleinsendelbach',
    logoSrc: 'assets/images/svk-logo.png',
    homeLink: InternalLink.all.home
  };

  public headerStyleConfig: HeaderComponent.StyleConfig = {
    backgroundColor: new Style.AppearanceColor(Style.Color.hex('#FFFFFF'), Style.Color.hex('#24252A')),
    backgroundColorHover: new Style.AppearanceColor(Style.Color.hex('#F0F0F0'), Style.Color.hex('#44454A')),
    primaryColor: new Style.AppearanceColor(Style.Color.hex('#C90024'), Style.Color.hex('#C4354F')),
    textColor: new Style.AppearanceColor(Style.Color.hex('#000000'), Style.Color.hex('#868E90'))
  };

  public footerData: FooterComponent.FooterData<InternalPath> = {
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
    copyrightText: '2022 SV Kleinsendelbach e.V.',
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

  public footerStyleConfig: FooterComponent.StyleConfig = {
    backgroundColor: new Style.AppearanceColor(Style.Color.hex('#FFFFFF'), Style.Color.hex('#24252A')),
    backgroundColorHover: new Style.AppearanceColor(Style.Color.hex('#F0F0F0'), Style.Color.hex('#44454A')),
    contactBackgroundColor: new Style.AppearanceColor(Style.Color.hex('#FFFFFF'), Style.Color.hex('#3C4A57')),
    primaryColor: new Style.AppearanceColor(Style.Color.hex('#C90024'), Style.Color.hex('#C4354F')),
    textColor: new Style.AppearanceColor(Style.Color.hex('#000000'), Style.Color.hex('#868E90')),
    contactTextColor: new Style.AppearanceColor(Style.Color.hex('#000000'), Style.Color.hex('#C8D6E5')),
    contactShadow: new Style.AppearanceColor(Style.Color.hex('#80808080'), Style.Color.hex('#1C1A17'))
  };

  public privacyLink = InternalLink.all['datenschutz'];

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
    });
  }

  @HostListener('window:resize') onResize() {
    this.deviceType.windowResized();
  }
}

export namespace AppComponent {
  export const headerItemLink: Record<'footballYouthA' | 'footballYouthB' | 'footballYouthD', Link<InternalPath>> = {
    footballYouthA: Link.external<InternalPath>('A-Jugend (SV Hetzles)', 'http://sv-hetzles.de/index.php/a-junioren', true),
    footballYouthB: Link.external<InternalPath>('B-Jugend (SV Hetzles)', 'http://sv-hetzles.de/index.php/b-junioren-u17', true),
    footballYouthD: Link.external<InternalPath>('D-Jugend (TSV Neunk. a. B.)', 'http://www.tsv-neunkirchen-am-brand.de/fu/junioren', true)
  };
}
