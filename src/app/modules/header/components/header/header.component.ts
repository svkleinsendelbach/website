import { Component, Input } from '@angular/core';
import { DeviceType, DeviceTypeService } from 'src/app/services/device-type.service';
import { HeaderItem } from '../../types/header-item';
import { HomeLinkData } from '../../types/home-link-data';

@Component({
    selector: 'header',
    styleUrls: ['./header.component.sass'],
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    @Input() public headerData!: Record<DeviceType, HeaderItem[]>;

    @Input() public homeLinkData!: HomeLinkData;

    public constructor(
        public readonly deviceType: DeviceTypeService
    ) {}
}
