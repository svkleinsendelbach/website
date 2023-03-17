import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { InternalLink } from 'src/app/types/InternalPath';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.sass']
})
export class AllNewsComponent {
  public allInternalLinks = InternalLink.all;

  public constructor(
    public readonly titleService: Title,
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService
  ) {
    this.titleService.setTitle('Aktuelle Nachrichten');
  }
}
