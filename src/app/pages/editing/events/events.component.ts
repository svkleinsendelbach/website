import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HeaderIntransparentService } from 'src/app/services/header-intransparent.service';
import { WebsiteEditorAuthService } from 'src/app/services/api/website-editor-auth.service';
import { EventsFetcherService, EventGroupId, Event } from '../../../services/api/events-fetcher.service';
import { DeviceTypeService } from '../../../services/device-type.service';
import { WebsiteEditingService } from '../../../services/api/website-editing.service';
import { ShareEventEditService } from '../../../services/shared-data/share-event-edit.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass'],
})
export class EventsComponent {
  public isStartupLoading: boolean = true;

  public allEvents:
    | {
        groupId: EventGroupId;
        events: Event[];
      }[]
    | undefined = undefined;

  constructor(
    private titleService: Title,
    private headerIntransparentService: HeaderIntransparentService,
    private authService: WebsiteEditorAuthService,
    private router: Router,
    private eventsFetcher: EventsFetcherService,
    public deviceType: DeviceTypeService,
    private websiteEditing: WebsiteEditingService,
    private shareEventEdit: ShareEventEditService,
  ) {
    this.titleService.setTitle('Termine Bearbeiten');
    this.headerIntransparentService.makeIntransparent();
    this.authService.isLoggedIn.then(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigateByUrl('/bearbeiten/anmelden').then(success => {
          if (!success) throw new Error("Couldn't navigate to url.");
        });
      } else {
        this.isStartupLoading = false;
      }
    });
    this.eventsFetcher.getEvents(EventGroupId.all).then(events => {
      this.allEvents = events;
    });
  }

  public groupDescription(groupId: EventGroupId): string {
    return EventGroupId.description(groupId);
  }

  public getEventsOf(groupId: EventGroupId): Event[] | undefined {
    return this.allEvents?.find(e => e.groupId === groupId)?.events;
  }

  public deleteEvent(groupId: EventGroupId, eventId: string) {
    this.allEvents = this.allEvents?.compactMap(eventGroup => {
      if (eventGroup.groupId !== groupId) return eventGroup;
      const events = eventGroup.events.filter(event => event.id !== eventId);
      if (events.length === 0) return undefined;
      return { groupId: eventGroup.groupId, events };
    });
    if (this.allEvents?.length === 0) this.allEvents = undefined;
    this.websiteEditing
      .editEvent({
        editType: 'remove',
        groupId,
        eventId,
      })
      .catch(console.error);
  }

  public editEvent(groupId: EventGroupId, event: Event) {
    this.shareEventEdit.event = { groupId, event };
    this.router.navigateByUrl('/bearbeiten/termine/termin-bearbeiten');
  }

  public addNewEvent() {
    this.shareEventEdit.event = undefined;
    this.router.navigateByUrl('/bearbeiten/termine/termin-bearbeiten');
  }
}
