import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { HeaderIntransparentService } from 'src/app/services/header-intransparent.service';
import { EventGroupId } from '../../../services/api/events-fetcher.service';

@Component({
  selector: 'app-first-team',
  templateUrl: './first-team.component.html',
  styleUrls: ['./first-team.component.sass'],
})
export class FirstTeamComponent {
  eventGroupIds: EventGroupId[] = ['football-adults/first-team'];

  constructor(
    private headerIntransparentService: HeaderIntransparentService,
    private titleService: Title,
    public deviceType: DeviceTypeService,
  ) {
    this.headerIntransparentService.makeIntransparent();
    this.titleService.setTitle('Erste Mannschaft');
  }
}
