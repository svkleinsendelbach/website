import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.sass']
})
export class ManagersComponent {
  public constructor(
    public readonly titleService: Title,
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService
  ) {
    this.titleService.setTitle('Vorstandschaft')
  }
}
