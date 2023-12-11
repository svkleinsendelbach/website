import { BannerData, Link } from "kleinsendelbach-website-library";
import { InternalPathKey } from "../types/internal-paths";

export const homeBannerConfig: BannerData<InternalPathKey> = [
    {
        imageSource: 'assets/images/herren-mannschaft.png',
        title: 'Herren Mannschaft',
        subTitle: '1. und 2. Mannschaft 2019 / 2020',
        link: Link.external('Google', 'https://google.com'), // TODO
        isCurrent: false
    },
    {
        imageSource: 'assets/images/kleinfeld-jugend-mannschaft.jpg',
        title: 'Kleinfeld Jugend Mannschaft',
        subTitle: 'E- bis G-Jugend',
        link: Link.external('Google', 'https://google.com'), // TODO
        isCurrent: false
    },
    {
        imageSource: 'assets/images/großfeld-jugend-mannschaft.jpg',
        title: 'Großfeld Jugend Mannschaft',
        subTitle: 'A- bis D-Jugend',
        link: Link.external('Google', 'https://google.com'), // TODO
        isCurrent: false
    }
];
