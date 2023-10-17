import { OpeningHour, Weekdays } from '../pages/about-us/sportshome/sportshome.page';
import { BannerItem } from '../pages/home/home-banner/home-banner.component';
import { ContactItem } from '../modules/general-components/types/contact-item';
import { Manager } from '../pages/about-us/managers/managers.page';
import { ContactData } from '../modules/footer/types/contact-data';
import { Sponsors } from '../types/sponsors';

export interface WebsiteConfig {

    // Opening hours of the sportshome listed in about-us/sportshome page
    openingHours: Record<Weekdays, OpeningHour>;

    // Club managers listed in about-us/managers page
    managers: Manager[];

    // Coordinates of sportshome, a- and b-field
    coordinates: Record<'a-field' | 'b-field' | 'sportshome', google.maps.LatLngLiteral>;

    // Contact data of team managers
    contact: Record<'ah-team' | 'c-youth' | 'e-youth' | 'f-youth' | 'first-team' | 'football-adults' | 'football-youth' | 'g-youth' | 'second-team', ContactItem[]>;

    // Bfv team ids for bfv widget
    bfvTeamIds: Record<'c-youth-1' | 'c-youth-2' | 'e-youth' | 'f-youth' | 'first-team' | 'second-team', string>;

    // Data for home banner
    homeBanner: BannerItem[];

    // Map options for google maps
    mapOptions: google.maps.MapOptions;

    // Contact items for footer
    footerContacts: ContactData[];

    // Sponsors displayed on different pages
    sponsors: Sponsors;
}
