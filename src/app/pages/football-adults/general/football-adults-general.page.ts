import { Component } from '@angular/core';
import { ContactItem } from 'src/app/modules/general-components/types/contact-item';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { EventGroupId } from 'src/app/types/event';
import { LinkData } from 'src/app/modules/general-components/types/link-data';
import { ReportGroupId } from 'src/app/types/report';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';
import { websiteConfig } from 'src/app/config/website-config';

@Component({
    selector: 'pages-football-adults-general',
    styleUrls: ['./football-adults-general.page.sass'],
    templateUrl: './football-adults-general.page.html'
})
export class FootballAdultsGeneralPage {
    public eventGroupTitle = EventGroupId.title;

    public readonly links: LinkData[] = [
        {
            id: 'first-team',
            link: 'fussball/herren/erste-mannschaft',
            subtitle: '1. Mannschaft der SG Kleinsendelbach / Hetzles',
            title: '1. Mannschaft'
        },
        {
            id: 'second-team',
            link: 'fussball/herren/zweite-mannschaft',
            subtitle: '2. Mannschaft der SG Kleinsendelbach / Hetzles',
            title: '2. Mannschaft'
        },
        {
            id: 'ah-team',
            link: 'fussball/herren/alte-herren',
            subtitle: 'Alte Herren des SV Kleinsendelbach',
            title: 'Alte Herren'
        }
    ];

    public readonly eventGroupIds: EventGroupId[] = [
        'football-adults/general',
        'football-adults/first-team',
        'football-adults/second-team',
        'football-adults/ah-team'
    ];

    public readonly reportGroupId: ReportGroupId = 'football-adults/general';

    public readonly contactData: ContactItem[] = websiteConfig.contact['football-adults'];

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {
        this.titleService.setTitle('Herrenfußball');
    }
}
