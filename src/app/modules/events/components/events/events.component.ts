import { Component, Input, OnInit } from '@angular/core';
import { DeviceTypeService } from '../../../../services/device-type.service';
import ical from 'ical-generator';
import { StyleConfigService } from '../../../../services/style-config.service';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { FetchState } from 'src/app/types/fetch-state';
import { EventGroup, EventGroupId } from 'src/app/modules/firebase-api/types/event';
import { Datum } from 'src/app/types/datum';

@Component({
    selector: 'events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.sass']
})
export class EventsComponent implements OnInit {
    public Datum = Datum;
    public EventGroupId = EventGroupId;

    @Input() public groupIds!: EventGroupId[];

    public fetchedEventGroups: FetchState<EventGroup.Flatten[]> = FetchState.loading;

    public constructor(
        private readonly firebaseApiService: FirebaseApiService,
        public readonly styleConfig: StyleConfigService,
        public readonly deviceType: DeviceTypeService
    ) {}

    public ngOnInit() {
        this.firebaseApiService.function('event').function('get').call({
            groupIds: this.groupIds
        }).then(eventGroups => {
            this.fetchedEventGroups = FetchState.success(eventGroups);
        }).catch(reason => {
            this.fetchedEventGroups = FetchState.failure(reason);
        });
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
        const downloadElement = document.createElement('a');
        downloadElement.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(calender.toString())}`);
        downloadElement.setAttribute('download', 'sv-kleinsendelbach-kalender.ics');
        downloadElement.click();
    }
}
