import { Component, Input } from '@angular/core';
import { DeviceType, DeviceTypeService } from 'src/app/template/services/device-type.service';
import { HeaderData } from '../../types/HeaderData';
import { HomeLinkData } from '../../types/HomeLinkData';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  @Input() public headerData!: Record<DeviceType, HeaderData>;

  @Input() public homeLinkData!: HomeLinkData;

  public constructor(
    public readonly deviceType: DeviceTypeService
  ) {}
}
