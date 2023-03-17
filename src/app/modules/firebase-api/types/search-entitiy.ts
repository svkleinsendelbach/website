import { type Event } from './event';
import { type News } from './news';
import { type Report } from './report';

export type SearchEntityType = 'events' | 'news' | 'reports';

export type SearchEntity<T extends SearchEntityType> = T extends 'events' ? Event : T extends 'news' ? News : T extends 'reports' ? Report : never;

export namespace SearchEntity {
    export type Flatten<T extends SearchEntityType> = T extends 'events' ? Event.Flatten : T extends 'news' ? News.Flatten : T extends 'reports' ? Report.Flatten : never;
}

export type TypedSearchEntity<T extends SearchEntityType> = {
    [Key in T]: {
        type: Key;
        value: SearchEntity<Key>;
    }
}[T];

export namespace TypedSearchEntity {
    export type Flatten<T extends SearchEntityType> = {
        [Key in T]: {
            type: Key;
            value: SearchEntity.Flatten<Key>;
        }
    }[T];
}
