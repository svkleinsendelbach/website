import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { HeaderIntransparentService } from 'src/app/services/header-intransparent.service';
import { EventGroupId } from '../../services/api/events-fetcher.service';
import { DarkModeService } from '../../services/dark-mode.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  public eventGroupIds: EventGroupId[] = [
    'general',
    'football-adults/general',
    'football-adults/first-team',
    'football-adults/second-team',
    'football-adults/ah-team',
    'football-youth/general',
    'football-youth/c-youth',
    'football-youth/e-youth',
    'football-youth/f-youth',
    'football-youth/g-youth',
    'gymnastics',
    'dancing'
  ];

  constructor(
    private headerIntransparentService: HeaderIntransparentService,
    private titleService: Title,
    public deviceType: DeviceTypeService,
    public darkMode: DarkModeService
  ) {
    this.headerIntransparentService.makeIntransparent();
    this.titleService.setTitle('SV Kleinsendelbach');
  }
}
