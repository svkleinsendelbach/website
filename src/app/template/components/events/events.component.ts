import { Component, Input, OnInit } from '@angular/core';
import { EventGroup } from '../../classes/event';
import { FetchState } from '../../classes/fetch-state';
import { FullDatum } from '../../classes/full-datum';
import { ApiService } from '../../services/api.service';
import { DeviceTypeService } from '../../services/device-type.service';

import { StyleConfigService } from '../../services/style-config.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass']
})
export class EventsComponent<GroupId extends string> implements OnInit {
  public FetchState = FetchState

  @Input() public groupIds!: GroupId[]

  @Input() public eventGroupDescription!: {
    [key in GroupId]: string
  }

  public fetchedEventGroups: FetchState<EventGroup<GroupId>[]> = FetchState.loading

  public constructor(
    private readonly apiService: ApiService,
    public readonly styleConfig: StyleConfigService,
    public readonly deviceType: DeviceTypeService
  ) {}

  public ngOnInit() {
    this.apiService
      .getEvents({
        groupIds: this.groupIds
      })
      .then(eventGroups => {
        this.fetchedEventGroups = FetchState.success(eventGroups)
      })
      .catch(reason => {
        this.fetchedEventGroups = FetchState.failure(reason)
      })
  }

  public getDateDescription(date: string): string {
    return FullDatum.description(FullDatum.fromDate(new Date(date)))
  }
}
