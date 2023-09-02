import { Component } from '@angular/core';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { InternalLink } from 'src/app/types/internal-path';
import { LinkData } from 'src/app/modules/general-components/types/link-data';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';
import { websiteConfig } from 'src/app/config/website-config';

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
    public readonly managers = websiteConfig.managers;

    public readonly links: LinkData[] = [
        {
            id: 'sportshome',
            link: InternalLink.all.sportheim,
            subtitle: 'Öffungszeiten des Sportheims in Kleinsendelbach',
            title: 'Sportheim'
        },
        {
            id: 'chronicle',
            link: InternalLink.all.chroniken,
            subtitle: 'Chronik des Sportverein Kleinsendelbach',
            title: 'Chronik'
        },
        {
            id: 'statute',
            link: InternalLink.all.satzung,
            subtitle: 'Satzung des SV Kleinsendelbach e.V.',
            title: 'Satzung'
        },
        {
            id: 'privacy',
            link: InternalLink.all.datenschutz,
            subtitle: 'Datenschutzerklärung des Sportverein Kleinsendelbach',
            title: 'Datenschutz'
        },
        {
            id: 'request',
            link: InternalLink.all.mitgliedsantrag,
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
