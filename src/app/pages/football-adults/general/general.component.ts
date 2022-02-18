import { Component, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { HeaderIntransparentService } from 'src/app/services/header-intransparent.service';
import { EventsFetcherService, ValidEventGroupId, Event } from 'src/app/services/events-fetcher.service';
import { FullDatum } from '../../../services/fetch-home-top.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.sass'],
})
export class GeneralComponent implements OnInit {
  public nextEvents?: { groupId: ValidEventGroupId; events: Event[] }[];

  constructor(
    private headerIntransparentService: HeaderIntransparentService,
    private titleService: Title,
    public deviceType: DeviceTypeService,
    private eventsFetcher: EventsFetcherService,
  ) {
    this.headerIntransparentService.makeIntransparent();
    this.titleService.setTitle('Herrenfußball');
  }

  @HostListener('window:resize')
  onResize() {
    this.deviceType.windowResized();
  }

  ngOnInit(): void {
    this.eventsFetcher
      .getEvents([
        'football-adults/general',
        'football-adults/first-team',
        'football-adults/second-team',
        'football-adults/ah-team',
      ])
      .then(d => {
        this.nextEvents = d;
      })
      .catch(e => {
        // TODO: handle error;
      });
  }

  groupDescription(groupId: ValidEventGroupId): string {
    return ValidEventGroupId.description(groupId);
  }

  dateDescription(date: string): string {
    return FullDatum.description(FullDatum.fromDate(new Date(date)));
  }
}
