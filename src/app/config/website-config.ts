import { InternalLink } from '../types/internal-path';
import { WebsiteConfig } from './website-config.d';

export const websiteConfig: WebsiteConfig = {
    openingHours: {
        monday: {
            title: 'Montag',
            time: 'geschlossen'
        },
        tuesday: {
            title: 'Dienstag',
            time: 'geschlossen'
        },
        wednesday: {
            title: 'Mittwoch',
            time: 'geschlossen'
        },
        thursday: {
            title: 'Donnerstag',
            time: 'geschlossen'
        },
        friday: {
            title: 'Freitag',
            time: '19 - 22 Uhr'
        },
        saturday: {
            title: 'Samstag',
            time: '18 - 21 Uhr'
        },
        sunday: {
            title: 'Sonntag',
            time: '9:30 – 12 Uhr und 17 – 20 Uhr, bei Heimspielen: 13:30 – 20 Uhr'
        }
    },
    managers: [
        {
            name: 'n.a.',
            function: '1. Vorsitzender',
            imageSrc: null
        },
        {
            name: 'Sebastian Schuldes',
            function: '2. Vorsitzender',
            imageSrc: null
        },
        {
            name: 'Josef Hoier',
            function: '3. Vorsitzender',
            imageSrc: null
        }
    ],
    coordinates: {
        sportshome: {
            lat: 49.59228025815224,
            lng: 11.157803435569505,
        },
        'a-field': {
            lat: 49.59270166222209,
            lng: 11.158047221011378,
        },
        'b-field': {
            lat: 49.589930544472566,
            lng: 11.162866292827417,
        }
    },
    contact: {
        'football-adults': [
            {
                function: 'Abteilungsleiter Fußball',
                name: 'Josef Hoier',
                mobile: {
                    number: '017657857884',
                    text: '0176 / 57857884'
                }
            }
        ],
        'first-team': [
            {
                function: 'Abteilungsleiter Fußball',
                name: 'Josef Hoier',
                mobile: {
                    number: '017657857884',
                    text: '0176 / 57857884'
                }
            },
            {
                function: 'Trainer',
                name: 'Simon Müller',
                mobile: {
                    number: '015901094261',
                    text: '0159 / 01094261'
                }
            }
        ],
        'second-team': [
            {
                function: 'Abteilungsleiter Fußball',
                name: 'Josef Hoier',
                mobile: {
                    number: '017657857884',
                    text: '0176 / 57857884'
                }
            },
            {
                function: 'Trainer',
                name: 'Tim Kellermann',
                mobile: {
                    number: '015112441784',
                    text: '0151 / 12441784'
                },
                email: 'kellermann.tim@gmx.de'
            }
        ],
        'ah-team': [
            {
                function: 'Ansprechpartner',
                name: 'Jürgen Drummer',
                mobile: {
                    number: '01703396915',
                    text: '0170 / 3396915'
                }
            }
        ],
        'football-youth': [
            {
                function: 'Jugendleiter Großfeld',
                name: 'Tim Kellermann',
                mobile: {
                    number: '015112441784',
                    text: '0151/ 12441784'
                },
                email: 'kellermann.tim@gmx.de'
            },
            {
                function: 'Jugendleiter Kleinfeld',
                name: 'Matthias Iberl',
                mobile: {
                    number: '01606120508',
                    text: '0160 / 6120508'
                }
            },
            {
                function: 'Jugendleiter Kleinfeld',
                name: 'Stefan Seubert',
                mobile: {
                    number: '01712447114',
                    text: '0171 / 2447114'
                }
            }
        ],
        'c-youth': [
            {
                function: 'Trainer',
                name: 'Andy Lorenz',
                mobile: {
                    number: '01772485421',
                    text: '0177 / 2485421'
                }
            },
            {
                function: 'Trainer',
                name: 'Steven Kellner',
                mobile: {
                    number: '017653935160',
                    text: '0176 / 53935160'
                }
            },
            {
                function: 'Trainer',
                name: 'Florian Veitengruber',
                mobile: {
                    number: '017670820050',
                    text: '0176 / 70820050'
                }
            }
        ],
        'e-youth': [
            {
                function: 'Trainer',
                name: 'Matthias Iberl',
                mobile: {
                    number: '01606120508',
                    text: '0160 / 6120508'
                }
            },
            {
                function: 'Trainer',
                name: 'Steven Kellner',
                mobile: {
                    number: '01702911886',
                    text: '0170 / 2911886'
                }
            }
        ],
        'f-youth': [
            {
                function: 'Trainer',
                name: 'Bernd Aumüller',
                mobile: {
                    number: '01729915405',
                    text: '0172 / 9915405'
                }
            },
            {
                function: 'Trainer',
                name: 'Stefan Seubert',
                mobile: {
                    number: '01712447114',
                    text: '0171 / 2447114'
                }
            }
        ],
        'g-youth': [
            {
                function: 'Trainer',
                name: 'Markus Schmitt',
                mobile: {
                    number: '017632844763',
                    text: '0176 / 32844763'
                }
            },
            {
                function: 'Trainer',
                name: 'Dominic Schmitt',
                mobile: {
                    number: '01708087516',
                    text: '0170 / 8087516'
                }
            }
        ]
    },
    bfvTeamIds: {
        'first-team': '02EO9A1SNG000000VS5489B2VSAS84KM',
        'second-team': '02EO9BK2JS000000VS5489B2VSAS84KM',
        'c-youth-1': '02GKSI5N8O000037VS5489B4VSM5S7RJ',
        'c-youth-2': '02GKSOGF8K000006VS5489B4VSM5S7RJ',
        'e-youth': '01L3BHPM88000000VV0AG811VV4PB99G',
        'f-youth': '01DVQP0J40000000VV0AG80NVSNQSIQV'
    },
    homeBanner: [
        {
            imageSource: 'assets/images/mannschaft.png',
            title: 'Herren Mannschaft',
            subTitle: '1. und 2. Mannschaft 2019 / 2020',
            link: InternalLink.all['fussball/herren'],
            isCurrent: true
        },
        {
            imageSource: 'assets/images/kleinfeldmannschaften.jpg',
            title: 'Kleinfeld Mannschaften',
            link: InternalLink.all['fussball/jugend'],
            isCurrent: false
        }
    ],
    mapOptions: {
        zoom: 14,
        maxZoom: 20,
        minZoom: 5,
        scrollwheel: false,
        clickableIcons: false,
        mapTypeId: 'hybrid'
    }
};
