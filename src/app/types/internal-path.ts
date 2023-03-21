import { Link } from './link';

export type InternalPath =
  | 'home'
  | 'über-uns'
  | 'sportheim'
  | 'chroniken'
  | 'satzung'
  | 'datenschutz'
  | 'mitgliedsantrag'
  | 'fussball/herren'
  | 'fussball/herren/erste-mannschaft'
  | 'fussball/herren/zweite-mannschaft'
  | 'fussball/herren/alte-herren'
  | 'fussball/jugend'
  | 'fussball/jugend/c-jugend'
  | 'fussball/jugend/e-jugend'
  | 'fussball/jugend/f-jugend'
  | 'fussball/jugend/g-jugend'
  | 'gymnastik'
  | 'tanzen'
  | 'anfahrt'
  | 'kontakt'
  | 'impressum'
  | 'berichte'
  | 'spiel'
  | 'bearbeiten'
  | 'bearbeiten/anmelden'
  | 'bearbeiten/termine'
  | 'bearbeiten/termine/bearbeiten'
  | 'bearbeiten/berichte'
  | 'bearbeiten/berichte/bearbeiten';

export namespace InternalPath {
    export const all: Exclude<InternalPath, 'spiel'>[] = [
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
        'bearbeiten/termine',
        'bearbeiten/termine/bearbeiten',
        'bearbeiten/berichte',
        'bearbeiten/berichte/bearbeiten'
    ];

    export const title: Record<Exclude<InternalPath, 'spiel'>, string> = {
        'home': 'Home',
        'über-uns': 'Über uns',
        'sportheim': 'Sportheim',
        'chroniken': 'Chronik',
        'satzung': 'Satzung',
        'datenschutz': 'Datenschutz',
        'mitgliedsantrag': 'Mitgliedsantrag',
        'fussball/herren': 'Herrenfussball',
        'fussball/herren/erste-mannschaft': '1. Mannschaft',
        'fussball/herren/zweite-mannschaft': '2. Mannschaft',
        'fussball/herren/alte-herren': 'Alte Herren',
        'fussball/jugend': 'Jugendfussball',
        'fussball/jugend/c-jugend': 'C-Jugend',
        'fussball/jugend/e-jugend': 'E-Jugend',
        'fussball/jugend/f-jugend': 'F-Jugend',
        'fussball/jugend/g-jugend': 'G-Jugend',
        'gymnastik': 'Gymnastik',
        'tanzen': 'Tanzen',
        'anfahrt': 'Anfahrt',
        'kontakt': 'Kontakt',
        'impressum': 'Impressum',
        'berichte': 'Alle Berichte',
        'bearbeiten': 'Website bearbeiten',
        'bearbeiten/anmelden': 'Anmelden',
        'bearbeiten/termine': 'Termine bearbeiten',
        'bearbeiten/termine/bearbeiten': 'Termin bearbeiten',
        'bearbeiten/berichte': 'Berichte bearbeiten',
        'bearbeiten/berichte/bearbeiten': 'Bericht bearbeiten'
    };
}
export namespace InternalLink {
    export const all: Record<Exclude<InternalPath, 'spiel'>, Link> & { 'spiel'(id: string): Link } = (() => {
        const allLinks = {
            'spiel': (id: string) => {
                return Link.internalParam<InternalPath>('Spiel', 'spiel', id);
            },
            ...{} as Record<Exclude<InternalPath, 'spiel'>, Link>
        };
        for (const internalPath of InternalPath.all) {
            allLinks[internalPath] = Link.internal<InternalPath>(InternalPath.title[internalPath], internalPath);
        }
        return allLinks;
    })();
}
