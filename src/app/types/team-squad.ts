import { Element, SquadData, SquadPerson } from 'kleinsendelbach-website-library';
import { AnpfiffInfoPersonParameters } from './anpfiff-info-parameters';

export interface TeamSquad {
    squad: {
        goalkeeper: TeamSquad.Person[];
        defence: TeamSquad.Person[];
        midfield: TeamSquad.Person[];
        offence: TeamSquad.Person[];
        notSpecified: TeamSquad.Person[];
    };
    coach: TeamSquad.Coach | null;
    stab: TeamSquad.StabPerson[];
}

export namespace TeamSquad {
    export interface Person {
        imageId: number | null;
        firstName: string | null;
        lastName: string | null;
        personParameters: AnpfiffInfoPersonParameters | null;
        age: number | null;
        countInSquad: number | null;
        goals: number | null;
        assists: number | null;
    }

    export interface Coach {
        imageId: number | null;
        name: string | null;
        personParameters: AnpfiffInfoPersonParameters | null;
        age: number | null;
    }

    export interface StabPerson {
        imageId: number | null;
        function: string | null;
        name: string | null;
        personParameters: AnpfiffInfoPersonParameters | null;
    }

    export function imageSrc(imageId: number | null): string | null {
        if (imageId === null)
            return null;
        return `http://www.anpfiff.info/upload/images/Portrait4/${imageId}.jpg`;
    }

    export function squadDataPersons(persons: Person[]): Element<SquadData>['persons'] {
        return persons.map(person => {
            let name: string = 'n.a.';
            if (person.firstName !== null && person.lastName !== null)
                name = `${person.firstName} ${person.lastName}`;
            else if (person.firstName === null && person.lastName !== null)
                name =  person.lastName;
            else if (person.firstName !== null && person.lastName === null)
                name =  person.firstName;
            let additionalText: string | null = null;
            if (person.goals !== null)
                additionalText = `${person.goals} Tore`;
            if (person.assists !== null) {
                if (additionalText === null)
                    additionalText = `${person.assists} Assists`;
                else
                    additionalText += ` und ${person.assists} Assists`;
            }
            if (person.countInSquad !== null) {
                if (additionalText === null)
                    additionalText = `${person.countInSquad} Spiele`;
                else
                    additionalText += ` in ${person.countInSquad} Spielen`;
            }
            return {
                imageSrc: imageSrc(person.imageId),
                name: name,
                additionalText: additionalText
            }
        });
    }

    export function toSquadData(teamSquad: TeamSquad): SquadData {
        const coach: Element<SquadData> | null = teamSquad.coach ? {
            title: 'Trainer',
            persons: [{
                imageSrc: imageSrc(teamSquad.coach.imageId),
                name: teamSquad.coach.name ?? 'n.a.',
                additionalText: null
            }]
        } : null;
        const stab: Element<SquadData> | null = teamSquad.stab.length !== 0 ? {
            title: 'Stab',
            persons: teamSquad.stab.map(person => ({
                imageSrc: imageSrc(person.imageId),
                name: person.name ?? 'n.a.',
                additionalText: person.function
            }))
        } : null;
        return [
            ...(coach ? [coach] : []),
            ...(teamSquad.squad.goalkeeper.length !== 0 ? [{ title: 'Torwart', persons: squadDataPersons(teamSquad.squad.goalkeeper) }] : []),
            ...(teamSquad.squad.defence.length !== 0 ? [{ title: 'Abwehr', persons: squadDataPersons(teamSquad.squad.defence) }] : []),
            ...(teamSquad.squad.midfield.length !== 0 ? [{ title: 'Mittelfeld', persons: squadDataPersons(teamSquad.squad.midfield) }] : []),
            ...(teamSquad.squad.offence.length !== 0 ? [{ title: 'Sturm', persons: squadDataPersons(teamSquad.squad.offence) }] : []),
            ...(teamSquad.squad.notSpecified.length !== 0 ? [{ title: 'Ohne Angaben', persons: squadDataPersons(teamSquad.squad.notSpecified) }] : []),
            ...(stab ? [stab] : []),
        ]
    }
}
