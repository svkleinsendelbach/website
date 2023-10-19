import { Component, Input, OnInit } from '@angular/core';
import { Event, EventGroup, EventGroupId } from 'src/app/types/event';
import { DeviceTypeService } from '../../../../services/device-type.service';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { StyleConfigService } from '../../../../services/style-config.service';
import { TrackBy } from 'src/app/types/track-by';
import { UtcDate } from 'src/app/types/utc-date';
import { Result } from 'src/app/types/result';
import { mapRecord } from 'src/app/types/record-array';

@Component({
    selector: 'events',
    styleUrls: ['./events.component.sass'],
    templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit {
    @Input() public groupIds!: EventGroupId[];

    public TrackBy = TrackBy;

    public EventGroupId = EventGroupId;

    public fetchedEventGroups: Result<EventGroup[]> | null = null;

    public expandedGroupId: EventGroupId | null = null;

    public isCalendarSubscriptionSeletionShown = false;

    public calendarSubscriptionSelection: Record<EventGroupId, boolean>;

    public constructor(
        private readonly firebaseApiService: FirebaseApiService,
        public readonly styleConfig: StyleConfigService,
        public readonly deviceType: DeviceTypeService
    ) {
        this.calendarSubscriptionSelection = mapRecord(EventGroupId.title, () => false);
    }

    public get anyCalendarSubscriptionSelected(): boolean {
        return Object.values(this.calendarSubscriptionSelection).some(selected => selected);
    }

    public get calendarSubscriptionLink(): string {
        const selectedEventGroupIds = Object.entries(this.calendarSubscriptionSelection).flatMap(entry => entry[1] ? entry[0] as EventGroupId : []);
        return `webcal://europe-west1-svkleinsendelbach-website.cloudfunctions.net/debug-icsEvents?selection=${EventGroupId.encodeSelectedGroupIds(selectedEventGroupIds)}`;
    }

    public async ngOnInit() {
        for (const groupId of this.groupIds)
            this.calendarSubscriptionSelection[groupId] = true;
        this.fetchedEventGroups = await this.firebaseApiService.function('event-get').call({
            groupIds: this.groupIds
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

    public showCalendarSubscriptionSeletion() {
        this.isCalendarSubscriptionSeletionShown = true;
    }

    public hideCalendarSubscriptionSeletion() {
        this.isCalendarSubscriptionSeletionShown = false;
    }

    public selectEventGroupId(groupId: EventGroupId) {
        this.calendarSubscriptionSelection[groupId] = !this.calendarSubscriptionSelection[groupId];
    }
}
