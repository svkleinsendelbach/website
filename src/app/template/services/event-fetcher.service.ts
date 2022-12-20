import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventFetcherService<GroupId extends string> {

  public constructor(
    private readonly firebaseFunctions: AngularFireFunctions
  ) {}

  public fetchEvents(groupIds:  GroupId[]): Promise<EventFetcherService.EventGroup<GroupId>[]> {
    const callable = this.firebaseFunctions.httpsCallable('getEvents')
    return lastValueFrom(callable({
      groupIds
    }))
  }
}

export namespace EventFetcherService {
  export interface Event {
    id: string,
    date: string,
    title: string,
    subtitle?: string,
    link?: string
  }

  export interface EventGroup<Id extends string> {
    groupId: Id,
    events: Event[]
  }
}
