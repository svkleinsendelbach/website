import { Component, Input, OnInit } from '@angular/core';
import { DeviceTypeService } from '../../../../services/device-type.service';
import ical from 'ical-generator';
import { StyleConfigService } from '../../../../services/style-config.service';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { FetchState } from 'src/app/types/fetch-state';
import { Event, EventGroup, EventGroupId } from 'src/app/modules/firebase-api/types/event';
import { UtcDate } from 'src/app/types/utc-date';

@Component({
    selector: 'events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.sass']
})
export class EventsComponent implements OnInit {

    @Input() public groupIds!: EventGroupId[];

    public EventGroupId = EventGroupId;

    public fetchedEventGroups: FetchState<EventGroup[]> = FetchState.loading;

    public expandedGroupId: EventGroupId | null = null;

    public constructor(
        private readonly firebaseApiService: FirebaseApiService,
        public readonly styleConfig: StyleConfigService,
        public readonly deviceType: DeviceTypeService
    ) {}

    public ngOnInit() {
        this.firebaseApiService.function('event').function('get').call({
            groupIds: this.groupIds
        }).then(eventGroups => {
            this.fetchedEventGroups = FetchState.success(eventGroups.map(eventGroup => {
                return {
                    groupId: eventGroup.groupId,
                    events: eventGroup.events.map(event => Event.concrete(event))
                };
            }));
        }).catch(reason => {
            this.fetchedEventGroups = FetchState.failure(reason);
        });
    }

    public isRecent(event: Event): boolean {
        const referenceDate = UtcDate.now.advanced({ day: 3 });
        return event.date.compare(referenceDate) !== 'greater';
    }

    public expandGroup(id: EventGroupId) {
        this.expandedGroupId = id;
    }

    public collapseGroups() {
        this.expandedGroupId = null;
    }

    public events(eventGroup: EventGroup): Event[] {
        if (eventGroup.groupId === this.expandedGroupId)
            return eventGroup.events;
        return eventGroup.events.slice(0, 5);
    }

    public downloadCalendar() {
        if (!this.fetchedEventGroups.isSuccess())
            return;
        const calender = ical({
            name: this.fetchedEventGroups.content.length === 1 ? EventGroupId.title[this.fetchedEventGroups.content[0].groupId] : 'SV Kleinsendelbach',
            description: `Exportierter Kalender von der SV Kleinsendelbach Website für ${this.fetchedEventGroups.content.map(eventGroup => EventGroupId.title[eventGroup.groupId]).join(', ')}`,
            timezone: 'Europe/Berlin'
        });
        for (const eventGroup of this.fetchedEventGroups.content) {
            for (const event of eventGroup.events) {
                calender.createEvent({
                    id: event.id.guidString,
                    start: event.date.localized,
                    end: event.date.advanced({ hour: 1, minute: 30 }).localized,
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
        const downloadElement = document.createElement('a');
        downloadElement.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(calender.toString())}`);
        downloadElement.setAttribute('download', 'sv-kleinsendelbach-kalender.ics');
        downloadElement.click();
    }
}
