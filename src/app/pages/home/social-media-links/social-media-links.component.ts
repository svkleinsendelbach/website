import { Component, Input } from '@angular/core';
import { AppearanceService } from '../../../services/appearance.service';
import { DeviceTypeService } from '../../../services/device-type.service';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'src/app/types/link';
import { StyleConfigService } from '../../../services/style-config.service';

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

export namespace SocialMediaItem {
    export function trackById(_index: number, item: SocialMediaItem): string {
        return item.id;
    }
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

    public SocialMediaItem = SocialMediaItem;

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

    public trackByIdentity<T>(_index: number, value: T): T {
        return value;
    }
}
