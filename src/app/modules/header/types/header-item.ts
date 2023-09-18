import { Link } from 'src/app/types/link';

export interface HeaderItem {
    id: string;
    topItem: Link;
    subItems: {
        id: string;
        link: Link;
    }[] | null;
}
