import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { InternalLink, InternalPath } from 'src/app/types/internal-path';
import { EventGroupId } from 'src/app/modules/firebase-api/types/event';
import { Link } from 'src/app/types/link';
import { ContactItem } from 'src/app/modules/general-components/types/contact-item';
import { LinkData } from 'src/app/modules/general-components/types/link-data';
import { ReportGroupId } from 'src/app/modules/firebase-api/types/report';
import { websiteConfig } from 'src/app/config/website-config';

@Component({
    selector: 'pages-football-adults-general',
    templateUrl: './football-adults-general.page.html',
    styleUrls: ['./football-adults-general.page.sass']
})
export class FootballAdultsGeneralPage {
    public eventGroupTitle = EventGroupId.title;
    public allInternalLinks = InternalLink.all;

    public readonly links: LinkData[] = [
        {
            id: 'first-team',
            link: Link.internal<InternalPath>('1. Mannschaft', 'fussball/herren/erste-mannschaft'),
            title: '1. Mannschaft',
            subtitle: '1. Mannschaft der SG Kleinsendelbach / Hetzles'
        },
        {
            id: 'second-team',
            link: Link.internal<InternalPath>('2. Mannschaft', 'fussball/herren/zweite-mannschaft'),
            title: '2. Mannschaft',
            subtitle: '2. Mannschaft der SG Kleinsendelbach / Hetzles'
        },
        {
            id: 'ah-team',
            link: Link.internal<InternalPath>('Alte Herren', 'fussball/herren/alte-herren'),
            title: 'Alte Herren',
            subtitle: 'Alte Herren des SV Kleinsendelbach'
        }
    ];

    public readonly eventGroupIds: EventGroupId[] = [
        'football-adults/general',
        'football-adults/first-team',
        'football-adults/second-team',
        'football-adults/ah-team',
    ];

    public readonly reportGroupId: ReportGroupId = 'football-youth/general';

    public readonly contactData: ContactItem[] = websiteConfig.contact['football-adults'];

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {
        this.titleService.setTitle('Herrenfußball');
    }
}
