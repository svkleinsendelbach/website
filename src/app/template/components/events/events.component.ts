import { Component, Input, OnInit } from '@angular/core';
import { FullDatum } from '../../classes/full-datum';
import { Style } from '../../classes/style';
import { AppearanceService } from '../../services/appearance.service';
import { DeviceTypeService } from '../../services/device-type.service';
import { EventFetcherService } from '../../services/event-fetcher.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass']
})
export class EventsComponent<GroupId extends string> implements OnInit {
  @Input() public groupIds!: GroupId[]

  @Input() public eventGroupDescription!: {
    [key in GroupId]: string
  }

  @Input() public styleConfig!: EventsComponent.StyleConfig

  public eventGroups?: EventFetcherService.EventGroup<GroupId>[]

  public constructor(
    private readonly eventFetcher: EventFetcherService<GroupId>,
    public readonly appearance: AppearanceService,
    public readonly deviceType: DeviceTypeService
  ) {}

  public ngOnInit() {
    this.eventFetcher.fetchEvents(this.groupIds)
      .then(eventGroups => {
        this.eventGroups = eventGroups
      })
      .catch(console.error)
  }

  public getDateDescription(date: string): string {
    return FullDatum.description(FullDatum.fromDate(new Date(date)))
  }
}

export namespace EventsComponent {
  export interface StyleConfig {
    primaryColor: Style.AppearanceColor,
    textColor: Style.AppearanceColor,
    secondaryTextColor: Style.AppearanceColor
  }
}
