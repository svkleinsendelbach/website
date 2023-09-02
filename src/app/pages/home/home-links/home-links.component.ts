import { Component, Input } from '@angular/core';
import { DeviceTypeService } from '../../../services/device-type.service';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'src/app/types/link';
import { StyleConfigService } from '../../../services/style-config.service';

@Component({
    selector: 'app-home-links',
    styleUrls: ['./home-links.component.sass'],
    templateUrl: './home-links.component.html'
})
export class HomeLinksComponent {
    @Input() public linkData!: LinkData;

    public constructor(
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {}

    public get links(): LinkItem[][] {
        return this.linkData[this.deviceType.current];
    }
}

export interface LinkItem {
    name: string;
    link: Link;
    description: string;
    icon: IconDefinition;
    animation: 'jump' | 'rotation' | 'shake';
}

export interface LinkData {
    desktop: LinkItem[][];
    tablet: LinkItem[][];
    mobile: LinkItem[][];
}
