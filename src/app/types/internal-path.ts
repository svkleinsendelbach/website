import { Link } from './link';

export type InternalPath =
    | 'anfahrt'
    | 'bearbeiten'
    | 'bearbeiten/anmelden'
    | 'bearbeiten/belegungsplan'
    | 'bearbeiten/belegungsplan/bearbeiten'
    | 'bearbeiten/benutzer-rollen'
    | 'bearbeiten/berichte'
    | 'bearbeiten/berichte/bearbeiten'
    | 'bearbeiten/kritik-vorschläge'
    | 'bearbeiten/termine'
    | 'bearbeiten/termine/bearbeiten'
    | 'berichte'
    | 'chroniken'
    | 'datenschutz'
    | 'fussball/herren'
    | 'fussball/herren/alte-herren'
    | 'fussball/herren/erste-mannschaft'
    | 'fussball/herren/zweite-mannschaft'
    | 'fussball/jugend'
    | 'fussball/jugend/c-jugend'
    | 'fussball/jugend/e-jugend'
    | 'fussball/jugend/f-jugend'
    | 'fussball/jugend/g-jugend'
    | 'gymnastik'
    | 'home'
    | 'impressum'
    | 'kontakt'
    | 'mitgliedsantrag'
    | 'satzung'
    | 'sportheim'
    | 'tanzen'
    | 'über-uns';

export namespace InternalPath {
    export const all: InternalPath[] = [
        'home',
        'über-uns',
        'sportheim',
        'chroniken',
        'satzung',
        'datenschutz',
        'mitgliedsantrag',
        'fussball/herren',
        'fussball/herren/erste-mannschaft',
        'fussball/herren/zweite-mannschaft',
        'fussball/herren/alte-herren',
        'fussball/jugend',
        'fussball/jugend/c-jugend',
        'fussball/jugend/e-jugend',
        'fussball/jugend/f-jugend',
        'fussball/jugend/g-jugend',
        'gymnastik',
        'tanzen',
        'anfahrt',
        'kontakt',
        'impressum',
        'berichte',
        'bearbeiten',
        'bearbeiten/anmelden',
        'bearbeiten/belegungsplan',
        'bearbeiten/belegungsplan/bearbeiten',
        'bearbeiten/benutzer-rollen',
        'bearbeiten/kritik-vorschläge',
        'bearbeiten/termine',
        'bearbeiten/termine/bearbeiten',
        'bearbeiten/berichte',
        'bearbeiten/berichte/bearbeiten'
    ];

    export const title: Record<InternalPath, string> = {
        'anfahrt': 'Anfahrt',
        'bearbeiten': 'Website bearbeiten',
        'bearbeiten/anmelden': 'Anmelden',
        'bearbeiten/belegungsplan': 'Belegungsplan',
        'bearbeiten/belegungsplan/bearbeiten': 'Belegungsplan bearbeiten',
        'bearbeiten/benutzer-rollen': 'Benutzer Rollen',
        'bearbeiten/berichte': 'Berichte bearbeiten',
        'bearbeiten/berichte/bearbeiten': 'Bericht bearbeiten',
        'bearbeiten/kritik-vorschläge': 'Kritik und Vorschläge',
        'bearbeiten/termine': 'Termine bearbeiten',
        'bearbeiten/termine/bearbeiten': 'Termin bearbeiten',
        'berichte': 'Alle Berichte',
        'chroniken': 'Chronik',
        'datenschutz': 'Datenschutz',
        'fussball/herren': 'Herrenfussball',
        'fussball/herren/alte-herren': 'Alte Herren',
        'fussball/herren/erste-mannschaft': '1. Mannschaft',
        'fussball/herren/zweite-mannschaft': '2. Mannschaft',
        'fussball/jugend': 'Jugendfussball',
        'fussball/jugend/c-jugend': 'C-Jugend',
        'fussball/jugend/e-jugend': 'E-Jugend',
        'fussball/jugend/f-jugend': 'F-Jugend',
        'fussball/jugend/g-jugend': 'G-Jugend',
        'gymnastik': 'Gymnastik',
        'home': 'Home',
        'impressum': 'Impressum',
        'kontakt': 'Kontakt',
        'mitgliedsantrag': 'Mitgliedsantrag',
        'satzung': 'Satzung',
        'sportheim': 'Sportheim',
        'tanzen': 'Tanzen',
        'über-uns': 'Über uns'
    };
}

export namespace InternalLink {
    export const all: Record<InternalPath, Link> = ((): Record<InternalPath, Link> => {
        const allLinks = {} as Record<InternalPath, Link>;
        for (const internalPath of InternalPath.all)
            allLinks[internalPath] = Link.internal<InternalPath>(InternalPath.title[internalPath], internalPath);
        return allLinks;
    })();
}
