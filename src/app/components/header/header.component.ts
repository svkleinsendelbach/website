import { Component, HostListener } from '@angular/core';
import headerItemsData from 'src/app/assets/header-items-data.json';
import { DeviceTypeService } from '../../services/device-type.service';

type HeaderItemValue = {
  name: string;
  link: string;
};

export type HeaderItem = {
  id: string;
  topItem: HeaderItemValue;
  subItems?: HeaderItemValue[];
};

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  constructor(public deviceType: DeviceTypeService) {}

  @HostListener('window:resize')
  onResize() {
    this.deviceType.windowResized();
  }

  private getHeaderItemValue(key: string): HeaderItemValue {
    if (!headerItemsData['header-items'].hasOwnProperty(key)) {
      throw new Error(`Invalid header item key: ${key}`);
    }
    return {
      name: (headerItemsData['header-items'] as any)[key]['displayed-name'],
      link: (headerItemsData['header-items'] as any)[key].link,
    };
  }

  public get headerItemsList(): HeaderItem[] {
    return headerItemsData[this.deviceType.stringValue].map(e => {
      return {
        id: e['top-item'],
        topItem: this.getHeaderItemValue(e['top-item']),
        subItems: e['sub-items']?.map(f => {
          return this.getHeaderItemValue(f);
        }),
      };
    });
  }
}
