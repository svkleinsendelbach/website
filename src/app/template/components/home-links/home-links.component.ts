import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Link } from '../../classes/link';
import { DeviceTypeService } from '../../services/device-type.service';
import { StyleConfigService } from '../../services/style-config.service';

@Component({
  selector: 'app-home-links',
  templateUrl: './home-links.component.html',
  styleUrls: ['./home-links.component.sass']
})
export class HomeLinksComponent<InternalPath extends string> {
  @Input() public linkDataForDeviceType!: HomeLinksComponent.LinkDataForDeviceType<InternalPath>;

  public constructor(
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService
  ) {}

  public get linkData(): HomeLinksComponent.LinkItem<InternalPath>[][] {
    return this.linkDataForDeviceType[this.deviceType.className];
  }
}

export namespace HomeLinksComponent {
  export interface LinkItem<InternalPath extends string> {
    name: string,
    link: Link<InternalPath>
    description: string,
    icon: IconDefinition,
    animation: 'rotation' | 'jump' | 'shake'
  }

  export interface LinkDataForDeviceType<InternalPath extends string> {
    desktop: LinkItem<InternalPath>[][],
    tablet: LinkItem<InternalPath>[][],
    mobile: LinkItem<InternalPath>[][]
  }
}
