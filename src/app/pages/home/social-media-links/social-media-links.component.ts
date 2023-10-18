import { Component, Input } from '@angular/core';
import { AppearanceService } from '../../../services/appearance.service';
import { DeviceTypeService } from '../../../services/device-type.service';
import { Link } from 'src/app/types/link';
import { StyleConfigService } from '../../../services/style-config.service';
import { TrackBy } from 'src/app/types/track-by';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface SocialMediaItem {
    id: string;
    title: string;
    name: string;
    link: Link;
    image: IconProp | {
        lightModeSource: string;
        darkModeSource: string;
    };
}

export interface SocialMediaData {
    desktop: SocialMediaItem[][];
    tablet: SocialMediaItem[][];
    mobile: SocialMediaItem[][];
}

@Component({
    selector: 'app-social-media-links',
    styleUrls: ['./social-media-links.component.sass'],
    templateUrl: './social-media-links.component.html'
})
export class SocialMediaLinksComponent {
    @Input() public socialMediaData!: SocialMediaData;

    public TrackBy = TrackBy;

    public constructor(
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        public readonly appearance: AppearanceService
    ) {}

    public get socialMediaItems(): SocialMediaItem[][] {
        return this.socialMediaData[this.deviceType.current];
    }

    public isIcon(image: IconProp | {
        lightModeSource: string;
        darkModeSource: string;
    }): image is IconProp {
        return !(typeof image === 'object' && 'lightModeSource' in image);
    }
}
