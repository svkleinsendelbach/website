import { Component, Input } from '@angular/core';
import { Link } from '../../classes/link';
import { Style } from '../../classes/style';
import { DeviceTypeService } from '../../services/device-type.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent<InternalPath extends string> {
  @Input() public headerDataForDeviceType!: HeaderComponent.HeaderDataForDeviceType<InternalPath>

  @Input() public homeLinkData!: HeaderComponent.HomeLinkData<InternalPath>

  @Input() public styleConfig!: HeaderComponent.StyleConfig

  public constructor(
    public readonly deviceType: DeviceTypeService
  ) {}
}

export namespace HeaderComponent {
  export interface HeaderItemLink<InternalPath extends string> {
    id: string,
    link: Link<InternalPath>
  }

  export interface HeaderItem<InternalPath extends string> {
    id: string,
    topItem: HeaderItemLink<InternalPath>,
    subItems?: HeaderItemLink<InternalPath>[]
  }

  export type HeaderData<InternalPath extends string> = HeaderItem<InternalPath>[]

  export interface HeaderDataForDeviceType<InternalPath extends string> {
    desktop: HeaderData<InternalPath>,
    tablet: HeaderData<InternalPath>,
    mobile: HeaderData<InternalPath>
  }

  export interface HomeLinkData<InternalPath extends string> {
    title: string,
    logoSrc: string,
    homeLink: Link<InternalPath>
  }

  export interface StyleConfig {
    backgroundColor: Style.AppearanceColor,
    backgroundColorHover: Style.AppearanceColor,
    primaryColor: Style.AppearanceColor,
    textColor: Style.AppearanceColor
  }
}
