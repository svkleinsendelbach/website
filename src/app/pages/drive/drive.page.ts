import { Component } from '@angular/core';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { websiteConfig } from 'src/app/config/website-config';

@Component({
    selector: 'pages-drive',
    styleUrls: ['./drive.page.sass'],
    templateUrl: './drive.page.html'
})
export class DrivePage {
    public faPhone = faPhone;

    public readonly mapOptions: google.maps.MapOptions & { center: google.maps.LatLngLiteral } = {
        ...websiteConfig.mapOptions,
        center: websiteConfig.coordinates.sportshome
    };

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {
        this.titleService.setTitle('Anfahrt');
    }
}
