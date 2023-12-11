import { ContactData } from "kleinsendelbach-website-library";

export const contactsConfig = {
    'josef-hoier': {
        name: 'Josef Hoier',
        profileImageSrc: null,
        phone: null,
        mobile: '0176 / 57857884',
        email: null,
    },
    'benedikt-mehl': {
        name: 'Benedikt Mehl',
        profileImageSrc: null,
        phone: null,
        mobile: '0176 / 31463566',
        email: null
    },
    'sven-rauh': {
        name: 'Sven Rauh',
        profileImageSrc: null,
        phone: null,
        mobile: '0176 / 32279200',
        email: null
    },
    'florian-frosch': {
        name: 'Florian Frosch',
        profileImageSrc: null,
        phone: null,
        mobile: '0176 / 63479140',
        email: null
    },
    'tim-kellermann': {
        name: 'Tim Kellermann',
        profileImageSrc: null,
        phone: null,
        mobile: '0151 / 12441784',
        email: 'kellermann.tim@gmx.de'
    },
    'juergen-drummer': {
        name: 'Jürgen Drummer',
        profileImageSrc: null,
        phone: null,
        mobile: '0170 / 3396915',
        email: null
    },
    'stefan-seubert': {
        name: 'Stefan Seubert',
        profileImageSrc: null,
        phone: null,
        mobile: '0171 / 2447114',
        email: null
    },
    'matthias-iberl': {
        name: 'Matthias Iberl',
        profileImageSrc: null,
        phone: null,
        mobile: '0160 / 6120508',
        email: null
    },
    'fredi-woelfel': {
        name: 'Fredi Wölfel',
        profileImageSrc: null,
        phone: null,
        mobile: '0170 / 2911886',
        email: null
    },
    'max-kolder': {
        name: 'Max Kolder',
        profileImageSrc: null,
        phone: null,
        mobile: '0176 / 68235780',
        email: null
    },
    'tobias-habermann': {
        name: 'Tobias Habermann',
        profileImageSrc: null,
        phone: null,
        mobile: null,
        email: null
    },
    'alexander-burkhard': {
        name: 'Alexander Burkhard',
        profileImageSrc: null,
        phone: null,
        mobile: '0176 / 30163453',
        email: null
    },
    'matthias-sitter': {
        name: 'Matthias Sitter',
        profileImageSrc: null,
        phone: null,
        mobile: '0160 / 1815557',
        email: null
    },
    'jochen-holzenleuchter': {
        name: 'Jochen Holzenleuchter',
        profileImageSrc: null,
        phone: null,
        mobile: '0151 / 16122735',
        email: null
    },
    'jannik-dressel': {
        name: 'Jannik Dressel',
        profileImageSrc: null,
        phone: null,
        mobile: '0157 / 36281465',
        email: null
    },
    'andreas-lorenz': {
        name: 'Andreas Lorenz',
        profileImageSrc: null,
        phone: null,
        mobile: '0177 / 2485421',
        email: null
    },
    'lars-schmieder': {
        name: 'Lars Schmieder',
        profileImageSrc: null,
        phone: null,
        mobile: '0177 / 2833158',
        email: null
    },
    'ulrich-gruetzner': {
        name: 'Ulrich Grützner',
        profileImageSrc: null,
        phone: null,
        mobile: '0172 / 1087733',
        email: null
    },
    'peter-hoefler': {
        name: 'Peter Höfler',
        profileImageSrc: null,
        phone: null,
        mobile: '0176 / 32445068',
        email: null
    },
    'steven-kellner': {
        name: 'Steven Kellner',
        profileImageSrc: null,
        phone: null,
        mobile: '0176 / 53935160',
        email: null
    },
    'juergen-haas': {
        name: 'Jürgen Haas',
        profileImageSrc: null,
        phone: null,
        mobile: '0176 / 45732674',
        email: null
    },
    'robin-kugler': {
        name: 'Robin Kugler',
        profileImageSrc: null,
        phone: null,
        mobile: '0174 / 45732674',
        email: null
    },
    'jan-wichmann': {
        name: 'Jan Wichmann',
        profileImageSrc: null,
        phone: null,
        mobile: '0170 / 3866891',
        email: null
    },
    'vitalij-britvak': {
        name: 'Vitalij Britvak',
        profileImageSrc: null,
        phone: null,
        mobile: '0176 / 24364661',
        email: null
    },
    'samuel-jakob': {
        name: 'Samuel Jakob',
        profileImageSrc: null,
        phone: null,
        mobile: null,
        email: null
    },
    'jonas-nienaber': {
        name: 'Jonas Nienaber',
        profileImageSrc: null,
        phone: null,
        mobile: '0151 / 27244253',
        email: null
    },
    'felix-heinke': {
        name: 'Felix Heinke',
        profileImageSrc: null,
        phone: null,
        mobile: '0152 / 34558709',
        email: null
    },
    'bernd-aumueller': {
        name: 'Bernd Aumüller',
        profileImageSrc: null,
        phone: null,
        mobile: '0172 / 9915405',
        email: null
    },
    'markus-schmitt': {
        name: 'Markus Schmitt',
        profileImageSrc: null,
        phone: null,
        mobile: '0176 / 32844763',
        email: null
    },
    'dominic-schmitt': {
        name: 'Dominic Schmitt',
        profileImageSrc: null,
        phone: null,
        mobile: '0170 / 8087516',
        email: null
    }
} satisfies Record<string, Omit<ContactData, 'function'>>;

export function contact(_function: string, name: keyof typeof contactsConfig): ContactData {
    return {
        function: _function,
        ...contactsConfig[name]
    }
}
