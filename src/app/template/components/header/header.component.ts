import { Component, Input } from '@angular/core';
import { Link } from '../../classes/link';
import { DeviceTypeService } from '../../services/device-type.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  @Input() public headerData!: Record<'desktop' | 'tablet' | 'mobile', HeaderComponent.HeaderData>;

  @Input() public homeLinkData!: HeaderComponent.HomeLinkData;

  public constructor(
    public readonly deviceType: DeviceTypeService
  ) {}
}

export namespace HeaderComponent {
  export interface HeaderItem {
    topItem: Link,
    subItems?: Record<string, Link>
  }

  export type HeaderData = Record<string, HeaderItem>

  export interface HomeLinkData {
    title: string,
    logoSrc: string,
    homeLink: Link
  }
}
