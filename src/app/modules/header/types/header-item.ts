import { Link } from 'src/app/types/link';

export interface HeaderItem {
    id: string;
    topItem: Link;
    subItems: {
        id: string;
        link: Link;
    }[] | null;
}

export namespace HeaderItem {
    export function trackById(_index: number, headerItem: HeaderItem): string {
        return headerItem.id;
    }

    export namespace SubItem {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        export function trackById(_index: number, subItem: { id: string; link: Link }): string {
            return subItem.id;
        }
    }
}
