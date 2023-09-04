import { DeviceType, DeviceTypeService } from 'src/app/services/device-type.service';
import { Component } from '@angular/core';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { websiteConfig } from 'src/app/config/website-config';

export interface OpeningHour {
    title: string;
    time: string;
}

export namespace OpeningHour {
    export function trackByTitle(_index: number, openingHour: OpeningHour): string {
        return openingHour.title;
    }
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
    public OpeningHour = OpeningHour;

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

    public trackByIdentity<T>(_index: number, value: T): T {
        return value;
    }
}
