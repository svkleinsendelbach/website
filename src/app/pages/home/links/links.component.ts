import { Component, HostListener } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import homeLinks from 'src/app/assets/home-links.json';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { faInfo, faUserFriends, faChild, faAddressCard, IconName, IconPrefix } from '@fortawesome/free-solid-svg-icons';
import { faFutbol, faMap } from '@fortawesome/free-regular-svg-icons';
import { JsonDecodingError } from 'src/app/utils/jsonDecodingError';

export interface LinkItem {
  name: string;
  linkUrl: string;
  description: string;
  icon: {
    prefix: IconPrefix;
    name: IconName;
  };
  animation: string;
}

@Component({
  selector: 'app-home-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.sass'],
})
export class LinksComponent {
  public linkItemsList: (LinkItem & { id: string })[][];

  constructor(public deviceType: DeviceTypeService, private library: FaIconLibrary) {
    this.library.addIcons(faInfo, faFutbol, faUserFriends, faChild, faMap, faAddressCard);
    this.linkItemsList = this.getLinkItemsList();
  }

  private getLinkItemValue(key: string): LinkItem {
    if (!homeLinks['link-items'].hasOwnProperty(key)) {
      throw new JsonDecodingError(`Invalid link item key: ${key}`);
    }
    return homeLinks['link-items'][key as keyof typeof homeLinks['link-items']] as LinkItem;
  }

  private getLinkItemsList(): (LinkItem & { id: string })[][] {
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
