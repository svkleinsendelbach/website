import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { EventGroupId } from 'src/app/services/api/events-fetcher.service';
import { HeaderIntransparentService } from 'src/app/services/header-intransparent.service';

@Component({
  selector: 'app-g-youth',
  templateUrl: './g-youth.component.html',
  styleUrls: ['./g-youth.component.sass'],
})
export class GYouthComponent {
  eventGroupIds: EventGroupId[] = ['football-youth/g-youth'];

  constructor(
    private headerIntransparentService: HeaderIntransparentService,
    private titleService: Title,
    public deviceType: DeviceTypeService,
  ) {
    this.headerIntransparentService.makeIntransparent();
    this.titleService.setTitle('G-Jugend');
  }
}
