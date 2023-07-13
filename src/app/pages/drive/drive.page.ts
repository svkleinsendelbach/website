import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { websiteConfig } from 'src/app/config/website-config';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'pages-drive',
    templateUrl: './drive.page.html',
    styleUrls: ['./drive.page.sass']
})
export class DrivePage {
    public faPhone = faPhone;

    public readonly mapOptions: google.maps.MapOptions & { center: google.maps.LatLngLiteral } = {
        zoom: 16,
        center: websiteConfig.coordinates.sportshome,
        scrollwheel: false,
        maxZoom: 20,
        minZoom: 5
    };

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {
        this.titleService.setTitle('Anfahrt');
    }
}
