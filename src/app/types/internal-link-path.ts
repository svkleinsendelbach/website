import { Link } from './link';
import { mapRecord } from './record-array';

const internalLinkPathTitles = {
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
    'bearbeiten/newsletter': 'Newsletter bearbeiten',
    'bearbeiten/newsletter/bearbeiten': 'Newsletter bearbeiten',
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
    'kritik-vorschläge': 'Kritik und Vorschläge',
    'mitgliedsantrag': 'Mitgliedsantrag',
    'satzung': 'Satzung',
    'sponsoren': 'Unsere Sponsoren',
    'sportheim': 'Sportheim',
    'tanzen': 'Tanzen',
    'über-uns': 'Über uns',
    'newsletter': 'Alle Newsletter',
    'newsletter/anmelden': 'Newsletter Anmeldung',
    'newsletter/abmelden': 'Newsletter Abmeldung'
} satisfies Record<string, string>;

export type InternalLinkPath = keyof typeof internalLinkPathTitles;

export const internalLinks = mapRecord(internalLinkPathTitles, (_, key) => Link.internal(internalLinkPathTitles[key], key));
