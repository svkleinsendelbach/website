import { UtcDate } from 'src/app/types/utc-date';
import { Guid } from './guid';

export type ReportGroupId =
    'general' |
    'football-adults/general' |
    'football-adults/first-team/game-report' |
    'football-adults/second-team/game-report' |
    'football-youth/general' |
    'football-youth/c-youth/game-report' |
    'football-youth/e-youth/game-report' |
    'football-youth/f-youth/game-report' |
    'football-youth/g-youth/game-report' |
    'gymnastics' |
    'dancing';

export namespace ReportGroupId {
    export const all: ReportGroupId[] = [
        'general',
        'football-adults/general',
        'football-adults/first-team/game-report',
        'football-adults/second-team/game-report',
        'football-youth/general',
        'football-youth/c-youth/game-report',
        'football-youth/e-youth/game-report',
        'football-youth/f-youth/game-report',
        'football-youth/g-youth/game-report',
        'gymnastics',
        'dancing'
    ];

    export const title: Record<ReportGroupId, string> = {
        'general': 'Allgemeines',
        'football-adults/general': 'Herrenfußball',
        'football-adults/first-team/game-report': 'Spielbericht der 1. Mannschaft',
        'football-adults/second-team/game-report': 'Spielbericht der 2. Mannschaft',
        'football-youth/general': 'Jugendfußball',
        'football-youth/c-youth/game-report': 'Spielbericht der C-Jugend',
        'football-youth/e-youth/game-report': 'Spielbericht der E-Jugend',
        'football-youth/f-youth/game-report': 'Spielbericht der F-Jugend',
        'football-youth/g-youth/game-report': 'Spielbericht der G-Jugend',
        'gymnastics': 'Gymnastik',
        'dancing': 'Tanzen'
    };

    export interface Grouped {
        title: string;
        groupIds: ReportGroupId[];
    }

    export const grouped: Grouped[] = [
        {
            title: 'Allgemeines',
            groupIds: ['general', 'gymnastics', 'dancing']
        },
        {
            title: 'Herrenfußball',
            groupIds: ['football-adults/general', 'football-adults/first-team/game-report', 'football-adults/second-team/game-report']
        },
        {
            title: 'Jugendfußball',
            groupIds: ['football-youth/general', 'football-youth/e-youth/game-report', 'football-youth/e-youth/game-report', 'football-youth/f-youth/game-report', 'football-youth/g-youth/game-report']
        }
    ];
}

export type Report = {
    id: Guid;
    title: string;
    message: string;
    imageUrl?: string;
    createDate: UtcDate;
};

export namespace Report {
    export type Flatten = {
        id: string;
        title: string;
        message: string;
        imageUrl?: string;
        createDate: string;
    };

    export function flatten(report: Report): Report.Flatten;
    export function flatten(report: Omit<Report, 'id'>): Omit<Report.Flatten, 'id'>;
    export function flatten(report: Report | Omit<Report, 'id'>): Report.Flatten | Omit<Report.Flatten, 'id'> {
        return {
            ...('id' in report ? { id: report.id.guidString } : {}),
            title: report.title,
            message: report.message,
            imageUrl: report.imageUrl,
            createDate: report.createDate.encoded
        };
    }

    export function concrete(report: Report.Flatten): Report;
    export function concrete(report: Omit<Report.Flatten, 'id'>): Omit<Report, 'id'>;
    export function concrete(report: Report.Flatten | Omit<Report.Flatten, 'id'>): Report | Omit<Report, 'id'> {
        return {
            ...('id' in report ? { id: new Guid(report.id) } : {}),
            title: report.title,
            message: report.message,
            imageUrl: report.imageUrl,
            createDate: UtcDate.decode(report.createDate)
        };
    }
}

export type ReportGroup = {
    groupId: ReportGroupId;
    reports: Report[];
};

export namespace ReportGroup {
    export type Flatten = {
        groupId: ReportGroupId;
        reports: Report.Flatten[];
    };
}
