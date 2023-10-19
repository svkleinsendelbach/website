import { Guid } from './guid';

export type CriticismSuggestion = {
    id: Guid;
    type: CriticismSuggestion.Type;
    title: string;
    description: string;
    workedOff: boolean;
};

export namespace CriticismSuggestion {
    export type Type = 'criticism' | 'suggestion';

    export namespace Type {
        export const all: Type[] = ['criticism', 'suggestion'];

        export function description(type: Type): string {
            switch (type) {
            case 'criticism':
                return 'Kritik';
            case 'suggestion':
                return 'Vorschlag';
            default:
                return '';
            }
        }

        export function color(type: Type): string {
            switch (type) {
            case 'criticism':
                return '#FAE3E3';
            case 'suggestion':
                return '#D1E8FF';
            default:
                return '';
            }
        }
    }

    export type Flatten = {
        id: string;
        type: CriticismSuggestion.Type;
        title: string;
        description: string;
        workedOff: boolean;
    };

    export function flatten(criticismSuggestion: CriticismSuggestion): CriticismSuggestion.Flatten;
    export function flatten(criticismSuggestion: Omit<CriticismSuggestion, 'id'>): Omit<CriticismSuggestion.Flatten, 'id'>;
    export function flatten(criticismSuggestion: CriticismSuggestion | Omit<CriticismSuggestion, 'id'>): CriticismSuggestion.Flatten | Omit<CriticismSuggestion.Flatten, 'id'> {
        return {
            ...'id' in criticismSuggestion ? { id: criticismSuggestion.id.guidString } : {},
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
            description: criticismSuggestion.description,
            title: criticismSuggestion.title,
            type: criticismSuggestion.type,
            workedOff: criticismSuggestion.workedOff
        };
    }
}
