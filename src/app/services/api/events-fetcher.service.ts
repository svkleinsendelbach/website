import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { lastValueFrom } from 'rxjs';

export type EventGroupId =
  | 'general'
  | 'football-adults/general'
  | 'football-adults/first-team'
  | 'football-adults/second-team'
  | 'football-adults/ah-team'
  | 'football-youth/general'
  | 'football-youth/c-youth'
  | 'football-youth/e-youth'
  | 'football-youth/f-youth'
  | 'football-youth/g-youth'
  | 'gymnastics'
  | 'dancing';

export type GroupedEventGroupId =
  | 'general'
  | 'football-adults'
  | 'football-youth';

export namespace EventGroupId {
  export const all: EventGroupId[] = [
    'general',
    'football-adults/general',
    'football-adults/first-team',
    'football-adults/second-team',
    'football-adults/ah-team',
    'football-youth/general',
    'football-youth/c-youth',
    'football-youth/e-youth',
    'football-youth/f-youth',
    'football-youth/g-youth',
    'gymnastics',
    'dancing',
  ];

  export function description(id: EventGroupId): string {
    switch (id) {
      case 'general':
        return 'Allgemeines';
      case 'football-adults/general':
        return 'Herrenfußball';
      case 'football-adults/first-team':
        return '1. Mannschaft';
      case 'football-adults/second-team':
        return '2. Mannschaft';
      case 'football-adults/ah-team':
        return 'Alte Herren';
      case 'football-youth/general':
        return 'Jugendfußball';
      case 'football-youth/c-youth':
        return 'C-Jugend';
      case 'football-youth/e-youth':
        return 'E-Jugend';
      case 'football-youth/f-youth':
        return 'F-Jugend';
      case 'football-youth/g-youth':
        return 'G-Jugend';
      case 'gymnastics':
        return 'Gymnastik';
      case 'dancing':
        return 'Tanzen';
    }
  }
}

export namespace GroupedEventGroupId {
  export const all: { groupedId: GroupedEventGroupId; groupIds: EventGroupId[] }[] = [
    {
      groupedId: 'general',
      groupIds: [
        'general',
        'gymnastics',
        'dancing'
      ]
    },
    {
      groupedId: 'football-adults',
      groupIds: [
        'football-adults/general',
        'football-adults/first-team',
        'football-adults/second-team',
        'football-adults/ah-team',
      ],
    },
    {
      groupedId: 'football-youth',
      groupIds: [
        'football-youth/general',
        'football-youth/c-youth',
        'football-youth/e-youth',
        'football-youth/f-youth',
        'football-youth/g-youth',
      ],
    },
  ];

  export function description(id: GroupedEventGroupId): string {
    switch (id) {
      case 'general':
        return 'Allgemeines';
      case 'football-adults':
        return 'Herrenfußball';
      case 'football-youth':
        return 'Jugendfußball';
    }
  }
}

export interface Event {
  id: string;
  date: string;
  title: string;
  subtitle?: string;
  link?: string;
}

@Injectable({
  providedIn: 'root',
})
export class EventsFetcherService {
  constructor(private fns: AngularFireFunctions) {}

  getEvents(groupIds: EventGroupId[]): Promise<{ groupId: EventGroupId; events: Event[] }[]> {
    const callable = this.fns.httpsCallable('getEvents');
    return lastValueFrom(callable({ groupIds }));
  }
}
