import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { websiteConfig } from 'src/app/config/website-config';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';

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

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {
        this.titleService.setTitle('Vorstandschaft');
    }
}
