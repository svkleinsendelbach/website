import { Component, Input } from '@angular/core';
import { DeviceTypeService } from '../../../../services/device-type.service';
import { LinkData } from '../../types/link-data';
import { StyleConfigService } from '../../../../services/style-config.service';

@Component({
    selector: 'links',
    styleUrls: ['./links.component.sass'],
    templateUrl: './links.component.html'
})
export class LinksComponent {
    @Input() public links!: LinkData[];

    public hoveredLink: string | null = null;

    public constructor(
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {}

    public hoverLinkStart(link: string) {
        this.hoveredLink = link;
    }

    public hoverLinkStop(link: string) {
        if (this.hoveredLink === link)
            this.hoveredLink = null;
    }
}
