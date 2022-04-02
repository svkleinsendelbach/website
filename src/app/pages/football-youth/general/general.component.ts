import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { EventGroupId } from 'src/app/services/api/events-fetcher.service';
import { HeaderIntransparentService } from 'src/app/services/header-intransparent.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.sass'],
})
export class GeneralComponent {
  eventGroupIds: EventGroupId[] = [
    'football-youth/general',
    'football-youth/c-youth',
    'football-youth/e-youth',
    'football-youth/f-youth',
    'football-youth/g-youth',
  ];

  constructor(
    private headerIntransparentService: HeaderIntransparentService,
    private titleService: Title,
    public deviceType: DeviceTypeService,
  ) {
    this.headerIntransparentService.makeIntransparent();
    this.titleService.setTitle('Jugendfußball');
  }
}
