import { FooterData } from "kleinsendelbach-website-library";
import { InternalPathKey } from "../types/internal-paths";

export const footerConfig: FooterData<InternalPathKey> = {
    appearanceChangerShown: true,
    copyright: '© Copyright 2024 SV Kleinsendelbach e.V.',
    editLink: 'editing/main',
    links: [
        {
            title: 'Anfahrt',
            link: 'drive'
        },
        {
            title: 'Kontakt',
            link: 'contact'
        },
        {
            title: 'Newsletter',
            link: 'newsletter'
        },
        {
            title: 'Kritik und Vorschläge',
            link: 'criticism'
        },
        {
            title: 'Impressum',
            link: 'impressum'
        }
    ],
    contacts: [
        {
            function: 'Sportheim',
            name: 'Sportverein Kleinsendelbach',
            address: {
                street: 'Hauptstraße 21',
                city: '91077 Kleinsendelbach'
            },
            phone: '09126 / 8304',
            mobile: null,
            email: null
        },
        {
            function: '2. Vorstand',
            name: 'Sebastian Schuldes',
            address: {
                street: 'Mühlenstraße 2',
                city: '91077 Kleinsendelbach'
            },
            phone: null,
            mobile: '01515 / 0405030',
            email: 'vorstand@sv-kleinsendelbach.de'
        },
        {
            function: '3. Vorstand',
            name: 'Josef Hoier',
            address: {
                street: 'Rosenstraße 11',
                city: '91077 Kleinsendelbach'
            },
            phone: null,
            mobile: null,
            email: null
        }
    ]
}
