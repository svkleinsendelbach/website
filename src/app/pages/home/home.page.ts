import { DeviceType, DeviceTypeService } from 'src/app/services/device-type.service';
import { LinkData, LinkItem } from './home-links/home-links.component';
import { SocialMediaData, SocialMediaItem } from './social-media-links/social-media-links.component';
import { BannerItem } from 'src/app/pages/home/home-banner/home-banner.component';
import { Component } from '@angular/core';
import { EventGroupId } from 'src/app/types/event';
import { Link } from 'src/app/types/link';
import { ReportGroupId } from 'src/app/types/report';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';
import { websiteConfig } from 'src/app/config/website-config';

type LinkType = 'about-us' | 'contact' | 'dancing' | 'drive' | 'football-adults' | 'football-youth' | 'gymnastics';

type SocialMediaType = 'discord' | 'facebook' | 'instagram' | 'sgWebsite';

const linksByDeviceType: Record<DeviceType, LinkType[][]> = {
    desktop: [['about-us', 'football-adults', 'football-youth', 'gymnastics'], ['dancing', 'drive', 'contact']],
    mobile: [['about-us'], ['football-adults'], ['football-youth'], ['gymnastics'], ['dancing'], ['drive'], ['contact']],
    tablet: [['about-us', 'football-adults'], ['football-youth', 'gymnastics', 'dancing'], ['drive', 'contact']]
};

const socialMediaByDeviceType: Record<DeviceType, SocialMediaType[][]> = {
    desktop: [['facebook', 'discord', 'instagram', 'sgWebsite']],
    mobile: [['facebook'], ['discord'], ['instagram'], ['sgWebsite']],
    tablet: [['facebook', 'discord'], ['instagram', 'sgWebsite']]
};

const homeLinks: Record<LinkType, LinkItem> = {
    'about-us': {
        animation: 'jump',
        description: 'Informationen über unseren Vorstand, Sportheim, etc.',
        icon: 'info',
        link: 'über-uns',
        name: 'Über uns'
    },
    'contact': {
        animation: 'shake',
        description: 'Kontakt zum SV Kleinsendelbach aufnehmen',
        icon: 'address-card',
        link: 'kontakt',
        name: 'Kontakt'
    },
    'dancing': {
        animation: 'jump',
        description: 'Tanzgruppen der Kinder',
        icon: 'child',
        link: 'tanzen',
        name: 'Tanzen'
    },
    'drive': {
        animation: 'shake',
        description: 'Anfahrt zum Sportheim Kleinsendelbach',
        icon: 'map',
        link: 'anfahrt',
        name: 'Anfahrt'
    },
    'football-adults': {
        animation: 'rotation',
        description: 'Ergebnisse und Tabellen der Herrenmannschaften des SV Kleinsendelbach',
        icon: 'futbol',
        link: 'fussball/herren',
        name: 'Herrenfussball'
    },
    'football-youth': {
        animation: 'rotation',
        description: 'Ergebnisse und Tabellen der Jugendmannschaften',
        icon: 'futbol',
        link: 'fussball/jugend',
        name: 'Jugendfussball'
    },
    'gymnastics': {
        animation: 'jump',
        description: 'Gymnastikangebote beim SV Kleinsendelbach',
        icon: 'user-friends',
        link: 'gymnastik',
        name: 'Gymnastik'
    }
};

const socialMediaLink: Record<SocialMediaType, SocialMediaItem> = {
    facebook: {
        id: 'facebook',
        image: ['fab', 'facebook-f'],
        link: Link.external('Facebook', 'https://www.facebook.com/svkleinsendelbach/', true),
        name: 'Facebook',
        title: 'SV Kleinsendelbach e.V.'
    },
    discord: {
        id: 'discord',
        image: ['fab', 'discord'],
        link: Link.external('Discord', 'https://discord.gg/gpJMrajz7q', true),
        name: 'Discord',
        title: 'SV Kleinsendelbach e.V.'
    },
    instagram: {
        id: 'instagram',
        image: ['fab', 'instagram'],
        link: Link.external('Instagram', 'https://www.instagram.com/sgkleinsendelbachhetzles/', true),
        name: 'Instagram',
        title: 'SG Kleinsendelbach / Hetzles'
    },
    sgWebsite: {
        id: 'sgWebsite',
        image: {
            darkModeSource: 'assets/images/sg-logo-dark-appearence.png',
            lightModeSource: 'assets/images/sg-logo.png'
        },
        link: Link.external('SG Kleinsendelbach / Hetzles', 'http://sg-kh.de', true),
        name: 'Website der SG',
        title: 'SG Kleinsendelbach / Hetzles'
    }
};

@Component({
    selector: 'pages-home',
    styleUrls: ['./home.page.sass'],
    templateUrl: './home.page.html'
})
export class HomePage {
    public eventGroupTitle = EventGroupId.title;

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
            mobile: linksByDeviceType.mobile.map(row => row.map(link => homeLinks[link])),
            tablet: linksByDeviceType.tablet.map(row => row.map(link => homeLinks[link]))
        };
    }

    public get socialMediaData(): SocialMediaData {
        return {
            desktop: socialMediaByDeviceType.desktop.map(row => row.map(link => socialMediaLink[link])),
            mobile: socialMediaByDeviceType.mobile.map(row => row.map(link => socialMediaLink[link])),
            tablet: socialMediaByDeviceType.tablet.map(row => row.map(link => socialMediaLink[link]))
        };
    }
}
