import { Component, HostListener } from '@angular/core';
import homeLinks from 'src/app/assets/home-links.json';
import { DeviceTypeService } from 'src/app/services/device-type.service';

export interface LinkItem {
  name: string;
  linkUrl: string;
  description: string;
  iconName: string;
  animation: string;
}

@Component({
  selector: 'app-home-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.sass'],
})
export class LinksComponent {
  constructor(public deviceType: DeviceTypeService) {}

  @HostListener('window:resize')
  onResize() {
    this.deviceType.windowResized();
  }

  private getLinkItemValue(key: string): LinkItem {
    if (!homeLinks['link-items'].hasOwnProperty(key)) {
      throw new Error(`Invalid link item key: ${key}`);
    }
    return (homeLinks['link-items'] as any)[key];
  }

  public get linkItemsList(): (LinkItem & { id: string })[][] {
    return homeLinks[this.deviceType.stringValue].map(e => {
      return e.map(f => {
        return {
          id: f,
          ...this.getLinkItemValue(f),
        };
      });
    });
  }
}
