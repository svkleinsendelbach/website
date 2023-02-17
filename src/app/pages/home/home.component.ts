import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EventGroupId } from 'src/app/classes/EventGroupId';
import { HomeBannerComponent } from 'src/app/template/components/home-banner/home-banner.component';
import { HomeLinksComponent } from 'src/app/template/components/home-links/home-links.component';
import { SocialMediaLinksComponent } from 'src/app/template/components/social-media-links/social-media-links.component';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faAddressBook, faFileLines, faFutbol, faMap, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faAddressCard, faBook, faCalendarDays, faChild, faHouse, faHouseFlag, faInfo, faNewspaper, faRightToBracket, faShieldHalved, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { InternalLink, InternalPath } from 'src/app/classes/InternalPath';
import { Link } from 'src/app/template/classes/link';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  public eventGroupTitle = EventGroupId.title;
  public allInternalLinks = InternalLink.all;

  public readonly bannerData: HomeBannerComponent.BannerItem[] = [];

  public readonly linkData: HomeLinksComponent.LinkDataForDeviceType = {
    desktop: [
      [HomeComponent.homeLink['über-uns'], HomeComponent.homeLink['fussball/herren'], HomeComponent.homeLink['fussball/jugend'], HomeComponent.homeLink.gymnastik],
      [HomeComponent.homeLink.tanzen, HomeComponent.homeLink.anfahrt, HomeComponent.homeLink.kontakt]
    ],
    tablet: [
      [HomeComponent.homeLink['über-uns'], HomeComponent.homeLink['fussball/herren']],
      [HomeComponent.homeLink['fussball/jugend'], HomeComponent.homeLink.gymnastik, HomeComponent.homeLink.tanzen],
      [HomeComponent.homeLink.anfahrt, HomeComponent.homeLink.kontakt]
    ],
    mobile: [
      [HomeComponent.homeLink['über-uns']],
      [HomeComponent.homeLink['fussball/herren']],
      [HomeComponent.homeLink['fussball/jugend']],
      [HomeComponent.homeLink.gymnastik],
      [HomeComponent.homeLink.tanzen],
      [HomeComponent.homeLink.anfahrt],
      [HomeComponent.homeLink.kontakt]
    ]
  };

  public readonly socialMediaData: SocialMediaLinksComponent.SocialMediaDataForDeviceType = {
    desktop: [
      [HomeComponent.socialMediaLink.facebook, HomeComponent.socialMediaLink.instagram, HomeComponent.socialMediaLink.sgWebsite]
    ],
    tablet: [
      [HomeComponent.socialMediaLink.facebook, HomeComponent.socialMediaLink.instagram, HomeComponent.socialMediaLink.sgWebsite]
    ],
    mobile: [
      [HomeComponent.socialMediaLink.facebook],
      [HomeComponent.socialMediaLink.instagram],
      [HomeComponent.socialMediaLink.sgWebsite]
    ]
  };

  public readonly eventGroupIds = EventGroupId.all;

  public constructor(
    public readonly titleService: Title,
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService
  ) {
    this.titleService.setTitle('SV Kleinsendelbach');
  }
}

