import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EventGroup } from 'src/app/template/classes/event';
import { GetEventsFunction } from 'src/app/template/services/api-functions-types';
import { ApiService } from 'src/app/template/services/api.service';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';
import { Event } from 'src/app/template/classes/event';
import { SharedDataService } from 'src/app/template/services/shared-data.service';
import { InternalLink } from 'src/app/classes/InternalPath';
import { EventGroupId } from 'src/app/classes/EventGroupId';

@Component({
  selector: 'app-editing-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass']
})
export class EventsComponent {
  public logInPageLink = InternalLink.all['bearbeiten/anmelden'];
  public mainEditingPageLink = InternalLink.all['bearbeiten'];
  public allEventGroupIds = EventGroupId.all;
  public eventGroupTitle = EventGroupId.title;

  public eventGroups: GetEventsFunction.ReturnType<EventGroupId> | undefined = undefined;

  public constructor(
    public readonly titleService: Title,
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService,
    private readonly apiService: ApiService,
    private readonly sharedData: SharedDataService<{
      editEvent: {
        groupId: EventGroupId,
        event: Event.ReturnType
      }
    }>,
    private router: Router
  ) {
    this.titleService.setTitle('Termine bearbeiten');
    this.getEvents();
  }

  private async getEvents() {
    this.eventGroups = await this.apiService.getEvents<EventGroupId>({
      groupIds: EventGroupId.all
    });
  }

  public getEventGroupOf(groupId: EventGroupId): EventGroup<EventGroupId> | undefined {
    return this.eventGroups?.find(eventGroup => eventGroup.groupId === groupId);
  }

  public async deleteEvent(groupId: EventGroupId, eventId: string) {
    this.eventGroups = this.eventGroups?.flatMap(eventGroup => {
      if (eventGroup.groupId !== groupId)
        return eventGroup;
      const events = eventGroup.events.filter(event => event.id !== eventId);
      if (events.length === 0)
        return [];
      return {
        groupId: eventGroup.groupId,
        events: events
      };
    });
    await this.apiService.editEvent({
      editType: 'remove',
      groupId: groupId,
      eventId: eventId,
      event: undefined
    });
  }

  public async editEvent(groupId: EventGroupId, event: Event.ReturnType) {
    this.sharedData.setValue('editEvent', {
      groupId: groupId,
      event: event
    });
    await this.router.navigateByUrl(InternalLink.all['bearbeiten/termine/bearbeiten'].link);
  }

  public async addNewEvent() {
    this.sharedData.removeValue('editEvent');
    await this.router.navigateByUrl(InternalLink.all['bearbeiten/termine/bearbeiten'].link);
  }
}
