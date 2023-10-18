import { sponsorsConfig } from './sponsors-config';
import { WebsiteConfig } from './website-config.d';

export const websiteConfig: WebsiteConfig = {
    openingHours: {
        monday: {
            time: 'geschlossen',
            title: 'Montag'
        },
        tuesday: {
            time: 'geschlossen',
            title: 'Dienstag'
        },
        wednesday: {
            time: 'geschlossen',
            title: 'Mittwoch'
        },
        thursday: {
            time: 'geschlossen',
            title: 'Donnerstag'
        },
        friday: {
            time: '19 - 22 Uhr',
            title: 'Freitag'
        },
        saturday: {
            time: '18 - 21 Uhr',
            title: 'Samstag'
        },
        sunday: {
            time: '9:30 - 12 Uhr und 17 - 20 Uhr, bei Heimspielen: 13:30 - 20 Uhr',
            title: 'Sonntag'
        }
    },
    managers: [
        {
            function: '1. Vorsitzender',
            imageSrc: null,
            name: 'n.a.'
        },
        {
            function: '2. Vorsitzender',
            imageSrc: null,
            name: 'Sebastian Schuldes'
        },
        {
            function: '3. Vorsitzender',
            imageSrc: null,
            name: 'Josef Hoier'
        }
    ],
    coordinates: {
        'a-field': {
            lat: 49.59270166222209,
            lng: 11.158047221011378
        },
        'b-field': {
            lat: 49.589930544472566,
            lng: 11.162866292827417
        },
        'sportshome': {
            lat: 49.59228025815224,
            lng: 11.157803435569505
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
                },
                email: null,
                telephone: null
            }
        ],
        'first-team': [
            {
                function: 'Abteilungsleiter Fußball',
                name: 'Josef Hoier',
                mobile: {
                    number: '017657857884',
                    text: '0176 / 57857884'
                },
                email: null,
                telephone: null
            },
            {
                function: 'Trainer',
                name: 'Simon Müller',
                mobile: {
                    number: '015901094261',
                    text: '0159 / 01094261'
                },
                email: null,
                telephone: null
            }
        ],
        'second-team': [
            {
                function: 'Abteilungsleiter Fußball',
                name: 'Josef Hoier',
                mobile: {
                    number: '017657857884',
                    text: '0176 / 57857884'
                },
                email: null,
                telephone: null
            },
            {
                function: 'Trainer',
                name: 'Tim Kellermann',
                mobile: {
                    number: '015112441784',
                    text: '0151 / 12441784'
                },
                email: 'kellermann.tim@gmx.de',
                telephone: null
            }
        ],
        'ah-team': [
            {
                function: 'Ansprechpartner',
                name: 'Jürgen Drummer',
                mobile: {
                    number: '01703396915',
                    text: '0170 / 3396915'
                },
                email: null,
                telephone: null
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
                email: 'kellermann.tim@gmx.de',
                telephone: null
            },
            {
                function: 'Jugendleiter Kleinfeld',
                name: 'Matthias Iberl',
                mobile: {
                    number: '01606120508',
                    text: '0160 / 6120508'
                },
                email: null,
                telephone: null
            },
            {
                function: 'Jugendleiter Kleinfeld',
                name: 'Stefan Seubert',
                mobile: {
                    number: '01712447114',
                    text: '0171 / 2447114'
                },
                email: null,
                telephone: null
            }
        ],
        'c-youth': [
            {
                function: 'Trainer',
                name: 'Andy Lorenz',
                mobile: {
                    number: '01772485421',
                    text: '0177 / 2485421'
                },
                email: null,
                telephone: null
            },
            {
                function: 'Trainer',
                name: 'Steven Kellner',
                mobile: {
                    number: '017653935160',
                    text: '0176 / 53935160'
                },
                email: null,
                telephone: null
            },
            {
                function: 'Trainer',
                name: 'Florian Veitengruber',
                mobile: {
                    number: '017670820050',
                    text: '0176 / 70820050'
                },
                email: null,
                telephone: null
            }
        ],
        'e-youth': [
            {
                function: 'Trainer',
                name: 'Matthias Iberl',
                mobile: {
                    number: '01606120508',
                    text: '0160 / 6120508'
                },
                email: null,
                telephone: null
            },
            {
                function: 'Trainer',
                name: 'Steven Kellner',
                mobile: {
                    number: '01702911886',
                    text: '0170 / 2911886'
                },
                email: null,
                telephone: null
            }
        ],
        'f-youth': [
            {
                function: 'Trainer',
                name: 'Bernd Aumüller',
                mobile: {
                    number: '01729915405',
                    text: '0172 / 9915405'
                },
                email: null,
                telephone: null
            },
            {
                function: 'Trainer',
                name: 'Stefan Seubert',
                mobile: {
                    number: '01712447114',
                    text: '0171 / 2447114'
                },
                email: null,
                telephone: null
            }
        ],
        'g-youth': [
            {
                function: 'Trainer',
                name: 'Markus Schmitt',
                mobile: {
                    number: '017632844763',
                    text: '0176 / 32844763'
                },
                email: null,
                telephone: null
            },
            {
                function: 'Trainer',
                name: 'Dominic Schmitt',
                mobile: {
                    number: '01708087516',
                    text: '0170 / 8087516'
                },
                email: null,
                telephone: null
            }
        ]
    },
    bfvTeamIds: {
        'c-youth-1': '02GKSI5N8O000037VS5489B4VSM5S7RJ',
        'c-youth-2': '02GKSOGF8K000006VS5489B4VSM5S7RJ',
        'e-youth': '01L3BHPM88000000VV0AG811VV4PB99G',
        'f-youth': '01DVQP0J40000000VV0AG80NVSNQSIQV',
        'first-team': '02EO9A1SNG000000VS5489B2VSAS84KM',
        'second-team': '02EO9BK2JS000000VS5489B2VSAS84KM'
    },
    homeBanner: [
        {
            imageSource: 'assets/images/mannschaft.png',
            isCurrent: false,
            link: 'fussball/herren',
            subTitle: '1. und 2. Mannschaft 2019 / 2020',
            title: 'Herren Mannschaft'
        },
        {
            imageSource: 'assets/images/kleinfeldmannschaften.jpg',
            isCurrent: false,
            link: 'fussball/jugend',
            subTitle: null,
            title: 'Kleinfeld Mannschaften'
        }
    ],
    mapOptions: {
        clickableIcons: false,
        mapTypeId: 'hybrid',
        maxZoom: 20,
        minZoom: 5,
        scrollwheel: false,
        zoom: 14
    },
    footerContacts: [
        {
            function: 'Sportheim',
            name: 'Sportverein Kleinsendelbach',
            street: 'Hauptstraße 21',
            city: '91077 Kleinsendelbach',
            telephone: {
                number: '091268304',
                text: '09126 / 8304'
            }
        },
        {
            function: 'Vertretungsberechtigter Vorstand',
            name: 'Sebastian Schuldes',
            street: 'Mühlenstraße 2',
            city: '91077 Kleinsendelbach',
            telephone: {
                number: '015150405030',
                text: '01515 / 0405030'
            }
        }
    ],
    sponsors: sponsorsConfig
};
