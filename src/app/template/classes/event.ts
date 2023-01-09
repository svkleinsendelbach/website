import { guid } from './guid';

export interface Event {
  id: guid,
  date: Date,
  title: string,
  subtitle?: string,
  link?: string
}

export namespace Event {
    export type CallParameters = {
        date: string,
        title: string,
        subtitle?: string,
        link?: string
    }

    export interface ReturnType {
        id: string,
        date: string,
        title: string,
        subtitle?: string,
        link?: string
      }
}

export interface EventGroup<GroupId> {
    groupId: GroupId,
    events: Event.ReturnType[]
}
