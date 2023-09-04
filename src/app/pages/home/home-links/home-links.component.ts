import { Component, Input } from '@angular/core';
import { DeviceTypeService } from '../../../services/device-type.service';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'src/app/types/link';
import { StyleConfigService } from '../../../services/style-config.service';

export interface LinkItem {
    name: string;
    link: Link;
    description: string;
    icon: IconDefinition;
    animation: 'jump' | 'rotation' | 'shake';
}

export namespace LinkItem {
    export function trackByName(_index: number, item: LinkItem): string {
        return item.name;
    }
}

export interface LinkData {
    desktop: LinkItem[][];
    tablet: LinkItem[][];
    mobile: LinkItem[][];
}

@Component({
    selector: 'app-home-links',
    styleUrls: ['./home-links.component.sass'],
    templateUrl: './home-links.component.html'
})
export class HomeLinksComponent {
    @Input() public linkData!: LinkData;

    public LinkItem = LinkItem;

    public constructor(
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {}

    public get links(): LinkItem[][] {
        return this.linkData[this.deviceType.current];
    }

    public trackByIdentity<T>(_index: number, value: T): T {
        return value;
    }
}
