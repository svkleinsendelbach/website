import { Link } from 'src/app/types/link';

export interface HeaderItem {
    topItem: Link;
    subItems: Record<string, Link> | null;
}

export type HeaderData = Record<string, HeaderItem>;
