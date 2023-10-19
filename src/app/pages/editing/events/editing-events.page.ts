import { Event, EventGroup, EventGroupId } from 'src/app/types/event';
import { Component } from '@angular/core';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { Guid } from 'src/app/types/guid';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';
import { TrackBy } from 'src/app/types/track-by';
import { internalLinks } from 'src/app/types/internal-link-path';

@Component({
    selector: 'pages-editing-events',
    styleUrls: ['./editing-events.page.sass'],
    templateUrl: './editing-events.page.html'
})
export class EditingEventsPage {
    public TrackBy = TrackBy;

    public Event = Event;

    public allEventGroupIds = EventGroupId.all;

    public eventGroupTitle = EventGroupId.title;

    public eventGroups: EventGroup[] | null = null;

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
        private readonly router: Router
    ) {
        this.titleService.setTitle('Termine bearbeiten');
    }

    public getEventGroupOf(groupId: EventGroupId): EventGroup | null {
        if (!this.eventGroups)
            return null;
        return this.eventGroups.find(eventGroup => eventGroup.groupId === groupId) ?? null;
    }

    public async deleteEvent(groupId: EventGroupId, eventId: Guid) {
        if (this.eventGroups) {
            this.eventGroups = this.eventGroups.flatMap(eventGroup => {
                if (eventGroup.groupId !== groupId)
                    return eventGroup;
                const events = eventGroup.events.filter(event => event.id.guidString !== eventId.guidString);
                if (events.length === 0)
                    return [];
                return {
                    events: events,
                    groupId: eventGroup.groupId
                };
            });
        }
        await this.firebaseApiService.function('event-edit').call({
            editType: 'remove',
            event: null,
            eventId: eventId.guidString,
            groupId: groupId,
            previousGroupId: null
        });
    }

    public async editEvent(groupId: EventGroupId, event: Event) {
        this.sharedData.setValue('editEvent', {
            event: Event.flatten(event),
            groupId: groupId
        });
        await this.router.navigateByUrl(internalLinks['bearbeiten/termine/bearbeiten'].link);
    }

    public async addNewEvent() {
        this.sharedData.removeValue('editEvent');
        await this.router.navigateByUrl(internalLinks['bearbeiten/termine/bearbeiten'].link);
    }

    public async getEvents() {
        this.eventGroups = (await this.firebaseApiService.function('event-get').call({
            groupIds: EventGroupId.all
        })).value;
    }
}
