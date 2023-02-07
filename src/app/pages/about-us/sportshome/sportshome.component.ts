import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';

@Component({
  selector: 'app-sportshome',
  templateUrl: './sportshome.component.html',
  styleUrls: ['./sportshome.component.sass']
})
export class SportshomeComponent {
  public faPhone = faPhone;

  public readonly openingHoursByDeviceType: SportshomeComponent.OpeningHoursByDeviceType = {
    desktop: [
      [SportshomeComponent.allOpeningHours.monday, SportshomeComponent.allOpeningHours.tuesday, SportshomeComponent.allOpeningHours.wednesday, SportshomeComponent.allOpeningHours.thursday, SportshomeComponent.allOpeningHours.friday, SportshomeComponent.allOpeningHours.saturday, SportshomeComponent.allOpeningHours.sunday],
    ],
    tablet: [
      [SportshomeComponent.allOpeningHours.monday, SportshomeComponent.allOpeningHours.tuesday, SportshomeComponent.allOpeningHours.wednesday, SportshomeComponent.allOpeningHours.thursday],
      [SportshomeComponent.allOpeningHours.friday, SportshomeComponent.allOpeningHours.saturday, SportshomeComponent.allOpeningHours.sunday],
    ],
    mobile: [
      [SportshomeComponent.allOpeningHours.monday],
      [SportshomeComponent.allOpeningHours.tuesday],
      [SportshomeComponent.allOpeningHours.wednesday],
      [SportshomeComponent.allOpeningHours.thursday],
      [SportshomeComponent.allOpeningHours.friday],
      [SportshomeComponent.allOpeningHours.saturday],
      [SportshomeComponent.allOpeningHours.sunday],
    ],
  };

  public constructor(
    public readonly titleService: Title,
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService
  ) {
    this.titleService.setTitle('Sportheim');
  }

  public get openingHours(): SportshomeComponent.OpeningHour[][] {
    return this.openingHoursByDeviceType[this.deviceType.className];
  }
}

export namespace SportshomeComponent {
  export interface OpeningHour {
    title: string,
    time: string
  }

  export interface OpeningHoursByDeviceType {
    desktop: OpeningHour[][],
    tablet: OpeningHour[][],
    mobile: OpeningHour[][]
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
