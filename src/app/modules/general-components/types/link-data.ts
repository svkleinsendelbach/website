import { InternalLinkPath } from 'src/app/types/internal-link-path';
import { Link } from 'src/app/types/link';

export interface LinkData {
    id: string;
    link: Link | InternalLinkPath;
    title: string;
    subtitle: string;
}
