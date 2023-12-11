import { HeaderData, Link } from "kleinsendelbach-website-library";
import { InternalPathKey } from "../types/internal-paths";

export const headerConfig: HeaderData<InternalPathKey | 'onlineshop', InternalPathKey> = {
    name: 'SV Kleinsendelbach',
    logoSrc: 'assets/images/svk-logo.svg',
    homeLink: 'home',
    items: {
        home: {
            title: 'Home',
            link: 'home'
        },
        managers: {
            title: 'Vorstandschaft',
            link: 'managers'
        },
        sportshome: {
            title: 'Sportheim',
            link: 'sportshome'
        },
        onlineshop: {
            title: 'Onlineshop',
            link: Link.external('Onlineshop', 'https://sv-kleinsendelbach.fan12.de')
        },
        chronicle: {
            title: 'Chronik',
            link: 'chronicle'
        },
        statute: {
            title: 'Satzung',
            link: 'statute'
        },
        sponsors: {
            title: 'Unsere Sponsoren',
            link: 'sponsors'
        },
        privacy: {
            title: 'Datenschutz',
            link: 'privacy'
        },
        request: {
            title: 'Mitgliedsantrag',
            link: 'request'
        },
        'football-adults': {
            title: 'Herrenfußball',
            link: 'football-adults'
        },
        'football-adults/first-team': {
            title: '1. Mannschaft',
            link: 'football-adults/first-team'
        },
        'football-adults/second-team': {
            title: '2. Mannschaft',
            link: 'football-adults/second-team'
        },
        'football-adults/ah-team': {
            title: 'Alte Herren',
            link: 'football-adults/ah-team'
        },
        'football-youth': {
            title: 'Jugendfußball',
            link: 'football-youth'
        },
        'football-youth/a-youth': {
            title: 'A-Jugend',
            link: 'football-youth/a-youth'
        },
        'football-youth/b-youth': {
            title: 'B-Jugend',
            link: 'football-youth/b-youth'
        },
        'football-youth/c-youth': {
            title: 'C-Jugend',
            link: 'football-youth/c-youth'
        },
        'football-youth/d-youth': {
            title: 'D-Jugend',
            link: 'football-youth/d-youth'
        },
        'football-youth/e-youth': {
            title: 'E-Jugend',
            link: 'football-youth/e-youth'
        },
        'football-youth/f-youth': {
            title: 'F-Jugend',
            link: 'football-youth/f-youth'
        },
        'football-youth/g-youth': {
            title: 'G-Jugend',
            link: 'football-youth/g-youth'
        }
    },
    sorting: {
        desktop: [
            {
                topItem: 'home'
            },
            {
                key: 'managers',
                title: 'Über uns',
                subItems: ['managers', 'sportshome', 'onlineshop', 'chronicle', 'statute', 'sponsors', 'privacy', 'request']
            },
            {
                key: 'football-adults',
                title: 'Herrenfußball',
                subItems: ['football-adults', 'football-adults/first-team', 'football-adults/second-team', 'football-adults/ah-team']
            },
            {
                key: 'football-youth',
                title: 'Jugendfußball',
                subItems: ['football-youth', 'football-youth/a-youth', 'football-youth/b-youth', 'football-youth/c-youth', 'football-youth/d-youth', 'football-youth/e-youth', 'football-youth/f-youth', 'football-youth/g-youth']
            }
        ],
        tablet: [
            {
                topItem: 'home'
            },
            {
                key: 'managers',
                title: 'Über uns',
                subItems: ['managers', 'sportshome', 'onlineshop', 'chronicle', 'statute', 'sponsors', 'privacy', 'request']
            },
            {
                key: 'football-adults',
                title: 'Herrenfußball',
                subItems: ['football-adults', 'football-adults/first-team', 'football-adults/second-team', 'football-adults/ah-team']
            },
            {
                key: 'football-youth',
                title: 'Jugendfußball',
                subItems: ['football-youth', 'football-youth/a-youth', 'football-youth/b-youth', 'football-youth/c-youth', 'football-youth/d-youth', 'football-youth/e-youth', 'football-youth/f-youth', 'football-youth/g-youth']
            }
        ],
        mobile: [
            {
                topItem: 'home'
            },
            {
                key: 'managers',
                title: 'Über uns',
                subItems: ['managers', 'sportshome', 'onlineshop', 'chronicle', 'statute', 'sponsors', 'privacy', 'request']
            },
            {
                key: 'football-adults',
                title: 'Herrenfußball',
                subItems: ['football-adults', 'football-adults/first-team', 'football-adults/second-team', 'football-adults/ah-team']
            },
            {
                key: 'football-youth',
                title: 'Jugendfußball',
                subItems: ['football-youth', 'football-youth/a-youth', 'football-youth/b-youth', 'football-youth/c-youth', 'football-youth/d-youth', 'football-youth/e-youth', 'football-youth/f-youth', 'football-youth/g-youth']
            }
        ]
    }
}
