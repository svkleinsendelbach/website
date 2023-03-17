import { Guid } from './guid';

export type ReportGroupId =
    'general' |
    'football-adults/first-team/game-report' |
    'football-adults/second-team/game-report' |
    'football-youth/c-youth/game-report' |
    'football-youth/e-youth/game-report' |
    'football-youth/f-youth/game-report' |
    'football-youth/g-youth/game-report';


export type Report = {
    id: Guid;
    title: string;
    message: string;
    createDate: Date;
};

export namespace Report {
    export type Flatten = {
        id: string;
        title: string;
        message: string;
        createDate: string;
    };

    export function flatten(report: Report): Report.Flatten;
    export function flatten(report: Omit<Report, 'id'>): Omit<Report.Flatten, 'id'>;
    export function flatten(report: Report | Omit<Report, 'id'>): Report.Flatten | Omit<Report.Flatten, 'id'> {
        return {
            ...('id' in report ? { id: report.id.guidString } : {}),
            title: report.title,
            message: report.message,
            createDate: report.createDate.toISOString()
        };
    }

    export function concrete(report: Report.Flatten): Report;
    export function concrete(report: Omit<Report.Flatten, 'id'>): Omit<Report, 'id'>;
    export function concrete(report: Report.Flatten | Omit<Report.Flatten, 'id'>): Report | Omit<Report, 'id'> {
        return {
            ...('id' in report ? { id: new Guid(report.id) } : {}),
            title: report.title,
            message: report.message,
            createDate: new Date(report.createDate)
        };
    }
}
