
export type ReportGroupId =
    | 'dancing'
    | 'football-adults/first-team'
    | 'football-adults/general'
    | 'football-adults/second-team'
    | 'football-adults/ah-team'
    | 'football-youth/a-youth'
    | 'football-youth/b-youth'
    | 'football-youth/c-youth'
    | 'football-youth/d-youth'
    | 'football-youth/e-youth'
    | 'football-youth/f-youth'
    | 'football-youth/g-youth'
    | 'football-youth/general'
    | 'general'
    | 'gymnastics';

export namespace ReportGroupId {
    export const all: ReportGroupId[] = [
        'general',
        'football-adults/general',
        'football-adults/first-team',
        'football-adults/second-team',
        'football-adults/ah-team',
        'football-youth/general',
        'football-youth/a-youth',
        'football-youth/b-youth',
        'football-youth/c-youth',
        'football-youth/d-youth',
        'football-youth/e-youth',
        'football-youth/f-youth',
        'football-youth/g-youth',
        'gymnastics',
        'dancing'
    ];

    export const title: Record<ReportGroupId, string> = {
        'dancing': 'Tanzen',
        'football-adults/first-team': '1. Mannschaft',
        'football-adults/general': 'Herrenfußball',
        'football-adults/second-team': '2. Mannschaft',
        'football-adults/ah-team': 'Alte Herren',
        'football-youth/a-youth': 'A-Jugend',
        'football-youth/b-youth': 'B-Jugend',
        'football-youth/c-youth': 'C-Jugend',
        'football-youth/d-youth': 'D-Jugend',
        'football-youth/e-youth': 'E-Jugend',
        'football-youth/f-youth': 'F-Jugend',
        'football-youth/g-youth': 'G-Jugend',
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
            groupIds: ['football-adults/general', 'football-adults/first-team', 'football-adults/second-team', 'football-adults/ah-team'],
            title: 'Herrenfußball'
        },
        {
            groupIds: ['football-youth/general', 'football-youth/a-youth', 'football-youth/b-youth', 'football-youth/c-youth', 'football-youth/d-youth', 'football-youth/e-youth', 'football-youth/f-youth', 'football-youth/g-youth'],
            title: 'Jugendfußball'
        }
    ];
}
