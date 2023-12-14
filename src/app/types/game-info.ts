export type GameInfo = {
    id: string;
    competition: {
        name: string;
        link: string | null;
        gameDay: number;
    };
    result: {
        home: number | null;
        away: number | null;
    };
    date: string;
    homeTeam: GameInfo.Team;
    awayTeam: GameInfo.Team;
    adress: string | null;
    adressDescription: string | null;
    report: GameInfo.Report | null;
}

export namespace GameInfo {
    export interface Team {
        id: string;
        name: string;
        imageId: string;
    }

    export interface Report {
        title: string;
        paragraphs: { text: string; link: string | null }[][];
    }

    export function additionalProperties(gameInfo: GameInfo): { isSg2: boolean; sgHomeAway: 'away' | 'home' } {
        const isKleinsendelbachHetzlesRegex = /Kleinsendelbach.*Hetzles|Hetzles.*Kleinsendelbach/gu;
        const isKleinsendelbachHetzles2Regex = /Kleinsendelbach.*Hetzles.*2|Kleinsendelbach.*2.*Hetzles|Hetzles.*Kleinsendelbach.*2|Hetzles.*2.*Kleinsendelbach/gu;
        if (isKleinsendelbachHetzlesRegex.test(gameInfo.homeTeam.name)) {
            return {
                isSg2: isKleinsendelbachHetzles2Regex.test(gameInfo.homeTeam.name),
                sgHomeAway: 'home'
            };
        }
        return {
            isSg2: isKleinsendelbachHetzles2Regex.test(gameInfo.awayTeam.name),
            sgHomeAway: 'away'
        };
    }
}
