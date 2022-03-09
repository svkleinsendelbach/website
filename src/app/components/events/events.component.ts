import { Component, Input, OnInit } from '@angular/core';
import { FullDatum } from 'src/app/services/fetch-home-top.service';
import { EventsFetcherService, EventGroupId, Event } from '../../services/events-fetcher.service';
import { DeviceTypeService } from '../../services/device-type.service';

@Component({
  selector: 'app-component-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass'],
})
export class EventsComponent implements OnInit {
  public events?: { groupId: EventGroupId; events: Event[] }[];

  @Input() eventGroupIds!: EventGroupId[];

  constructor(
    public deviceType: DeviceTypeService,
    private eventsFetcher: EventsFetcherService
  ) { }

  ngOnInit(): void {
    this.fetchEvents().catch(console.error);
  }

  private async fetchEvents(): Promise<void> {
    this.events = await this.eventsFetcher.getEvents(this.eventGroupIds);
  }

  groupDescription(groupId: EventGroupId): string {
    return EventGroupId.description(groupId);
  }

  dateDescription(date: string): string {
    return FullDatum.description(FullDatum.fromDate(new Date(date)));
  }
}