export namespace HomeComponent {
  export const homeLink: Record<Exclude<InternalPath, 'nachricht' | 'spiel'>, HomeLinksComponent.LinkItem> = {
    'home': {
      name: 'Home',
      link: InternalLink.all['home'],
      description: '',
      icon: faHouse,
      animation: 'shake'
    },
    'über-uns': {
      name: 'Über uns',
      link: InternalLink.all['über-uns'],
      description: 'Informationen über unseren Vorstand, Sportheim, etc.',
      icon: faInfo,
      animation: 'jump'
    },
    'sportheim': {
      name: 'Sportheim',
      link: InternalLink.all['sportheim'],
      description: '',
      icon: faHouseFlag,
      animation: 'shake'
    },
    'chroniken': {
      name: 'Chronik',
      link: InternalLink.all['chroniken'],
      description: '',
      icon: faBook,
      animation: 'shake'
    },
    'satzung': {
      name: 'Satzung',
      link: InternalLink.all['satzung'],
      description: '',
      icon: faFileLines,
      animation: 'shake'
    },
    'datenschutz': {
      name: 'Datenschutz',
      link: InternalLink.all['datenschutz'],
      description: '',
      icon: faShieldHalved,
      animation: 'shake'
    },
    'mitgliedsantrag': {
      name: 'Mitgliedsantrag',
      link: InternalLink.all['mitgliedsantrag'],
      description: '',
      icon: faFileLines,
      animation: 'shake'
    },
    'fussball/herren': {
      name: 'Herrenfussball',
      link: InternalLink.all['fussball/herren'],
      description: 'Ergebnisse und Tabellen der Herrenmannschaften des SV Kleinsendelbach',
      icon: faFutbol,
      animation: 'rotation'
    },
    'fussball/herren/erste-mannschaft': {
      name: '1. Mannschaft',
      link: InternalLink.all['fussball/herren/erste-mannschaft'],
      description: '',
      icon: faFutbol,
      animation: 'rotation'
    },
    'fussball/herren/zweite-mannschaft': {
      name: '2. Mannschaft',
      link: InternalLink.all['fussball/herren/zweite-mannschaft'],
      description: '',
      icon: faFutbol,
      animation: 'rotation'
    },
    'fussball/herren/alte-herren': {
      name: 'Alte Herren',
      link: InternalLink.all['fussball/herren/alte-herren'],
      description: '',
      icon: faFutbol,
      animation: 'rotation'
    },
    'fussball/jugend': {
      name: 'Jugendfussball',
      link: InternalLink.all['fussball/jugend'],
      description: 'Ergebnisse und Tabellen der Jugendmannschaften',
      icon: faFutbol,
      animation: 'rotation'
    },
    'fussball/jugend/c-jugend': {
      name: 'C-Jugend',
      link: InternalLink.all['fussball/jugend/c-jugend'],
      description: '',
      icon: faFutbol,
      animation: 'rotation'
    },
    'fussball/jugend/e-jugend': {
      name: 'E-Jugend',
      link: InternalLink.all['fussball/jugend/e-jugend'],
      description: '',
      icon: faFutbol,
      animation: 'rotation'
    },
    'fussball/jugend/f-jugend': {
      name: 'F-Jugend',
      link: InternalLink.all['fussball/jugend/f-jugend'],
      description: '',
      icon: faFutbol,
      animation: 'rotation'
    },
    'fussball/jugend/g-jugend': {
      name: 'G-Jugend',
      link: InternalLink.all['fussball/jugend/g-jugend'],
      description: '',
      icon: faFutbol,
      animation: 'rotation'
    },
    'gymnastik': {
      name: 'Gymnastik',
      link: InternalLink.all['gymnastik'],
      description: 'Gymnastikangebote beim SV Kleinsendelbach',
      icon: faUserFriends,
      animation: 'jump'
    },
    'tanzen': {
      name: 'Tanzen',
      link: InternalLink.all['tanzen'],
      description: 'Tanzgruppen der Kinder',
      icon: faChild,
      animation: 'jump'
    },
    'anfahrt': {
      name: 'Anfahrt',
      link: InternalLink.all['anfahrt'],
      description: 'Anfahrt zum Sportheim Kleinsendelbach',
      icon: faMap,
      animation: 'shake'
    },
    'kontakt': {
      name: 'Kontakt',
      link: InternalLink.all['kontakt'],
      description: 'Kontakt zum SV Kleinsendelbach aufnehmen',
      icon: faAddressCard,
      animation: 'shake'
    },
    'impressum': {
      name: 'Impressum',
      link: InternalLink.all['impressum'],
      description: '',
      icon: faAddressBook,
      animation: 'shake'
    },
    'nachrichten': {
      name: 'Alle Nachrichten',
      link: InternalLink.all['nachrichten'],
      description: '',
      icon: faNewspaper,
      animation: 'shake'
    },
    'bearbeiten': {
      name: 'Website bearbeiten',
      link: InternalLink.all['bearbeiten'],
      description: '',
      icon: faPenToSquare,
      animation: 'shake'
    },
    'bearbeiten/anmelden': {
      name: 'Anmelden',
      link: InternalLink.all['bearbeiten/anmelden'],
      description: '',
      icon: faRightToBracket,
      animation: 'shake'
    },
    'bearbeiten/termine': {
      name: 'Termine bearbeiten',
      link: InternalLink.all['bearbeiten/termine'],
      description: '',
      icon: faCalendarDays,
      animation: 'shake'
    },
    'bearbeiten/nachrichten': {
      name: 'Nachrichten bearbeiten',
      link: InternalLink.all['bearbeiten/nachrichten'],
      description: '',
      icon: faNewspaper,
      animation: 'shake'
    },
    'bearbeiten/termine/bearbeiten': {
      name: 'Termin bearbeiten',
      link: InternalLink.all['bearbeiten/termine/bearbeiten'],
      description: '',
      icon: faCalendarDays,
      animation: 'shake'
    },
    'bearbeiten/nachrichten/bearbeiten': {
      name: 'Nachricht bearbeiten',
      link: InternalLink.all['bearbeiten/nachrichten/bearbeiten'],
      description: '',
      icon: faNewspaper,
      animation: 'shake'
    }
  };

  export const socialMediaLink: Record<'facebook' | 'instagram' | 'sgWebsite', SocialMediaLinksComponent.SocialMediaItem> = {
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
    sgWebsite: {
      id: 'sgWebsite',
      name: 'Website der SG',
      title: 'SG Kleinsendelbach / Hetzles',
      link: Link.external('SG Kleinsendelbach / Hetzles', 'http://sg-kh.de', true),
      image: {
        lightModeSource: 'assets/images/sg-logo.png',
        darkModeSource: 'assets/images/sg-logo-dark-appearence.png'
      }
    }
  };
}
