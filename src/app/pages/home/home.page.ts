import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BannerItem } from 'src/app/pages/home/home-banner/home-banner.component';
import { LinkData, LinkItem } from './home-links/home-links.component';
import { SocialMediaData, SocialMediaItem } from './social-media-links/social-media-links.component';
import { DeviceType, DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFutbol, faMap } from '@fortawesome/free-regular-svg-icons';
import { faAddressCard, faChild, faInfo, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { InternalLink } from 'src/app/types/internal-path';
import { EventGroupId } from 'src/app/modules/firebase-api/types/event';
import { Link } from 'src/app/types/link';
import { ReportGroupId } from 'src/app/modules/firebase-api/types/report';
import { websiteConfig } from 'src/app/config/website-config';

type LinkType = 'about-us' | 'football-adults' | 'football-youth' | 'gymnastics' | 'dancing' | 'drive' | 'contact';

type SocialMediaType = 'facebook' | 'instagram' | 'sgWebsite';

const linksByDeviceType: Record<DeviceType, LinkType[][]> = {
    desktop: [['about-us', 'football-adults', 'football-youth', 'gymnastics'], ['dancing', 'drive', 'contact']],
    tablet: [['about-us', 'football-adults'], ['football-youth', 'gymnastics', 'dancing'], ['drive', 'contact']],
    mobile: [['about-us'], ['football-adults'], ['football-youth'], ['gymnastics'], ['dancing'], ['drive'], ['contact']]
};

const socialMediaByDeviceType: Record<DeviceType, SocialMediaType[][]> = {
    desktop: [['facebook', 'instagram', 'sgWebsite']],
    tablet: [['facebook', 'instagram', 'sgWebsite']],
    mobile: [['facebook'], ['instagram'], ['sgWebsite']]
};

@Component({
    selector: 'pages-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.sass']
})
export class HomePage {
    public eventGroupTitle = EventGroupId.title;
    public allInternalLinks = InternalLink.all;

    public readonly bannerData: BannerItem[] = websiteConfig.homeBanner;

    public readonly reportGroupId: ReportGroupId = 'general';

    public readonly eventGroupIds = EventGroupId.all;

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {
        this.titleService.setTitle('SV Kleinsendelbach');
    }

    public get linkData(): LinkData {
        return {
            desktop: linksByDeviceType.desktop.map(row => row.map(link => homeLinks[link])),
            tablet: linksByDeviceType.tablet.map(row => row.map(link => homeLinks[link])),
            mobile: linksByDeviceType.mobile.map(row => row.map(link => homeLinks[link]))
        };
    }

    public get socialMediaData(): SocialMediaData {
        return {
            desktop: socialMediaByDeviceType.desktop.map(row => row.map(link => socialMediaLink[link])),
            tablet: socialMediaByDeviceType.tablet.map(row => row.map(link => socialMediaLink[link])),
            mobile: socialMediaByDeviceType.mobile.map(row => row.map(link => socialMediaLink[link]))
        };
    }
}

const homeLinks: Record<LinkType, LinkItem> = {
    'about-us': {
        name: 'Über uns',
        link: InternalLink.all['über-uns'],
        description: 'Informationen über unseren Vorstand, Sportheim, etc.',
        icon: faInfo,
        animation: 'jump'
    },
    'football-adults': {
        name: 'Herrenfussball',
        link: InternalLink.all['fussball/herren'],
        description: 'Ergebnisse und Tabellen der Herrenmannschaften des SV Kleinsendelbach',
        icon: faFutbol,
        animation: 'rotation'
    },
    'football-youth': {
        name: 'Jugendfussball',
        link: InternalLink.all['fussball/jugend'],
        description: 'Ergebnisse und Tabellen der Jugendmannschaften',
        icon: faFutbol,
        animation: 'rotation'
    },
    'gymnastics': {
        name: 'Gymnastik',
        link: InternalLink.all['gymnastik'],
        description: 'Gymnastikangebote beim SV Kleinsendelbach',
        icon: faUserFriends,
        animation: 'jump'
    },
    'dancing': {
        name: 'Tanzen',
        link: InternalLink.all['tanzen'],
        description: 'Tanzgruppen der Kinder',
        icon: faChild,
        animation: 'jump'
    },
    'drive': {
        name: 'Anfahrt',
        link: InternalLink.all['anfahrt'],
        description: 'Anfahrt zum Sportheim Kleinsendelbach',
        icon: faMap,
        animation: 'shake'
    },
    'contact': {
        name: 'Kontakt',
        link: InternalLink.all['kontakt'],
        description: 'Kontakt zum SV Kleinsendelbach aufnehmen',
        icon: faAddressCard,
        animation: 'shake'
    }
};

const socialMediaLink: Record<SocialMediaType, SocialMediaItem> = {
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
