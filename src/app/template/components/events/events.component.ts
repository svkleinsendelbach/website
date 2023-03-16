import { Component, Input, OnInit } from '@angular/core';
import { EventGroup } from '../../classes/event';
import { FetchState } from '../../classes/fetch-state';
import { FullDatum } from '../../classes/full-datum';
import { ApiService } from '../../services/api.service';
import { DeviceTypeService } from '../../services/device-type.service';
import ical from 'ical-generator';
import { StyleConfigService } from '../../services/style-config.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass']
})
export class EventsComponent<GroupId extends string> implements OnInit {
  public FetchState = FetchState;

  @Input() public groupIds!: GroupId[];

  @Input() public eventGroupTitle!: Record<GroupId, string>;

  public fetchedEventGroups: FetchState<EventGroup.Flatten<GroupId>[]> = FetchState.loading;

  public constructor(
    private readonly apiService: ApiService,
    public readonly styleConfig: StyleConfigService,
    public readonly deviceType: DeviceTypeService
  ) {}

  public ngOnInit() {
    this.apiService
      .eventGet({
        groupIds: this.groupIds
      })
      .then(eventGroups => {
        this.fetchedEventGroups = FetchState.success(eventGroups);
      })
      .catch(reason => {
        this.fetchedEventGroups = FetchState.failure(reason);
      });
  }

  public getDateDescription(date: string): string {
    return FullDatum.description(FullDatum.fromDate(new Date(date)));
  }

  public downloadCalendar() {
    if (!FetchState.isSuccess(this.fetchedEventGroups))
      return;
    const calender = ical({
      name: FetchState.getContent(this.fetchedEventGroups).length === 1 ? this.eventGroupTitle[FetchState.getContent(this.fetchedEventGroups)[0].groupId] : 'SV Kleinsendelbach',
      description: `Exportierted Kalender von der SV Kleinsendelbach Website für ${FetchState.getContent(this.fetchedEventGroups).map(eventGroup => this.eventGroupTitle[eventGroup.groupId]).join(', ')}`,
      timezone: 'Europe/Berlin'
    });
    for (const eventGroup of FetchState.getContent(this.fetchedEventGroups)) {
      for (const event of eventGroup.events) {
        calender.createEvent({
          id: event.id,
          start: new Date(event.date),
          end: new Date(new Date(event.date).getTime() + 5400000), // 1,5h
          timezone: 'Europe/Berlin',
          summary: event.title,
          description: event.subtitle,
          categories: [{
            name: eventGroup.groupId
          }],
          url: event.link
        });
      }
    }
    console.log(calender.toJSON());
    const downloadElement = document.createElement('a');
    downloadElement.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(calender.toString())}`);
    downloadElement.setAttribute('download', 'sv-kleinsendelbach-kalender.ics');
    downloadElement.click();
  }
}
