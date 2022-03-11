import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { EventGroupId } from 'src/app/services/events-fetcher.service';
import { HeaderIntransparentService } from 'src/app/services/header-intransparent.service';

@Component({
  selector: 'app-f-youth',
  templateUrl: './f-youth.component.html',
  styleUrls: ['./f-youth.component.sass'],
})
export class FYouthComponent {
  eventGroupIds: EventGroupId[] = ['football-youth/f-youth'];

  constructor(
    private headerIntransparentService: HeaderIntransparentService,
    private titleService: Title,
    public deviceType: DeviceTypeService,
  ) {
    this.headerIntransparentService.makeIntransparent();
    this.titleService.setTitle('F-Jugend');
  }
}
