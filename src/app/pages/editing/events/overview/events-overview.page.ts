import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationBarData, AuthenticationService, FirebaseApiService, LinkService, SharedDataService, Event, Result, EventGroup, TextSectionComponent, NavigationBarComponent, AuthenticationCheckComponent, ButtonComponent, OverviewListComponent, OverviewListData, TrackBy, ResultDisplayComponent } from 'kleinsendelbach-website-library';
import { FirebaseFunctions } from '../../../../types/firebase-functions';
import { InternalPathKey } from '../../../../types/internal-paths';
import { UserRole } from '../../../../types/user-role';
import { EventGroupId } from '../../../../types/event-group-id';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'events-overview-page',
    standalone: true,
    imports: [CommonModule, TextSectionComponent, NavigationBarComponent, AuthenticationCheckComponent, ButtonComponent, OverviewListComponent, ResultDisplayComponent],
    templateUrl: './events-overview.page.html',
    styleUrl: './events-overview.page.sass'
})
export class EventsOverviewPage {

    public navigationBarData: NavigationBarData<InternalPathKey> = [
        {
            text: 'Zurück',
            alignment: 'left',
            link: 'editing/main',
            action: null
        },
        {
            text: 'Abmelden',
            alignment: 'right',
            link: 'editing/login',
            action: async () => void this.authenticationService.logout()
        }
    ];

    public eventGroupTitle = EventGroupId.title;

    public eventGroupsResult: Result<EventGroup<EventGroupId>[]> | null = null;

    public TrackBy = TrackBy;

    constructor(
        private readonly titleService: Title,
        private readonly authenticationService: AuthenticationService<UserRole>,
        private readonly firebaseApi: FirebaseApiService<FirebaseFunctions>,
        private readonly linkService: LinkService<InternalPathKey>,
        private readonly sharedData: SharedDataService<{
            editEvent: {
                event: Event.Flatten,
                groupId: EventGroupId
            }
        }>
    ) {
        this.titleService.setTitle('Termine');
    }

    public async getEvents() {
        this.eventGroupsResult = await this.firebaseApi.function('event-get').call({
            groupIds: EventGroupId.all
        });
    }

    public clearSharedData() {
        this.sharedData.removeValue('editEvent');
    }

    public eventOverviewListData(eventGroup: EventGroup<EventGroupId>): OverviewListData<InternalPathKey> {
        return eventGroup.events.map(event => ({
            title: `${event.title} | ${event.date.description}`,
            subtitle: event.subtitle,
            buttons: [
                {
                    title: 'Bearbeiten',
                    action: () => void this.editEvent(eventGroup.groupId, event),
                    link: null,
                    options: null
                },
                {
                    title: 'Löschen',
                    action: () => void this.deleteEvent(eventGroup.groupId, event),
                    link: null,
                    options: null
                }
            ]
        }));
    }

    public async deleteEvent(groupId: EventGroupId, event: Event) {
        if (!this.eventGroupsResult || this.eventGroupsResult.isFailure())
            return;
        this.eventGroupsResult = Result.success(this.eventGroupsResult.value.flatMap(eventGroup => {
            if (eventGroup.groupId !== groupId)
                return eventGroup;
            const events = eventGroup.events.filter(event => event.id.guidString !== event.id.guidString);
            if (events.length === 0)
                return [];
            return {
                events: events,
                groupId: eventGroup.groupId
            };
        }));
        await this.firebaseApi.function('event-edit').call({
            editType: 'remove',
            event: null,
            eventId: event.id.guidString,
            groupId: groupId,
            previousGroupId: null
        });
    }

    public async editEvent(groupId: EventGroupId, event: Event) {
        this.sharedData.setValue('editEvent', {
            event: Event.flatten(event),
            groupId: groupId
        });
        await this.linkService.navigate('editing/events/edit');
    }
}
