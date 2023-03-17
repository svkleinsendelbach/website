import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { InternalLink } from 'src/app/types/InternalPath';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { Event, EventGroup, EventGroupId } from 'src/app/modules/firebase-api/types/event';

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

    public eventGroups: EventGroup.Flatten[] | undefined = undefined;

    public constructor(
    public readonly titleService: Title,
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService,
    private readonly firebaseApiService: FirebaseApiService,
    private readonly sharedData: SharedDataService<{
      editEvent: {
        groupId: EventGroupId;
        event: Event.Flatten;
      };
    }>,
    private router: Router
    ) {
        this.titleService.setTitle('Termine bearbeiten');
        this.getEvents();
    }

    private async getEvents() {
        this.eventGroups = await this.firebaseApiService.function('event').function('get').call({
            groupIds: EventGroupId.all
        });
    }

    public getEventGroupOf(groupId: EventGroupId): EventGroup.Flatten | undefined {
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
        await this.firebaseApiService.function('event').function('edit').call({
            editType: 'remove',
            groupId: groupId,
            eventId: eventId,
            event: undefined
        });
    }

    public async editEvent(groupId: EventGroupId, event: Event.Flatten) {
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
