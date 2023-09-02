export interface GameInfo {
    id: string;
    competition: {
        name: string;
        link: string;
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
    livetickers: (BfvLiveticker & {
        id: string;
    })[];
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
export interface BfvLiveticker {
    loadNew: boolean;
    ifModifiedSinceTimestamp: string;
    results: BfvLiveticker.Result[];
}

export namespace BfvLiveticker {
    export type Result = Result.Card | Result.Comment | Result.Goal | Result.Section | Result.Substitute | Result.TitledResult;

    export namespace Result {
        export interface ResultProperties<Type extends string> {
            type: Type;
            resultLikes: {
                likes: number;
                liked: boolean;
                likeApiRoute: string;
                unlikeApiRoute: string;
            };
            text: string | null;
            time: number | null;
            reportLink: string | null;
        }

        export interface Player {
            id: string;
            imageId: string;
            name: string;
            number: number;
        }

        export type Comment = ResultProperties<'comment'>;

        export interface Section {
            type: 'section';
            text: string;
        }

        export type TitledResult = ResultProperties<'corner' | 'freeKick' | 'ownGoal' | 'penalty' | 'shotOnGoal' | 'specialAction' | 'time' | 'whistle'> & {
            headline: string | null;
        };

        export type Goal = ResultProperties<'goal' | 'penaltyGoal'> & {
            headline: string | null;
            team: 'away' | 'home';
            player: Player;
            result: {
                home: number;
                away: number;
            };
        };

        export type Substitute = ResultProperties<'substitute'> & {
            headline: string | null;
            team: 'away' | 'home';
            playerIn: Player;
            playerOut: Player;
        };

        export type Card = ResultProperties<'redCard' | 'secondYellowCard' | 'yellowCard'> & {
            headline: string | null;
            team: 'away' | 'home';
            player: Player;
            entries: Record<'games' | 'goals' | 'redCards' | 'secondYellowCards' | 'yellowCards', number> | null;
        };
    }
}

export interface BfvApiLiveticker {
    loadNew: boolean;
    ifModifiedSinceTimestamp: string;
    results: BfvApiLiveticker.Result[];
}

export namespace BfvApiLiveticker {
    export type Result =
      Result.Comment | Result.Corner | Result.Football | Result.FreeKick | Result.OwnGoal | Result.Penalty | Result.PenaltyGoal | Result.RedCard | Result.SecondYellowCard | Result.ShotOnGoal | Result.SpecialAction | Result.Substitute | Result.Time | Result.Whistle | Result.YellowCard;

    export namespace Result {
        export interface Comment {
            headline: string | null;
            eventIcon: null;
            likes: number;
            liked: boolean;
            likeApiRoute: string | null;
            unlikeApiRoute: string | null;
            ownGoal: boolean;
            text: string | null;
            time: string | null;
            section: string | null;
            options: Utils.Options | null;
        }

        export type Whistle = Utils.DefaultProperties & {
            headline: string;
        };

        export type SpecialAction = Utils.DefaultProperties & {
            headline: string | null;
        };

        export type Football = Utils.DefaultProperties & {
            headline: string;
            goal: Utils.Goal | null;
        };

        export type Substitute = Utils.DefaultProperties & {
            headline: string;
            substitution: Utils.Substitution | null;
        };

        export type YellowCard = Utils.DefaultProperties & {
            headline: string;
            card: string;
            statistic: Utils.Statistic | null;
            team: Utils.Team;
        };

        export type SecondYellowCard = Utils.DefaultProperties & {
            headline: string;
            card: string;
            statistic: Utils.Statistic | null;
            team: Utils.Team;
        };

        export type RedCard = Utils.DefaultProperties & {
            headline: string;
            card: string;
            statistic: Utils.Statistic | null;
            team: Utils.Team;
        };

        export type Corner = Utils.DefaultProperties & {
            headline: string;
        };

        export type FreeKick = Utils.DefaultProperties & {
            headline: string | null;
        };

        export type ShotOnGoal = Utils.DefaultProperties & {
            headline: string | null;
        };

        export type Penalty = Utils.DefaultProperties & {
            headline: string;
        };

        export type PenaltyGoal = Utils.DefaultProperties & {
            headline: string;
            goal: Utils.Goal | null;
        };

        export type OwnGoal = Utils.DefaultProperties & {
            headline: string;
        };

        export type Time = Utils.DefaultProperties & {
            headline: string;
        };

        export namespace Utils {
            export interface Options {
                reportLink: {
                    href: string;
                    text: string;
                    title: string;
                };
                socialsharing: {
                    services: unknown[];
                };
            }

            export interface DefaultProperties {
                eventIcon: string;
                likes: number;
                liked: boolean;
                likeApiRoute: string;
                unlikeApiRoute: string;
                ownGoal: boolean;
                text: string;
                time: string;
                options: Options;
            }

            export interface TeamLogo {
                teamName: string;
                teamIcon: string;
            }

            export interface Player {
                id: string;
                name: string;
                number: string;
                teamLogo: TeamLogo;
                image: {
                    src: string;
                    alt: string;
                    title: string;
                };
                link: {
                    href: string;
                };
            }

            export interface Goal {
                teamName: string;
                player: Player;
                result: {
                    halftime: boolean;
                    teams: {
                        teamIcon: string;
                        actualGoals: number;
                        type: string;
                    }[];
                };
            }

            export interface Substitution {
                headline: string;
                player: Player;
                player2: Player;
                teamLogo: TeamLogo;
            }

            export interface Statistic {
                text: string | null;
                player: Player;
                entries: {
                    count: number;
                    icon: string;
                }[] | null;
            }

            export interface Team {
                name: string;
            }
        }
    }
}
