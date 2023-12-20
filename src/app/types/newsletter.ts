import { NewsletterData, UtcDate, keys, mapRecord, Element, values, entries, compactMap, LinkService } from "kleinsendelbach-website-library";
import { EventGroupId } from "./event-group-id";
import { socialMediaConfig } from "../config/social-media.config";
import { sponsorsConfig } from "../config/sponsors.config";
import { InternalPathKey } from "./internal-paths";

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
    export function newsletterData(newsletter: Newsletter, showUnsubscribe: boolean, linkService: LinkService<InternalPathKey>): NewsletterData {
        const departmentsItems: Element<NewsletterData['content']>['items'] | null = values(newsletter.departments).some(departments => departments !== null && departments.length !== 0) ? compactMap(entries(newsletter.departments), ({ key, value }) =>(value === null ? null : {
            title: Department.title[key],
            link: linkService.absoluteLink(linkService.link(Department.link[key]).link),
            subitems: value.map(value => ({
                title: value.title,
                subtitle: value.description
            }))
        })) : null;
        const eventsItems: Element<NewsletterData['content']>['items'] | null = values(newsletter.events).some(events => events !== null && events.length !== 0) ? compactMap(entries(newsletter.events), ({ key, value }) => (value === null ? null : {
            title: EventGroupId.title[key],
            link: null,
            subitems: value.map(value => ({
                title: `${value.date.description} | ${value.title}`,
                subtitle: value.subtitle
            }))
        })) : null;
        return {
            name: 'SV Kleinsendelbach',
            month: Month.title[newsletter.titlePage.month],
            year: newsletter.titlePage.year.toString(),
            logoSrc: linkService.absoluteLink('assets/images/svk-logo.svg'),
            title: newsletter.titlePage.title,
            description: newsletter.titlePage.description,
            unsubscribeLink: showUnsubscribe ? linkService.absoluteLink(linkService.link('newsletter/unsubscribe/:id').link.replaceAll(':id', '%newsletter-subscriber-id%')) : null,
            websiteLink: {
                title: 'www.svkleinsendelbach-website.web.app',
                link: linkService.absoluteLink('')
            },
            notCorrectShownLink: linkService.absoluteLink(linkService.link('newsletter/:id').link.replaceAll(':id', newsletter.id)),
            content: [
                ...(departmentsItems === null ? [] : [{
                    title: 'Neues aus unseren Abteilungen',
                    imageSrc: null,
                    items: departmentsItems
                }]),
                ...(eventsItems === null ? [] : [{
                    title: 'Kommende Termine / Ankündigungen',
                    imageSrc: null,
                    items: eventsItems
                }])
            ],
            socialMedia: socialMediaConfig.map(socialMedia => ({
                imageSrc: linkService.absoluteLink(socialMedia.imageSrc),
                name: socialMedia.name,
                title: socialMedia.title,
                link: {
                    title: socialMedia.title,
                    link: socialMedia.link.link
                }
            })),
            sponsors: sponsorsConfig
        };
    }

    export type Month = 'january' | 'february' | 'march' | 'april' | 'may' | 'june' | 'july' | 'august' | 'september' | 'october' | 'november' | 'december';

    export namespace Month {
        export function fromNumber(month: number): Month | null {
            if (month <= 0 || month > 12)
                return null;
            return keys(title)[month - 1];
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

        export const link: Record<Department, InternalPathKey> = {
            'football-adults/general': 'football-adults',
            'football-adults/first-team': 'football-adults/first-team',
            'football-adults/second-team': 'football-adults/second-team',
            'football-youth/big-field': 'football-youth',
            'football-youth/small-field': 'football-youth',
            'gymnastics': 'gymnastics',
            'dancing': 'dancing'
        };
    }

    export type Flatten = {
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
    };

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
            ...'id' in newsletter ? { id: newsletter } : {},
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

    export type Overview = {
        id: string;
        alreadyPublished: boolean;
        date: UtcDate;
        title: string;
        description: string;
        month: Newsletter.Month;
        year: number;
    }

    export namespace Overview {
        export type Flatten = {
            id: string;
            alreadyPublished: boolean;
            date: string;
            title: string;
            description: string;
            month: Newsletter.Month;
            year: number;
        }

        export function flatten(newsletter: Newsletter.Overview): Newsletter.Overview.Flatten;
        export function flatten(newsletter: Omit<Newsletter.Overview, 'id'>): Omit<Newsletter.Overview.Flatten, 'id'>;
        export function flatten(newsletter: Newsletter.Overview | Omit<Newsletter.Overview, 'id'>): Newsletter.Overview.Flatten | Omit<Newsletter.Overview.Flatten, 'id'> {
            return {
                ...'id' in newsletter ? { id: newsletter.id } : {},
                alreadyPublished: newsletter.alreadyPublished,
                date: newsletter.date.encoded,
                title: newsletter.title,
                description: newsletter.description,
                month: newsletter.month,
                year: newsletter.year
            };
        }

        export function concrete(newsletter: Newsletter.Overview.Flatten): Newsletter.Overview;
        export function concrete(newsletter: Omit<Newsletter.Overview.Flatten, 'id'>): Omit<Newsletter.Overview, 'id'>;
        export function concrete(newsletter: Newsletter.Overview.Flatten | Omit<Newsletter.Overview.Flatten, 'id'>): Newsletter.Overview | Omit<Newsletter.Overview, 'id'> {
            return {
                ...'id' in newsletter ? { id: newsletter.id } : {},
                alreadyPublished: newsletter.alreadyPublished,
                date: UtcDate.decode(newsletter.date),
                title: newsletter.title,
                description: newsletter.description,
                month: newsletter.month,
                year: newsletter.year
            };
        }
    }
}
