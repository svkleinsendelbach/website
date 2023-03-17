import { Guid } from './guid';

export type EventGroupId =
    'general' |
    'football-adults/general' |
    'football-adults/first-team' |
    'football-adults/second-team' |
    'football-adults/ah-team' |
    'football-youth/general' |
    'football-youth/c-youth' |
    'football-youth/e-youth' |
    'football-youth/f-youth' |
    'football-youth/g-youth' |
    'gymnastics' |
    'dancing';

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
        'dancing'
    ];

    export const title: Record<EventGroupId, string> = {
        'general': 'Allgemeines',
        'football-adults/general': 'Herrenfußball',
        'football-adults/first-team': '1. Mannschaft',
        'football-adults/second-team': '2. Mannschaft',
        'football-adults/ah-team': 'Alte Herren',
        'football-youth/general': 'Jugendfußball',
        'football-youth/c-youth': 'C-Jugend',
        'football-youth/e-youth': 'E-Jugend',
        'football-youth/f-youth': 'F-Jugend',
        'football-youth/g-youth': 'G-Jugend',
        'gymnastics': 'Gymnastik',
        'dancing': 'Tanzen'
    };

    export interface Grouped {
      title: string;
      groupIds: EventGroupId[];
    }

    export const grouped: Grouped[] = [
        {
            title: 'Allgemeines',
            groupIds: ['general', 'gymnastics', 'dancing']
        },
        {
            title: 'Herrenfußball',
            groupIds: ['football-adults/general', 'football-adults/first-team', 'football-adults/second-team', 'football-adults/ah-team']
        },
        {
            title: 'Jugendfußball',
            groupIds: ['football-youth/general', 'football-youth/c-youth', 'football-youth/e-youth', 'football-youth/f-youth', 'football-youth/g-youth']
        }
    ];
}

export type Event = {
    id: Guid;
    date: Date;
    title: string;
    subtitle?: string;
    link?: string;
};

export namespace Event {
    export type Flatten = {
        id: string;
        date: string;
        title: string;
        subtitle?: string;
        link?: string;
    };

    export function flatten(event: Event): Event.Flatten;
    export function flatten(event: Omit<Event, 'id'>): Omit<Event.Flatten, 'id'>;
    export function flatten(event: Event | Omit<Event, 'id'>): Event.Flatten | Omit<Event.Flatten, 'id'> {
        return {
            ...('id' in event ? { id: event.id.guidString } : {}),
            date: event.date.toISOString(),
            title: event.title,
            subtitle: event.subtitle,
            link: event.link
        };
    }

    export function concrete(event: Event.Flatten): Event;
    export function concrete(event: Omit<Event.Flatten, 'id'>): Omit<Event, 'id'>;
    export function concrete(event: Event.Flatten | Omit<Event.Flatten, 'id'>): Event | Omit<Event, 'id'> {
        return {
            ...('id' in event ? { id: new Guid(event.id) } : {}),
            date: new Date(event.date),
            title: event.title,
            subtitle: event.subtitle,
            link: event.link
        };
    }
}

export type EventGroup = {
    groupId: EventGroupId;
    events: Event[];
};

export namespace EventGroup {
    export type Flatten = {
        groupId: EventGroupId;
        events: Event.Flatten[];
    };
}
