import { Component, OnInit } from '@angular/core';
import headerItemsData from 'src/app/assets/header-items-data.json';
import { DeviceType } from 'src/app/classes/device-type';

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
export class HeaderComponent implements OnInit {
  public deviceType = new DeviceType();

  constructor() {}

  ngOnInit(): void {}

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
