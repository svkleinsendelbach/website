import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { EventGroupId } from 'src/app/services/events-fetcher.service';
import { HeaderIntransparentService } from 'src/app/services/header-intransparent.service';

@Component({
  selector: 'app-ah-team',
  templateUrl: './ah-team.component.html',
  styleUrls: ['./ah-team.component.sass'],
})
export class AhTeamComponent {
  eventGroupIds: EventGroupId[] = ['football-adults/ah-team'];

  constructor(
    private headerIntransparentService: HeaderIntransparentService,
    private titleService: Title,
    public deviceType: DeviceTypeService,
  ) {
    this.headerIntransparentService.makeIntransparent();
    this.titleService.setTitle('Erste Mannschaft');
  }
}
