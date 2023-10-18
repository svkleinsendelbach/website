import { Component } from '@angular/core';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { LinkData } from 'src/app/modules/general-components/types/link-data';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';
import { TrackBy } from 'src/app/types/track-by';
import { websiteConfig } from 'src/app/config/website-config';
import { Link } from 'src/app/types/link';

export interface Manager {
    name: string;
    function: string;
    imageSrc: string | null;
}

@Component({
    selector: 'pages-managers',
    styleUrls: ['./managers.page.sass'],
    templateUrl: './managers.page.html'
})
export class ManagersPage {
    public TrackBy = TrackBy;

    public readonly managers = websiteConfig.managers;

    public readonly links: LinkData[] = [
        {
            id: 'sportshome',
            link: 'sportheim',
            subtitle: 'Öffungszeiten des Sportheims in Kleinsendelbach',
            title: 'Sportheim'
        },
        {
            id: 'onlineshop',
            link: Link.external('Onlineshop', 'https://sv-kleinsendelbach.fan12.de'),
            subtitle: 'Besuchen Sie unseren Onlineshop',
            title: 'Onlineshop'
        },
        {
            id: 'chronicle',
            link: 'chroniken',
            subtitle: 'Chronik des Sportverein Kleinsendelbach',
            title: 'Chronik'
        },
        {
            id: 'statute',
            link: 'satzung',
            subtitle: 'Satzung des SV Kleinsendelbach e.V.',
            title: 'Satzung'
        },
        {
            id: 'sponsors',
            link: 'sponsoren',
            subtitle: 'Die Sponsoren des SV Kleinsendelbach',
            title: 'Unsere Sponsoren'
        },
        {
            id: 'privacy',
            link: 'datenschutz',
            subtitle: 'Datenschutzerklärung des Sportverein Kleinsendelbach',
            title: 'Datenschutz'
        },
        {
            id: 'request',
            link: 'mitgliedsantrag',
            subtitle: 'Jetzt Mitglied werden',
            title: 'Mitgliedsantrag'
        }
    ];

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {
        this.titleService.setTitle('Vorstandschaft');
    }
}
