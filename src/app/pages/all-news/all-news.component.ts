import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { HeaderIntransparentService } from 'src/app/services/header-intransparent.service';

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.sass'],
})
export class AllNewsComponent {

  constructor(
    private headerIntransparentService: HeaderIntransparentService,
    private titleService: Title,
    public deviceType: DeviceTypeService,
  ) {
    this.headerIntransparentService.makeIntransparent();
    this.titleService.setTitle('Aktuelle Nachrichten');
  }
}
