import { Component } from '@angular/core';
import { DeviceType, DeviceTypeService } from 'src/app/services/device-type.service';
import { InternalLinkPath, internalLinks } from 'src/app/types/internal-link-path';
import { Link } from 'src/app/types/link';
import { HeaderItem } from '../../types/header-item';

type AllPathes = InternalLinkPath | 'fussball/jugend/a-jugend' | 'fussball/jugend/b-jugend' | 'fussball/jugend/d-jugend' | 'onlineshop';

@Component({
    selector: 'header',
    styleUrls: ['./header.component.sass'],
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    private readonly headerItemLink: Record<AllPathes, Link> = {
        ...internalLinks,
        'fussball/jugend/a-jugend': Link.external('A-Jugend (SV Hetzles)', 'http://sv-hetzles.de/index.php/a-junioren'),
        'fussball/jugend/b-jugend': Link.external('B-Jugend (SV Hetzles)', 'http://sv-hetzles.de/index.php/b-junioren-u17'),
        'fussball/jugend/d-jugend': Link.external('D-Jugend (TSV Neunk. a. B.)', 'http://www.tsv-neunkirchen-am-brand.de/fu/junioren'),
        'onlineshop': Link.external('Onlineshop', 'https://sv-kleinsendelbach.fan12.de')
    };

    private readonly headerDataConfig: Record<DeviceType, {
        topItem: AllPathes;
        subItems?: (AllPathes)[];
    }[]> = {
            desktop: [
                { topItem: 'home' },
                {
                    topItem: 'über-uns',
                    subItems: ['über-uns', 'sportheim', 'onlineshop', 'chroniken', 'satzung', 'sponsoren', 'förderverein', 'datenschutz', 'mitgliedsantrag']
                },
                {
                    topItem: 'fussball/herren',
                    subItems: ['fussball/herren', 'fussball/herren/erste-mannschaft', 'fussball/herren/zweite-mannschaft', 'fussball/herren/alte-herren']
                },
                {
                    topItem: 'fussball/jugend',
                    subItems: ['fussball/jugend', 'fussball/jugend/a-jugend', 'fussball/jugend/b-jugend', 'fussball/jugend/c-jugend', 'fussball/jugend/d-jugend', 'fussball/jugend/e-jugend', 'fussball/jugend/f-jugend', 'fussball/jugend/g-jugend']
                },
                { topItem: 'gymnastik' },
                { topItem: 'tanzen' },
                { topItem: 'anfahrt' },
                { topItem: 'kontakt' }
            ],
            tablet: [
                {
                    topItem: 'home',
                    subItems: ['home', 'anfahrt', 'kontakt']
                },
                {
                    topItem: 'über-uns',
                    subItems: ['über-uns', 'sportheim', 'onlineshop', 'chroniken', 'satzung', 'sponsoren', 'förderverein', 'datenschutz', 'mitgliedsantrag']
                },
                {
                    topItem: 'fussball/herren',
                    subItems: ['fussball/herren', 'fussball/herren/erste-mannschaft', 'fussball/herren/zweite-mannschaft', 'fussball/herren/alte-herren']
                },
                {
                    topItem: 'fussball/jugend',
                    subItems: ['fussball/jugend', 'fussball/jugend/a-jugend', 'fussball/jugend/b-jugend', 'fussball/jugend/c-jugend', 'fussball/jugend/d-jugend', 'fussball/jugend/e-jugend', 'fussball/jugend/f-jugend', 'fussball/jugend/g-jugend']
                },
                {
                    topItem: 'gymnastik',
                    subItems: ['gymnastik', 'tanzen']
                }
            ],
            mobile: [
                {
                    topItem: 'home',
                    subItems: ['home', 'anfahrt', 'kontakt']
                },
                {
                    topItem: 'über-uns',
                    subItems: ['über-uns', 'sportheim', 'onlineshop', 'chroniken', 'satzung', 'sponsoren', 'förderverein', 'datenschutz', 'mitgliedsantrag']
                },
                {
                    topItem: 'fussball/herren',
                    subItems: ['fussball/herren', 'fussball/herren/erste-mannschaft', 'fussball/herren/zweite-mannschaft', 'fussball/herren/alte-herren']
                },
                {
                    topItem: 'fussball/jugend',
                    subItems: ['fussball/jugend', 'fussball/jugend/a-jugend', 'fussball/jugend/b-jugend', 'fussball/jugend/c-jugend', 'fussball/jugend/d-jugend', 'fussball/jugend/e-jugend', 'fussball/jugend/f-jugend', 'fussball/jugend/g-jugend']
                },
                {
                    topItem: 'gymnastik',
                    subItems: ['gymnastik', 'tanzen']
                }
            ]
        };

    public constructor(
        public readonly deviceType: DeviceTypeService
    ) {}

    public get headerData(): HeaderItem[] {
        return this.headerDataConfig[this.deviceType.current].map(config => ({
            id: config.topItem,
            topItem: this.headerItemLink[config.topItem],
            subItems: config.subItems
                ? config.subItems.map(subConfig => ({
                    id: subConfig,
                    link: this.headerItemLink[subConfig]
                }))
                : null
        }));
    }
}
