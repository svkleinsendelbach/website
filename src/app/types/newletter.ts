import { EventGroupId } from './event';
import { internalLinks } from './internal-link-path';
import { Link } from './link';
import { UtcDate } from './utc-date';

export type Newsletter = {
    id: string;
    titlePage: {
        title: string;
        description: string;
        imageSrc: string;
        month: string;
        year: string;
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
}
