import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { EventGroupId } from 'src/app/services/events-fetcher.service';
import { HeaderIntransparentService } from 'src/app/services/header-intransparent.service';
import gameResultsData from 'src/app/assets/game-results-data.json';

@Component({
  selector: 'app-c-youth',
  templateUrl: './c-youth.component.html',
  styleUrls: ['./c-youth.component.sass'],
})
export class CYouthComponent {
  eventGroupIds: EventGroupId[] = ['football-youth/c-youth'];

  results: {
    teamName: string;
    id: keyof typeof gameResultsData.pages;
  }[] = [
    {
      teamName: '1. Mannschaft',
      id: 'football-youth/c-youth-1',
    },
    {
      teamName: '2. Mannschaft',
      id: 'football-youth/c-youth-2',
    },
  ];

  constructor(
    private headerIntransparentService: HeaderIntransparentService,
    private titleService: Title,
    public deviceType: DeviceTypeService,
  ) {
    this.headerIntransparentService.makeIntransparent();
    this.titleService.setTitle('C-Jugend');
  }
}
