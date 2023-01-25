import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { Link } from '../../classes/link';
import { AppearanceService } from '../../services/appearance.service';
import { DeviceTypeService } from '../../services/device-type.service';
import { StyleConfigService } from '../../services/style-config.service';

@Component({
  selector: 'app-social-media-links',
  templateUrl: './social-media-links.component.html',
  styleUrls: ['./social-media-links.component.sass']
})
export class SocialMediaLinksComponent<InternalPath extends string> {
  public Appearance = AppearanceService.Appearance;

  @Input() public socialMediaDataForDeviceType!: SocialMediaLinksComponent.SocialMediaDataForDeviceType<InternalPath>;

  public hoveredItemId: string | null = null;

  public constructor(
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService,
    public readonly appearance: AppearanceService
  ) {}

  public get socialMediaData(): SocialMediaLinksComponent.SocialMediaItem<InternalPath>[][] {
    return this.socialMediaDataForDeviceType[this.deviceType.className];
  }

  public isIcon(image: IconDefinition | {
    lightModeSource: string,
    darkModeSource: string
  }): image is IconDefinition {
    return !('lightModeSource' in image);
  }

  public handleHoverStart(socialMediaLink: SocialMediaLinksComponent.SocialMediaItem<InternalPath>) {
    this.hoveredItemId = socialMediaLink.id;
  }

  public handleHoverStop(socialMediaLink: SocialMediaLinksComponent.SocialMediaItem<InternalPath>) {
    if (this.hoveredItemId === socialMediaLink.id) {
      this.hoveredItemId = null;
    }
  }
}

export namespace SocialMediaLinksComponent {
  export interface SocialMediaItem<InternalPath extends string> {
    id: string,
    title: string,
    name: string,
    link: Link<InternalPath>
    image: IconDefinition | {
      lightModeSource: string,
      darkModeSource: string
    }
  }

  export interface SocialMediaDataForDeviceType<InternalPath extends string> {
    desktop: SocialMediaItem<InternalPath>[][],
    tablet: SocialMediaItem<InternalPath>[][],
    mobile: SocialMediaItem<InternalPath>[][]
  }
}
