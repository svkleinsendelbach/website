import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BannerItem } from 'src/app/pages/home/home-banner/home-banner.component';
import { LinkData, LinkItem } from './home-links/home-links.component';
import { SocialMediaData, SocialMediaItem } from './social-media-links/social-media-links.component';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFutbol, faMap } from '@fortawesome/free-regular-svg-icons';
import { faAddressCard, faChild, faInfo, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { InternalLink } from 'src/app/types/internal-path';
import { EventGroupId } from 'src/app/modules/firebase-api/types/event';
import { Link } from 'src/app/types/link';
import { ReportGroupId } from 'src/app/modules/firebase-api/types/report';

@Component({
    selector: 'pages-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.sass']
})
export class HomePage {
    public eventGroupTitle = EventGroupId.title;
    public allInternalLinks = InternalLink.all;

    public readonly bannerData: BannerItem[] = [
        {
            imageSource: 'assets/images/mannschaft.png',
            title: 'Herren Mannschaft'
        },
        {
            imageSource: 'assets/images/kleinfeldmannschaften.jpg',
            title: 'Kleinfeld Mannschaften'
        }
    ];

    public readonly linkData: LinkData = {
        desktop: [
            [HomePage.homeLink['über-uns'], HomePage.homeLink['fussball/herren'], HomePage.homeLink['fussball/jugend'], HomePage.homeLink.gymnastik],
            [HomePage.homeLink.tanzen, HomePage.homeLink.anfahrt, HomePage.homeLink.kontakt]
        ],
        tablet: [
            [HomePage.homeLink['über-uns'], HomePage.homeLink['fussball/herren']],
            [HomePage.homeLink['fussball/jugend'], HomePage.homeLink.gymnastik, HomePage.homeLink.tanzen],
            [HomePage.homeLink.anfahrt, HomePage.homeLink.kontakt]
        ],
        mobile: [
            [HomePage.homeLink['über-uns']],
            [HomePage.homeLink['fussball/herren']],
            [HomePage.homeLink['fussball/jugend']],
            [HomePage.homeLink.gymnastik],
            [HomePage.homeLink.tanzen],
            [HomePage.homeLink.anfahrt],
            [HomePage.homeLink.kontakt]
        ]
    };

    public readonly reportGroupId: ReportGroupId = 'general';

    public readonly socialMediaData: SocialMediaData = {
        desktop: [
            [HomePage.socialMediaLink.facebook, HomePage.socialMediaLink.instagram, HomePage.socialMediaLink.sgWebsite]
        ],
        tablet: [
            [HomePage.socialMediaLink.facebook, HomePage.socialMediaLink.instagram, HomePage.socialMediaLink.sgWebsite]
        ],
        mobile: [
            [HomePage.socialMediaLink.facebook],
            [HomePage.socialMediaLink.instagram],
            [HomePage.socialMediaLink.sgWebsite]
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

export namespace HomePage {
    export const homeLink: Record<'über-uns' | 'fussball/herren' | 'fussball/jugend' | 'gymnastik' | 'tanzen' | 'anfahrt' | 'kontakt', LinkItem> = {
        'über-uns': {
            name: 'Über uns',
            link: InternalLink.all['über-uns'],
            description: 'Informationen über unseren Vorstand, Sportheim, etc.',
            icon: faInfo,
            animation: 'jump'
        },
        'fussball/herren': {
            name: 'Herrenfussball',
            link: InternalLink.all['fussball/herren'],
            description: 'Ergebnisse und Tabellen der Herrenmannschaften des SV Kleinsendelbach',
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
        }
    };

    export const socialMediaLink: Record<'facebook' | 'instagram' | 'sgWebsite', SocialMediaItem> = {
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
