import { Link } from 'src/app/types/link';

export interface LinkData {
    id: string;
    link: Link;
    title: string;
    subtitle: string;
}

export namespace LinkData {
    export function trackById(_index: number, link: LinkData): string {
        return link.id;
    }
}
