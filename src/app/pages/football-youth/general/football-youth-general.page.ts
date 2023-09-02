import { Component } from '@angular/core';
import { ContactItem } from 'src/app/modules/general-components/types/contact-item';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { EventGroupId } from 'src/app/modules/firebase-api/types/event';
import { InternalLink } from 'src/app/types/internal-path';
import { Link } from 'src/app/types/link';
import { LinkData } from 'src/app/modules/general-components/types/link-data';
import { ReportGroupId } from 'src/app/modules/firebase-api/types/report';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';
import { websiteConfig } from 'src/app/config/website-config';

@Component({
    selector: 'pages-football-youth-general',
    styleUrls: ['./football-youth-general.page.sass'],
    templateUrl: './football-youth-general.page.html'
})
export class FootballYouthGeneralPage {
    public eventGroupTitle = EventGroupId.title;

    public readonly links: LinkData[] = [
        {
            id: 'a-jugend',
            link: Link.external('A-Jugend', 'http://sv-hetzles.de/index.php/a-junioren', true),
            subtitle: 'A-Jugend der Jugend Spielgemeinschaft (zum SV Hetzles)',
            title: 'A-Jugend'
        },
        {
            id: 'b-jugend',
            link: Link.external('B-Jugend', 'http://sv-hetzles.de/index.php/b-junioren-u17', true),
            subtitle: 'B-Jugend der Jugend Spielgemeinschaft (zum SV Hetzles)',
            title: 'B-Jugend'
        },
        {
            id: 'c-jugend',
            link: InternalLink.all['fussball/jugend/c-jugend'],
            subtitle: 'C-Jugend der Jugend Spielgemeinschaft',
            title: 'C-Jugend'
        },
        {
            id: 'd-jugend',
            link: Link.external('D-Jugend', 'http://www.tsv-neunkirchen-am-brand.de/fu/junioren', true),
            subtitle: 'D-Jugend der Jugend Spielgemeinschaft (zum TSV Neunkirchen)',
            title: 'D-Jugend'
        },
        {
            id: 'e-jugend',
            link: InternalLink.all['fussball/jugend/e-jugend'],
            subtitle: 'E-Jugend des SV Kleinsendelbach',
            title: 'E-Jugend'
        },
        {
            id: 'f-jugend',
            link: InternalLink.all['fussball/jugend/f-jugend'],
            subtitle: 'F-Jugend des SV Kleinsendelbach',
            title: 'F-Jugend'
        },
        {
            id: 'g-jugend',
            link: InternalLink.all['fussball/jugend/g-jugend'],
            subtitle: 'G-Jugend des SV Kleinsendelbach',
            title: 'G-Jugend'
        }
    ];

    public readonly eventGroupIds: EventGroupId[] = [
        'football-youth/general',
        'football-youth/c-youth',
        'football-youth/e-youth',
        'football-youth/f-youth',
        'football-youth/g-youth'
    ];

    public readonly reportGroupId: ReportGroupId = 'football-adults/general';

    public readonly contactData: ContactItem[] = websiteConfig.contact['football-youth'];

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {
        this.titleService.setTitle('Jugendfußball');
    }
}
