import { Component, Input } from '@angular/core';
import { Link } from 'src/app/types/link';
import { DeviceTypeService } from '../../../services/device-type.service';
import { StyleConfigService } from '../../../services/style-config.service';

@Component({
    selector: 'app-links',
    templateUrl: './links.component.html',
    styleUrls: ['./links.component.sass']
})
export class LinksComponent {
  @Input() public links!: LinksComponent.LinkData[];

  public hoveredLink: string | null = null;

  public constructor(
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService
  ) {}

  public hoverLinkStart(link: string) {
      this.hoveredLink = link;
  }

  public hoverLinkStop(link: string) {
      if (this.hoveredLink === link) {
          this.hoveredLink = null;
      }
  }
}

export namespace LinksComponent {
  export interface LinkData {
    id: string;
    link: Link;
    title: string;
    subtitle: string;
  }
}
