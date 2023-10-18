import { DeviceType, DeviceTypeService } from 'src/app/services/device-type.service';
import { Component } from '@angular/core';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';
import { TrackBy } from 'src/app/types/track-by';
import { websiteConfig } from 'src/app/config/website-config';

export interface OpeningHour {
    title: string;
    time: string;
}

export type Weekdays = 'friday' | 'monday' | 'saturday' | 'sunday' | 'thursday' | 'tuesday' | 'wednesday';

const weekdaysByDeviceType: Record<DeviceType, Weekdays[][]> = {
    desktop: [['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']],
    mobile: [['monday'], ['tuesday'], ['wednesday'], ['thursday'], ['friday'], ['saturday'], ['sunday']],
    tablet: [['monday', 'tuesday', 'wednesday', 'thursday'], ['friday', 'saturday', 'sunday']]
};

@Component({
    selector: 'pages-sportshome',
    styleUrls: ['./sportshome.page.sass'],
    templateUrl: './sportshome.page.html'
})
export class SportshomePage {
    public TrackBy = TrackBy;

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
