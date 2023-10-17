import { NonEmptyArray } from './non-empty-array';

export interface Sponsor {
    name: string;
    logoSrc: string;
    address: {
        streetName: string;
        cityName: string;
    };
    contact: {
        telephone: string | null;
        email: string | null;
        website: string | null;
        socialMedia: NonEmptyArray<{
            name: string;
            link: string;
        }> | null;
    };
}

export interface Sponsors {
    mainSponsors: NonEmptyArray<Sponsor> | null;
    premiumSponsors: NonEmptyArray<Sponsor> | null;
    partners: NonEmptyArray<Sponsor> | null;
}
