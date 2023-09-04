import { Guid } from './guid';
import { UtcDate } from 'src/app/types/utc-date';

export type ReportGroupId =
    'dancing' | 'football-adults/first-team/game-report' | 'football-adults/general' | 'football-adults/second-team/game-report' | 'football-youth/c-youth/game-report' | 'football-youth/e-youth/game-report' | 'football-youth/f-youth/game-report' | 'football-youth/g-youth/game-report' | 'football-youth/general' | 'general' | 'gymnastics';

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
        'dancing': 'Tanzen',
        'football-adults/first-team/game-report': 'Spielbericht der 1. Mannschaft',
        'football-adults/general': 'Herrenfußball',
        'football-adults/second-team/game-report': 'Spielbericht der 2. Mannschaft',
        'football-youth/c-youth/game-report': 'Spielbericht der C-Jugend',
        'football-youth/e-youth/game-report': 'Spielbericht der E-Jugend',
        'football-youth/f-youth/game-report': 'Spielbericht der F-Jugend',
        'football-youth/g-youth/game-report': 'Spielbericht der G-Jugend',
        'football-youth/general': 'Jugendfußball',
        'general': 'Allgemeines',
        'gymnastics': 'Gymnastik'
    };

    export interface Grouped {
        title: string;
        groupIds: ReportGroupId[];
    }

    export const grouped: Grouped[] = [
        {
            groupIds: ['general', 'gymnastics', 'dancing'],
            title: 'Allgemeines'
        },
        {
            groupIds: ['football-adults/general', 'football-adults/first-team/game-report', 'football-adults/second-team/game-report'],
            title: 'Herrenfußball'
        },
        {
            groupIds: ['football-youth/general', 'football-youth/e-youth/game-report', 'football-youth/e-youth/game-report', 'football-youth/f-youth/game-report', 'football-youth/g-youth/game-report'],
            title: 'Jugendfußball'
        }
    ];
}

export interface Report {
    id: Guid;
    title: string;
    message: string;
    imageUrl: string | null;
    createDate: UtcDate;
}

export namespace Report {
    export interface Flatten {
        id: string;
        title: string;
        message: string;
        imageUrl: string | null;
        createDate: string;
    }

    export function flatten(report: Report): Report.Flatten;
    export function flatten(report: Omit<Report, 'id'>): Omit<Report.Flatten, 'id'>;
    export function flatten(report: Omit<Report, 'id'> | Report): Omit<Report.Flatten, 'id'> | Report.Flatten {
        return {
            ...'id' in report ? { id: report.id.guidString } : {},
            createDate: report.createDate.encoded,
            imageUrl: report.imageUrl,
            message: report.message,
            title: report.title
        };
    }

    export function concrete(report: Report.Flatten): Report;
    export function concrete(report: Omit<Report.Flatten, 'id'>): Omit<Report, 'id'>;
    export function concrete(report: Omit<Report.Flatten, 'id'> | Report.Flatten): Omit<Report, 'id'> | Report {
        return {
            ...'id' in report ? { id: new Guid(report.id) } : {},
            createDate: UtcDate.decode(report.createDate),
            imageUrl: report.imageUrl,
            message: report.message,
            title: report.title
        };
    }

    export function trackById(_index: number, report: Report | Report.Flatten): string {
        if (typeof report.id === 'string')
            return report.id;
        return report.id.guidString;
    }
}

export interface ReportGroup {
    groupId: ReportGroupId;
    reports: Report[];
}

export namespace ReportGroup {
    export interface Flatten {
        groupId: ReportGroupId;
        reports: Report.Flatten[];
    }

    export function trackById(_index: number, group: ReportGroup | ReportGroup.Flatten): string {
        return group.groupId;
    }
}
