import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { InternalLink, InternalPath } from 'src/app/types/internal-path';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { EventGroupId } from 'src/app/modules/firebase-api/types/event';
import { Link } from 'src/app/types/link';
import { ContactItem } from 'src/app/modules/general-components/types/contact-item';
import { LinkData } from 'src/app/modules/general-components/types/link-data';
import { ReportGroupId } from 'src/app/modules/firebase-api/types/report';
import { websiteConfig } from 'src/app/config/website-config';

@Component({
    selector: 'pages-football-youth-general',
    templateUrl: './football-youth-general.page.html',
    styleUrls: ['./football-youth-general.page.sass']
})
export class FootballYouthGeneralPage {
    public eventGroupTitle = EventGroupId.title;

    public readonly links: LinkData[] = [
        {
            id: 'a-jugend',
            link: Link.external('A-Jugend', 'http://sv-hetzles.de/index.php/a-junioren', true),
            title: 'A-Jugend',
            subtitle: 'A-Jugend der Jugend Spielgemeinschaft (zum SV Hetzles)'
        },
        {
            id: 'b-jugend',
            link: Link.external('B-Jugend', 'http://sv-hetzles.de/index.php/b-junioren-u17', true),
            title: 'B-Jugend',
            subtitle: 'B-Jugend der Jugend Spielgemeinschaft (zum SV Hetzles)'
        },
        {
            id: 'c-jugend',
            link: InternalLink.all['fussball/jugend/c-jugend'],
            title: 'C-Jugend',
            subtitle: 'C-Jugend der Jugend Spielgemeinschaft'
        },
        {
            id: 'd-jugend',
            link: Link.external('D-Jugend', 'http://www.tsv-neunkirchen-am-brand.de/fu/junioren', true),
            title: 'D-Jugend',
            subtitle: 'D-Jugend der Jugend Spielgemeinschaft (zum TSV Neunkirchen)'
        },
        {
            id: 'e-jugend',
            link: InternalLink.all['fussball/jugend/e-jugend'],
            title: 'E-Jugend',
            subtitle: 'E-Jugend des SV Kleinsendelbach'
        },
        {
            id: 'f-jugend',
            link: InternalLink.all['fussball/jugend/f-jugend'],
            title: 'F-Jugend',
            subtitle: 'F-Jugend des SV Kleinsendelbach'
        },
        {
            id: 'g-jugend',
            link: InternalLink.all['fussball/jugend/g-jugend'],
            title: 'G-Jugend',
            subtitle: 'G-Jugend des SV Kleinsendelbach'
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
