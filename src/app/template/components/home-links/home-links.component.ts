import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'src/app/types/link';
import { DeviceTypeService } from '../../../services/device-type.service';
import { StyleConfigService } from '../../../services/style-config.service';

@Component({
    selector: 'app-home-links',
    templateUrl: './home-links.component.html',
    styleUrls: ['./home-links.component.sass']
})
export class HomeLinksComponent {
  @Input() public linkDataForDeviceType!: HomeLinksComponent.LinkDataForDeviceType;

  public constructor(
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService
  ) {}

  public get linkData(): HomeLinksComponent.LinkItem[][] {
      return this.linkDataForDeviceType[this.deviceType.current];
  }
}

export namespace HomeLinksComponent {
  export interface LinkItem {
    name: string;
    link: Link;
    description: string;
    icon: IconDefinition;
    animation: 'rotation' | 'jump' | 'shake';
  }

  export interface LinkDataForDeviceType {
    desktop: LinkItem[][];
    tablet: LinkItem[][];
    mobile: LinkItem[][];
  }
}
