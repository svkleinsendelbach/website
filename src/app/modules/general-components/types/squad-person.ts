import { AnpfiffInfoPersonParameters } from '../../firebase-api/types/anpfiff-info-person-parameters';
import { TeamSquad } from '../../firebase-api/types/team-squad';

export interface SquadPerson {
    imageId: number | null;
    name: string;
    additionalText: string | null;
    personParameters: AnpfiffInfoPersonParameters | null;
}

export namespace SquadPerson {
    export function trackByName(_index: number, person: SquadPerson | TeamSquad.Coach | TeamSquad.Person | TeamSquad.StabPerson): string {
        if ('firstName' in person && 'lastName' in person) {
            if (person.firstName === null && person.lastName === null)
                return 'n.a.';
            return `${person.firstName ?? ''} ${person.lastName ?? ''}`;
        }

        return person.name ?? 'n.a.';
    }
}
