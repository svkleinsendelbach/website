import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'pages-sportshome',
    templateUrl: './sportshome.page.html',
    styleUrls: ['./sportshome.page.sass']
})
export class SportshomePage {
    public faPhone = faPhone;

    public readonly openingHoursByDeviceType: SportshomePage.OpeningHoursByDeviceType = {
        desktop: [
            [SportshomePage.allOpeningHours.monday, SportshomePage.allOpeningHours.tuesday, SportshomePage.allOpeningHours.wednesday, SportshomePage.allOpeningHours.thursday, SportshomePage.allOpeningHours.friday, SportshomePage.allOpeningHours.saturday, SportshomePage.allOpeningHours.sunday],
        ],
        tablet: [
            [SportshomePage.allOpeningHours.monday, SportshomePage.allOpeningHours.tuesday, SportshomePage.allOpeningHours.wednesday, SportshomePage.allOpeningHours.thursday],
            [SportshomePage.allOpeningHours.friday, SportshomePage.allOpeningHours.saturday, SportshomePage.allOpeningHours.sunday],
        ],
        mobile: [
            [SportshomePage.allOpeningHours.monday],
            [SportshomePage.allOpeningHours.tuesday],
            [SportshomePage.allOpeningHours.wednesday],
            [SportshomePage.allOpeningHours.thursday],
            [SportshomePage.allOpeningHours.friday],
            [SportshomePage.allOpeningHours.saturday],
            [SportshomePage.allOpeningHours.sunday],
        ],
    };

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {
        this.titleService.setTitle('Sportheim');
    }

    public get openingHours(): SportshomePage.OpeningHour[][] {
        return this.openingHoursByDeviceType[this.deviceType.current];
    }
}

export namespace SportshomePage {
    export interface OpeningHour {
        title: string;
        time: string;
    }

    export interface OpeningHoursByDeviceType {
        desktop: OpeningHour[][];
        tablet: OpeningHour[][];
        mobile: OpeningHour[][];
    }

    export const allOpeningHours = {
        monday: {
            title: 'Montag',
            time: 'geschlossen'
        },
        tuesday: {
            title: 'Dienstag',
            time: 'geschlossen'
        },
        wednesday: {
            title: 'Mittwoch',
            time: 'geschlossen'
        },
        thursday: {
            title: 'Donnerstag',
            time: 'geschlossen'
        },
        friday: {
            title: 'Freitag',
            time: '19 - 22 Uhr'
        },
        saturday: {
            title: 'Samstag',
            time: '18 - 21 Uhr'
        },
        sunday: {
            title: 'Sonntag',
            time: '9:30 – 12 Uhr und 17 – 20 Uhr, bei Heimspielen: 13:30 – 20 Uhr'
        }
    };
}
