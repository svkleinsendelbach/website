import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { HeaderIntransparentService } from 'src/app/services/header-intransparent.service';
import openingHours from 'src/app/assets/opening-hours-data.json';
import { JsonDecodingError } from 'src/app/utils/jsonDecodingError';

export interface OpeningHour {
  title: string;
  time: string;
}

@Component({
  selector: 'app-sports-home',
  templateUrl: './sports-home.component.html',
  styleUrls: ['./sports-home.component.sass'],
})
export class SportsHomeComponent {
  public openingHoursList: (OpeningHour & { id: string })[][];

  constructor(
    private headerIntransparentService: HeaderIntransparentService,
    private titleService: Title,
    public deviceType: DeviceTypeService,
  ) {
    this.headerIntransparentService.makeIntransparent();
    this.titleService.setTitle('Sportheim');
    this.openingHoursList = this.getOpeningHoursList();
  }

  private getOpeningHourItemValue(key: string): OpeningHour {
    if (!openingHours['opening-hours-items'].hasOwnProperty(key)) {
      throw new JsonDecodingError(`Invalid opening hours item key: ${key}`);
    }
    return openingHours['opening-hours-items'][key as keyof typeof openingHours['opening-hours-items']];
  }

  private getOpeningHoursList(): (OpeningHour & { id: string })[][] {
    return openingHours[this.deviceType.stringValue].map(e => {
      return e.map(f => {
        return {
          id: f,
          ...this.getOpeningHourItemValue(f),
        };
      });
    });
  }
}
