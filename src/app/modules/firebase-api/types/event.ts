import { Guid } from './guid';
import { UtcDate } from 'src/app/types/utc-date';

export type EventGroupId =
    'dancing' | 'football-adults/ah-team' | 'football-adults/first-team' | 'football-adults/general' | 'football-adults/second-team' | 'football-youth/c-youth' | 'football-youth/e-youth' | 'football-youth/f-youth' | 'football-youth/g-youth' | 'football-youth/general' | 'general' | 'gymnastics';

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
        'dancing': 'Tanzen',
        'football-adults/ah-team': 'Alte Herren',
        'football-adults/first-team': '1. Mannschaft',
        'football-adults/general': 'Herrenfußball',
        'football-adults/second-team': '2. Mannschaft',
        'football-youth/c-youth': 'C-Jugend',
        'football-youth/e-youth': 'E-Jugend',
        'football-youth/f-youth': 'F-Jugend',
        'football-youth/g-youth': 'G-Jugend',
        'football-youth/general': 'Jugendfußball',
        'general': 'Allgemeines',
        'gymnastics': 'Gymnastik'
    };

    export function encodeSelectedGroupIds(selection: EventGroupId[]): string {
        let selectionNumber = 0;
        for (const [index, groupId] of EventGroupId.all.map((v, i) => [i, v] as const)) {
            if (selection.includes(groupId))
                selectionNumber |= 0b1 << index;
        }
        return selectionNumber.toString(16).toUpperCase();
    }

    export interface Grouped {
        title: string;
        groupIds: EventGroupId[];
    }

    export const grouped: Grouped[] = [
        {
            groupIds: ['general', 'gymnastics', 'dancing'],
            title: 'Allgemeines'
        },
        {
            groupIds: ['football-adults/general', 'football-adults/first-team', 'football-adults/second-team', 'football-adults/ah-team'],
            title: 'Herrenfußball'
        },
        {
            groupIds: ['football-youth/general', 'football-youth/c-youth', 'football-youth/e-youth', 'football-youth/f-youth', 'football-youth/g-youth'],
            title: 'Jugendfußball'
        }
    ];
}

export interface Event {
    id: Guid;
    date: UtcDate;
    title: string;
    isImportant: boolean;
    subtitle: string | null;
    link: string | null;
}

export namespace Event {
    export interface Flatten {
        id: string;
        date: string;
        title: string;
        isImportant: boolean;
        subtitle: string | null;
        link: string | null;
    }

    export function flatten(event: Event): Event.Flatten;
    export function flatten(event: Omit<Event, 'id'>): Omit<Event.Flatten, 'id'>;
    export function flatten(event: Event | Omit<Event, 'id'>): Event.Flatten | Omit<Event.Flatten, 'id'> {
        return {
            ...'id' in event ? { id: event.id.guidString } : {},
            date: event.date.encoded,
            isImportant: event.isImportant,
            link: event.link,
            subtitle: event.subtitle,
            title: event.title
        };
    }

    export function concrete(event: Event.Flatten): Event;
    export function concrete(event: Omit<Event.Flatten, 'id'>): Omit<Event, 'id'>;
    export function concrete(event: Event.Flatten | Omit<Event.Flatten, 'id'>): Event | Omit<Event, 'id'> {
        return {
            ...'id' in event ? { id: new Guid(event.id) } : {},
            date: UtcDate.decode(event.date),
            isImportant: event.isImportant,
            link: event.link,
            subtitle: event.subtitle,
            title: event.title
        };
    }
}

export interface EventGroup {
    groupId: EventGroupId;
    events: Event[];
}

export namespace EventGroup {
    export interface Flatten {
        groupId: EventGroupId;
        events: Event.Flatten[];
    }
}
