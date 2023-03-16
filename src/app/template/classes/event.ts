import { guid } from './guid';

export type Event = {
    id: guid;
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

    export function unflatten(event: Event.Flatten): Event;
    export function unflatten(event: Omit<Event.Flatten, 'id'>): Omit<Event, 'id'>;
    export function unflatten(event: Event.Flatten | Omit<Event.Flatten, 'id'>): Event | Omit<Event, 'id'> {
      return {
          ...('id' in event ? { id: new guid(event.id) } : {}),
          date: new Date(event.date),
          title: event.title,
          subtitle: event.subtitle,
          link: event.link
      };
    }
}

export type EventGroup<GroupId> = {
    groupId: GroupId;
    events: Event[];
};

export namespace EventGroup {
    export type Flatten<GroupId> = {
        groupId: GroupId;
        events: Event.Flatten[];
    };
}
