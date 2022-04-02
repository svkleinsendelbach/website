import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { EventGroupId } from 'src/app/services/api/events-fetcher.service';
import { HeaderIntransparentService } from 'src/app/services/header-intransparent.service';

@Component({
  selector: 'app-second-team',
  templateUrl: './second-team.component.html',
  styleUrls: ['./second-team.component.sass'],
})
export class SecondTeamComponent {
  eventGroupIds: EventGroupId[] = ['football-adults/second-team'];

  constructor(
    private headerIntransparentService: HeaderIntransparentService,
    private titleService: Title,
    public deviceType: DeviceTypeService,
  ) {
    this.headerIntransparentService.makeIntransparent();
    this.titleService.setTitle('Zweite Mannschaft');
  }
}
