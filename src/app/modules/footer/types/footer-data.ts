import { ContactData } from './contact-data';
import { Link } from 'src/app/types/link';

export interface FooterData {
    links: {
        id: string;
        link: Link;
    }[];
    copyrightText: string;
    editLink: Link | null;
    contact: ContactData[];
}

export namespace FooterData {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    export namespace Link {
        export function trackById(_index: number, link: { id: string; link: Link }): string {
            return link.id;
        }
    }
}
