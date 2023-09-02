import { Component, Input } from '@angular/core';
import { AppearanceService } from '../../../services/appearance.service';
import { DeviceTypeService } from '../../../services/device-type.service';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'src/app/types/link';
import { StyleConfigService } from '../../../services/style-config.service';

@Component({
    selector: 'app-social-media-links',
    styleUrls: ['./social-media-links.component.sass'],
    templateUrl: './social-media-links.component.html'
})
export class SocialMediaLinksComponent {
    @Input() public socialMediaData!: SocialMediaData;

    public hoveredItemId: string | null = null;

    public constructor(
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        public readonly appearance: AppearanceService
    ) {}

    public get socialMediaItems(): SocialMediaItem[][] {
        return this.socialMediaData[this.deviceType.current];
    }

    public isIcon(image: IconDefinition | {
        lightModeSource: string;
        darkModeSource: string;
    }): image is IconDefinition {
        return !('lightModeSource' in image);
    }

    public handleHoverStart(socialMediaLink: SocialMediaItem) {
        this.hoveredItemId = socialMediaLink.id;
    }

    public handleHoverStop(socialMediaLink: SocialMediaItem) {
        if (this.hoveredItemId === socialMediaLink.id)
            this.hoveredItemId = null;
    }
}

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

export interface SocialMediaData {
    desktop: SocialMediaItem[][];
    tablet: SocialMediaItem[][];
    mobile: SocialMediaItem[][];
}
