import { Guid } from './guid';

export type CriticismSuggestion = {
    id: Guid;
    type: CriticismSuggestion.Type;
    title: string;
    description: string;
    contactEmail: string;
    workedOff: boolean;
};

export namespace CriticismSuggestion {
    export type Type = 'criticism' | 'suggestion';

    export type Flatten = {
        id: string;
        type: CriticismSuggestion.Type;
        title: string;
        description: string;
        contactEmail: string;
        workedOff: boolean;
    };

    export function flatten(criticismSuggestion: CriticismSuggestion): CriticismSuggestion.Flatten;
    export function flatten(criticismSuggestion: Omit<CriticismSuggestion, 'id'>): Omit<CriticismSuggestion.Flatten, 'id'>;
    export function flatten(criticismSuggestion: CriticismSuggestion | Omit<CriticismSuggestion, 'id'>): CriticismSuggestion.Flatten | Omit<CriticismSuggestion.Flatten, 'id'> {
        return {
            ...'id' in criticismSuggestion ? { id: criticismSuggestion.id.guidString } : {},
            contactEmail: criticismSuggestion.contactEmail,
            description: criticismSuggestion.description,
            title: criticismSuggestion.title,
            type: criticismSuggestion.type,
            workedOff: criticismSuggestion.workedOff
        };
    }

    export function concrete(criticismSuggestion: CriticismSuggestion.Flatten): CriticismSuggestion;
    export function concrete(criticismSuggestion: Omit<CriticismSuggestion.Flatten, 'id'>): Omit<CriticismSuggestion, 'id'>;
    export function concrete(criticismSuggestion: CriticismSuggestion.Flatten | Omit<CriticismSuggestion.Flatten, 'id'>): CriticismSuggestion | Omit<CriticismSuggestion, 'id'> {
        return {
            ...'id' in criticismSuggestion ? { id: new Guid(criticismSuggestion.id) } : {},
            contactEmail: criticismSuggestion.contactEmail,
            description: criticismSuggestion.description,
            title: criticismSuggestion.title,
            type: criticismSuggestion.type,
            workedOff: criticismSuggestion.workedOff
        };
    }
}
