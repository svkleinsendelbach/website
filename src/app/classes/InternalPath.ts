import { Link } from '../template/classes/link';
import { News } from '../template/classes/news';

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
  | 'nachrichten'
  | 'nachricht'
  | 'bearbeiten'
  | 'bearbeiten/anmelden'
  | 'bearbeiten/termine'
  | 'bearbeiten/termine/bearbeiten'
  | 'bearbeiten/nachrichten'
  | 'bearbeiten/nachrichten/bearbeiten'

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
    'nachrichten',
    'nachricht',
    'bearbeiten',
    'bearbeiten/anmelden',
    'bearbeiten/termine',
    'bearbeiten/termine/bearbeiten',
    'bearbeiten/nachrichten',
    'bearbeiten/nachrichten/bearbeiten'
  ];

  export const title: Record<InternalPath, string> = {
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
    'nachrichten': 'Alle Nachrichten',
    'nachricht': '',
    'bearbeiten': 'Website bearbeiten',
    'bearbeiten/anmelden': 'Anmelden',
    'bearbeiten/termine': 'Termine bearbeiten',
    'bearbeiten/termine/bearbeiten': 'Termin bearbeiten',
    'bearbeiten/nachrichten': 'Nachrichten bearbeiten',
    'bearbeiten/nachrichten/bearbeiten': 'Nachricht bearbeiten'
  };
}
export namespace InternalLink {
  export const all: Record<Exclude<InternalPath, 'nachricht'>, Link> & { 'nachricht': (news: News) => Link } = (() => {
    const allLinks = {
      'nachricht': (news: News) => {
        return Link.internalParam<InternalPath>(news.title, 'nachricht', news.id);
      },
      ...{} as Record<Exclude<InternalPath, 'nachricht'>, Link>
    };
    for (const internalPath of InternalPath.all) {
      if (internalPath === 'nachricht')
        continue;
      allLinks[internalPath] = Link.internal<InternalPath>(InternalPath.title[internalPath], internalPath);
    }
    return allLinks;
  })();
}
