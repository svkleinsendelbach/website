import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'src/app/types/link';
import { AppearanceService } from '../../services/appearance.service';
import { DeviceTypeService } from '../../services/device-type.service';
import { StyleConfigService } from '../../services/style-config.service';

@Component({
    selector: 'app-social-media-links',
    templateUrl: './social-media-links.component.html',
    styleUrls: ['./social-media-links.component.sass']
})
export class SocialMediaLinksComponent {
    public Appearance = AppearanceService.Appearance;

  @Input() public socialMediaDataForDeviceType!: SocialMediaLinksComponent.SocialMediaDataForDeviceType;

  public hoveredItemId: string | null = null;

  public constructor(
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService,
    public readonly appearance: AppearanceService
  ) {}

  public get socialMediaData(): SocialMediaLinksComponent.SocialMediaItem[][] {
      return this.socialMediaDataForDeviceType[this.deviceType.className];
  }

  public isIcon(image: IconDefinition | {
    lightModeSource: string;
    darkModeSource: string;
  }): image is IconDefinition {
      return !('lightModeSource' in image);
  }

  public handleHoverStart(socialMediaLink: SocialMediaLinksComponent.SocialMediaItem) {
      this.hoveredItemId = socialMediaLink.id;
  }

  public handleHoverStop(socialMediaLink: SocialMediaLinksComponent.SocialMediaItem) {
      if (this.hoveredItemId === socialMediaLink.id) {
          this.hoveredItemId = null;
      }
  }
}

export namespace SocialMediaLinksComponent {
  export interface SocialMediaItem {
    id: string;
    title: string;
    name: string;
    link: Link;
    image: IconDefinition | {
      lightModeSource: string;
      darkModeSource: string;
    };
  }

  export interface SocialMediaDataForDeviceType {
    desktop: SocialMediaItem[][];
    tablet: SocialMediaItem[][];
    mobile: SocialMediaItem[][];
  }
}
