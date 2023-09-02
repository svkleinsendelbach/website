import { Component, Input, OnInit } from '@angular/core';
import { Event, EventGroup, EventGroupId } from 'src/app/modules/firebase-api/types/event';
import { DeviceTypeService } from '../../../../services/device-type.service';
import { FetchState } from 'src/app/types/fetch-state';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { StyleConfigService } from '../../../../services/style-config.service';
import { UtcDate } from 'src/app/types/utc-date';
import ical from 'ical-generator';

@Component({
    selector: 'events',
    styleUrls: ['./events.component.sass'],
    templateUrl: './events.component.html'
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
        this.firebaseApiService.function('event').function('get')
            .call({
                groupIds: this.groupIds
            })
            .then(eventGroups => {
                this.fetchedEventGroups = FetchState.success(eventGroups.map(eventGroup => ({
                    events: eventGroup.events.map(event => Event.concrete(event)),
                    groupId: eventGroup.groupId
                })));
            })
            .catch(reason => {
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
            description: `Exportierter Kalender von der SV Kleinsendelbach Website für ${this.fetchedEventGroups.content.map(eventGroup => EventGroupId.title[eventGroup.groupId]).join(', ')}`,
            name: this.fetchedEventGroups.content.length === 1 ? EventGroupId.title[this.fetchedEventGroups.content[0].groupId] : 'SV Kleinsendelbach',
            timezone: 'Europe/Berlin'
        });
        for (const eventGroup of this.fetchedEventGroups.content) {
            for (const event of eventGroup.events) {
                calender.createEvent({
                    categories: [
                        {
                            name: eventGroup.groupId
                        }
                    ],
                    description: event.subtitle,
                    end: event.date.advanced({ hour: 1,
                        minute: 30 }).localized,
                    id: event.id.guidString,
                    start: event.date.localized,
                    summary: event.title,
                    timezone: 'Europe/Berlin',
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
