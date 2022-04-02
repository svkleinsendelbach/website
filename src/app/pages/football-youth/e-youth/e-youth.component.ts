import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { EventGroupId } from 'src/app/services/api/events-fetcher.service';
import { HeaderIntransparentService } from 'src/app/services/header-intransparent.service';

@Component({
  selector: 'app-e-youth',
  templateUrl: './e-youth.component.html',
  styleUrls: ['./e-youth.component.sass'],
})
export class EYouthComponent {
  eventGroupIds: EventGroupId[] = ['football-youth/e-youth'];

  constructor(
    private headerIntransparentService: HeaderIntransparentService,
    private titleService: Title,
    public deviceType: DeviceTypeService,
  ) {
    this.headerIntransparentService.makeIntransparent();
    this.titleService.setTitle('E-Jugend');
  }
}
