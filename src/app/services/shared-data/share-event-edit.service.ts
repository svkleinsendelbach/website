import { Injectable } from '@angular/core';
import { EventGroupId, Event } from '../api/events-fetcher.service';

@Injectable({
  providedIn: 'root',
})
export class ShareEventEditService {
  private _eventForEdit: { groupId: EventGroupId; event: Event } | undefined = undefined;

  constructor() {}

  public set event(event: { groupId: EventGroupId; event: Event } | undefined) {
    this._eventForEdit = event;
  }

  public get event(): { groupId: EventGroupId; event: Event } | undefined {
    const event = this._eventForEdit;
    this._eventForEdit = undefined;
    return event;
  }
}
