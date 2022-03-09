import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import headerItemsData from 'src/app/assets/header-items-data.json';
import { JsonDecodingError } from 'src/app/utils/jsonDecodingError';
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
export class HeaderComponent implements OnInit, OnDestroy {
  public headerItemsList: HeaderItem[];

  constructor(public deviceType: DeviceTypeService) {
    this.headerItemsList = this.getHeaderItemsList();
  }

  @HostListener('window:resize')
  onResize() {
    this.deviceType.windowResized();
  }

  ngOnInit(): void {
    this.deviceType.addListener('header-items', _newValue => {
      this.headerItemsList = this.getHeaderItemsList();
    });
  }

  ngOnDestroy(): void {
    this.deviceType.removeListener('header-items');
  }

  private getHeaderItemValue(key: string): HeaderItemValue {
    if (!headerItemsData['header-items'].hasOwnProperty(key)) {
      throw new JsonDecodingError(`Invalid header item key: ${key}`);
    }
    const headerItem = headerItemsData['header-items'][key as keyof typeof headerItemsData['header-items']];
    return {
      name: headerItem['displayed-name'],
      link: headerItem.link,
    };
  }

  private getHeaderItemsList(): HeaderItem[] {
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
