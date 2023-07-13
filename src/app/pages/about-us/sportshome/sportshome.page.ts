import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { websiteConfig } from 'src/app/config/website-config';
import { DeviceType, DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';

export type OpeningHour = {
    title: string;
    time: string;
};

export type Weekdays = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

const weekdaysByDeviceType: Record<DeviceType, Weekdays[][]> = {
    desktop: [['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']],
    tablet: [['monday', 'tuesday', 'wednesday', 'thursday'], ['friday', 'saturday', 'sunday']],
    mobile: [['monday'], ['tuesday'], ['wednesday'], ['thursday'], ['friday'], ['saturday'], ['sunday']]
};

@Component({
    selector: 'pages-sportshome',
    templateUrl: './sportshome.page.html',
    styleUrls: ['./sportshome.page.sass']
})
export class SportshomePage {
    public faPhone = faPhone;

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {
        this.titleService.setTitle('Sportheim');
    }

    public get openingHours(): OpeningHour[][] {
        return weekdaysByDeviceType[this.deviceType.current].map(row => row.map(weekday => websiteConfig.openingHours[weekday]));
    }
}
