import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { HeaderIntransparentService } from 'src/app/services/header-intransparent.service';
import { EventGroupId } from 'src/app/services/events-fetcher.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.sass'],
})
export class GeneralComponent {
  eventGroupIds: EventGroupId[] = [
    'football-adults/general',
    'football-adults/first-team',
    'football-adults/second-team',
    'football-adults/ah-team',
  ];

  constructor(
    private headerIntransparentService: HeaderIntransparentService,
    private titleService: Title,
    public deviceType: DeviceTypeService,
  ) {
    this.headerIntransparentService.makeIntransparent();
    this.titleService.setTitle('Herrenfußball');
  }
}
