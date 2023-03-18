import { AnpfiffInfoPersonParameters } from './anpfiff-info-person-parameters';

export type TeamSquad = {
    squad: {
        goalkeeper: TeamSquad.Person[];
        defence: TeamSquad.Person[];
        midfield: TeamSquad.Person[];
        offence: TeamSquad.Person[];
        notSpecified: TeamSquad.Person[];
    };
    coach: TeamSquad.Coach | null;
    stab: Array<TeamSquad.StabPerson>;
};

export namespace TeamSquad {
    export type Person = {
        imageId: number | null;
        firstName: string | null;
        lastName: string | null;
        personParameters: AnpfiffInfoPersonParameters | null;
        age: number | null;
        countInSquad: number | null;
        goals: number | null;
        assists: number | null;
    };

    export type Coach = {
        imageId: number | null;
        name: string | null;
        personParameters: AnpfiffInfoPersonParameters | null;
        age: number | null;
    };

    export type StabPerson = {
        imageId: number | null;
        function: string | null;
        name: string | null;
        personParameters: AnpfiffInfoPersonParameters | null;
    };
}
