import { Guid } from "kleinsendelbach-website-library";

export type Criticism = {
    id: Guid;
    type: Criticism.Type;
    title: string;
    description: string;
    workedOff: boolean;
};

export namespace Criticism {
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
        type: Criticism.Type;
        title: string;
        description: string;
        workedOff: boolean;
    };

    export function flatten(criticism: Criticism): Criticism.Flatten;
    export function flatten(criticism: Omit<Criticism, 'id'>): Omit<Criticism.Flatten, 'id'>;
    export function flatten(criticism: Criticism | Omit<Criticism, 'id'>): Criticism.Flatten | Omit<Criticism.Flatten, 'id'> {
        return {
            ...'id' in criticism ? { id: criticism.id.guidString } : {},
            description: criticism.description,
            title: criticism.title,
            type: criticism.type,
            workedOff: criticism.workedOff
        };
    }

    export function concrete(criticism: Criticism.Flatten): Criticism;
    export function concrete(criticism: Omit<Criticism.Flatten, 'id'>): Omit<Criticism, 'id'>;
    export function concrete(criticism: Criticism.Flatten | Omit<Criticism.Flatten, 'id'>): Criticism | Omit<Criticism, 'id'> {
        return {
            ...'id' in criticism ? { id: new Guid(criticism.id) } : {},
            description: criticism.description,
            title: criticism.title,
            type: criticism.type,
            workedOff: criticism.workedOff
        };
    }
}
