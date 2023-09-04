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

    public LinkData = LinkData;

    public constructor(
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {}
}
