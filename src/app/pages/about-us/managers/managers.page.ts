import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { websiteConfig } from 'src/app/config/website-config';
import { LinkData } from 'src/app/modules/general-components/types/link-data';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { InternalLink } from 'src/app/types/internal-path';

export type Manager = {
    name: string;
    function: string;
    imageSrc: string | null;
};

@Component({
    selector: 'pages-managers',
    templateUrl: './managers.page.html',
    styleUrls: ['./managers.page.sass']
})
export class ManagersPage {

    public readonly managers = websiteConfig.managers;

    public readonly links: LinkData[] = [
        {
            id: 'sportshome',
            link: InternalLink.all['sportheim'],
            title: 'Sportheim',
            subtitle: 'Öffungszeiten des Sportheims in Kleinsendelbach'
        },
        {
            id: 'chronicle',
            link: InternalLink.all['chroniken'],
            title: 'Chronik',
            subtitle: 'Chronik des Sportverein Kleinsendelbach'
        },
        {
            id: 'statute',
            link: InternalLink.all['satzung'],
            title: 'Satzung',
            subtitle: 'Satzung des SV Kleinsendelbach e.V.'
        },
        {
            id: 'privacy',
            link: InternalLink.all['datenschutz'],
            title: 'Datenschutz',
            subtitle: 'Datenschutzerklärung des Sportverein Kleinsendelbach'
        },
        {
            id: 'request',
            link: InternalLink.all['mitgliedsantrag'],
            title: 'Mitgliedsantrag',
            subtitle: 'Jetzt Mitglied werden'
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
