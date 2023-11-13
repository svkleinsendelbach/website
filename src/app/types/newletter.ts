import { EventGroupId } from './event';
import { internalLinks } from './internal-link-path';
import { Link } from './link';
import { mapRecord, recordKeys } from './record-array';
import { UtcDate } from './utc-date';

export type Newsletter = {
    id: string;
    alreadyPublished: boolean;
    date: UtcDate;
    titlePage: {
        title: string;
        description: string;
        month: Newsletter.Month;
        year: number;
    };
    departments: {
        [Department in Newsletter.Department]: {
            title: string;
            description: string;
        }[] | null
    };
    events: {
        [GroupId in EventGroupId]: {
            date: UtcDate;
            title: string;
            subtitle: string | null;
        }[] | null;
    };
};

export namespace Newsletter {
    export type Month = 'january' | 'february' | 'march' | 'april' | 'may' | 'june' | 'july' | 'august' | 'september' | 'october' | 'november' | 'december';

    export namespace Month {
        export function fromNumber(month: number): Month | null {
            if (month <= 0 || month > 12)
                return null;
            return recordKeys(title)[month - 1];
        }

        export const title: Record<Month, string> = {
            january: 'Januar',
            february: 'Februar',
            march: 'März',
            april: 'April',
            may: 'Mai',
            june: 'Juni',
            july: 'Juli',
            august: 'August',
            september: 'September',
            october: 'Oktober',
            november: 'November',
            december: 'Dezember'
        };
    }

    export type Department = 'football-adults/general' | 'football-adults/first-team' | 'football-adults/second-team' | 'football-youth/big-field' | 'football-youth/small-field' | 'gymnastics' | 'dancing';

    export namespace Department {
        export const title: Record<Department, string> = {
            'football-adults/general': 'Herrenfußball',
            'football-adults/first-team': 'Erste Mannschaft',
            'football-adults/second-team': 'Zweite Mannschaft',
            'football-youth/big-field': 'Großfeldjugend',
            'football-youth/small-field': 'Kleinfeldjugend',
            'gymnastics': 'Gymnastik',
            'dancing': 'Tanzen'
        };

        export const websiteLink: Record<Department, Link> = {
            'football-adults/general': internalLinks['fussball/herren'],
            'football-adults/first-team': internalLinks['fussball/herren/erste-mannschaft'],
            'football-adults/second-team': internalLinks['fussball/herren/zweite-mannschaft'],
            'football-youth/big-field': internalLinks['fussball/jugend'],
            'football-youth/small-field': internalLinks['fussball/jugend'],
            'gymnastics': internalLinks.gymnastik,
            'dancing': internalLinks.tanzen
        };
    }

    export interface Flatten {
        id: string;
        alreadyPublished: boolean;
        date: string;
        titlePage: {
            title: string;
            description: string;
            month: Newsletter.Month;
            year: number;
        };
        departments: {
            [Department in Newsletter.Department]: {
                title: string;
                description: string;
            }[] | null
        };
        events: {
            [GroupId in EventGroupId]: {
                date: string;
                title: string;
                subtitle: string | null;
            }[] | null;
        };
    }

    export function flatten(newsletter: Newsletter): Newsletter.Flatten;
    export function flatten(newsletter: Omit<Newsletter, 'id'>): Omit<Newsletter.Flatten, 'id'>;
    export function flatten(newsletter: Newsletter | Omit<Newsletter, 'id'>): Newsletter.Flatten | Omit<Newsletter.Flatten, 'id'> {
        return {
            ...'id' in newsletter ? { id: newsletter.id } : {},
            alreadyPublished: newsletter.alreadyPublished,
            date: newsletter.date.encoded,
            titlePage: newsletter.titlePage,
            departments: newsletter.departments,
            events: mapRecord(newsletter.events, eventGroup => {
                if (eventGroup === null)
                    return null;
                return eventGroup.map(event => ({
                    date: event.date.encoded,
                    title: event.title,
                    subtitle: event.subtitle
                }));
            })
        };
    }

    export function concrete(newsletter: Newsletter.Flatten): Newsletter;
    export function concrete(newsletter: Omit<Newsletter.Flatten, 'id'>): Omit<Newsletter, 'id'>;
    export function concrete(newsletter: Newsletter.Flatten | Omit<Newsletter.Flatten, 'id'>): Newsletter | Omit<Newsletter, 'id'> {
        return {
            ...'id' in newsletter ? { id: newsletter.id } : {},
            alreadyPublished: newsletter.alreadyPublished,
            date: UtcDate.decode(newsletter.date),
            titlePage: newsletter.titlePage,
            departments: newsletter.departments,
            events: mapRecord(newsletter.events, eventGroup => {
                if (eventGroup === null)
                    return null;
                return eventGroup.map(event => ({
                    date: UtcDate.decode(event.date),
                    title: event.title,
                    subtitle: event.subtitle
                }));
            })
        };
    }
}
