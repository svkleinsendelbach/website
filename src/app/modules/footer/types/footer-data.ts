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
