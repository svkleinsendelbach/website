import { AnpfiffInfoPersonParameters } from '../../firebase-api/types/anpfiff-info-person-parameters';

export interface SquadPerson {
    imageId: number | null;
    name: string;
    additionalText: string | null;
    personParameters: AnpfiffInfoPersonParameters | null;
}
