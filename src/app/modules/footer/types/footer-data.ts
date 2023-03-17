import { Link } from 'src/app/types/link';
import { ContactData } from './contact-data';

export interface FooterData{
  links: {
    id: string;
    link: Link;
  }[];
  copyrightText: string;
  editLink?: Link;
  contact: ContactData[];
}
