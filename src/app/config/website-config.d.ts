import { ContactItem } from '../modules/general-components/types/contact-item';
import { Manager } from '../pages/about-us/managers/managers.page';
import { Weekdays, OpeningHour } from '../pages/about-us/sportshome/sportshome.page';
import { BannerItem } from '../pages/home/home-banner/home-banner.component';

export type WebsiteConfig = {

    // Opening hours of the sportshome listed in about-us/sportshome page
    openingHours: Record<Weekdays, OpeningHour>;

    // Club managers listed in about-us/managers page
    managers: Manager[];

    // Coordinates of sportshome, a- and b-field
    coordinates: Record<'sportshome' | 'a-field' | 'b-field', google.maps.LatLngLiteral>;

    // Contact data of team managers
    contact: Record<'football-adults' | 'first-team' | 'second-team' | 'ah-team' | 'football-youth' | 'c-youth' | 'e-youth' | 'f-youth' | 'g-youth', ContactItem[]>;

    // Bfv team ids for bfv widget
    bfvTeamIds: Record<'first-team' | 'second-team' | 'c-youth-1' | 'c-youth-2' | 'e-youth' | 'f-youth', string>;

    // Data for home banner
    homeBanner: BannerItem[];
};
