import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { InternalPath } from 'src/app/types/InternalPath';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { EventGroupId } from 'src/app/modules/firebase-api/types/event';
import { Link } from 'src/app/types/link';
import { ContactItem } from 'src/app/modules/general-components/types/contact-item';
import { LinkData } from 'src/app/modules/general-components/types/link-data';

@Component({
    selector: 'app-general',
    templateUrl: './general.component.html',
    styleUrls: ['./general.component.sass']
})
export class GeneralComponent {
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
            link: Link.internal<InternalPath>('C-Jugend', 'fussball/jugend/c-jugend'),
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
            link: Link.internal<InternalPath>('E-Jugend', 'fussball/jugend/e-jugend'),
            title: 'E-Jugend',
            subtitle: 'E-Jugend des SV Kleinsendelbach'
        },
        {
            id: 'f-jugend',
            link: Link.internal<InternalPath>('F-Jugend', 'fussball/jugend/f-jugend'),
            title: 'F-Jugend',
            subtitle: 'F-Jugend des SV Kleinsendelbach'
        },
        {
            id: 'g-jugend',
            link: Link.internal<InternalPath>('G-Jugend', 'fussball/jugend/g-jugend'),
            title: 'G-Jugend',
            subtitle: 'G-Jugend des SV Kleinsendelbach'
        }
    ];

    public readonly eventGroupIds: EventGroupId[] = [
        'football-youth/general',
        'football-youth/c-youth',
        'football-youth/e-youth',
        'football-youth/f-youth',
        'football-youth/g-youth',
    ];

    public readonly contactData: ContactItem[] = [
        {
            function: 'Jugendleiter Großfeld',
            name: 'Tim Kellermann',
            mobile: {
                number: '015112441784',
                text: '0151/ 12441784'
            },
            email: 'kellermann.tim@gmx.de'
        },
        {
            function: 'Jugendleiter Kleinfeld',
            name: 'Matthias Iberl',
            mobile: {
                number: '01606120508',
                text: '0160 / 6120508'
            }
        },
        {
            function: 'Jugendleiter Kleinfeld',
            name: 'Stefan Seubert',
            mobile: {
                number: '01712447114',
                text: '0171 / 2447114'
            }
        }
    ];

    public constructor(
    public readonly titleService: Title,
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService
    ) {
        this.titleService.setTitle('Jugendfußball');
    }
}
