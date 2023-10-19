import { AnpfiffInfoPersonParameters } from '../../../types/anpfiff-info-parameters';

export interface SquadPerson {
    imageId: number | null;
    name: string;
    additionalText: string | null;
    personParameters: AnpfiffInfoPersonParameters | null;
}
