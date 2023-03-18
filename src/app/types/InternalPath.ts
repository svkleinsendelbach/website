import { News } from '../modules/firebase-api/types/news';
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
  | 'nachricht'
  | 'nachrichten'
  | 'spiel'
  | 'bearbeiten'
  | 'bearbeiten/anmelden'
  | 'bearbeiten/termine'
  | 'bearbeiten/termine/bearbeiten'
  | 'bearbeiten/nachrichten'
  | 'bearbeiten/nachrichten/bearbeiten';

export namespace InternalPath {
  export const all: Exclude<InternalPath, 'nachricht' | 'spiel'>[] = [
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
      'bearbeiten',
      'bearbeiten/anmelden',
      'bearbeiten/termine',
      'bearbeiten/termine/bearbeiten',
      'bearbeiten/nachrichten',
      'bearbeiten/nachrichten/bearbeiten'
  ];

  export const title: Record<Exclude<InternalPath, 'nachricht' | 'spiel'>, string> = {
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
      'bearbeiten': 'Website bearbeiten',
      'bearbeiten/anmelden': 'Anmelden',
      'bearbeiten/termine': 'Termine bearbeiten',
      'bearbeiten/termine/bearbeiten': 'Termin bearbeiten',
      'bearbeiten/nachrichten': 'Nachrichten bearbeiten',
      'bearbeiten/nachrichten/bearbeiten': 'Nachricht bearbeiten'
  };
}
export namespace InternalLink {
  export const all: Record<Exclude<InternalPath, 'nachricht' | 'spiel'>, Link> & { 'nachricht'(news: News): Link; 'spiel'(id: string): Link } = (() => {
      const allLinks = {
          'nachricht': (news: News) => {
              return Link.internalParam<InternalPath>(news.title, 'nachricht', news.id);
          },
          'spiel': (id: string) => {
              return Link.internalParam<InternalPath>('Spiel', 'spiel', id);
          },
          ...{} as Record<Exclude<InternalPath, 'nachricht' | 'spiel'>, Link>
      };
      for (const internalPath of InternalPath.all) {
          allLinks[internalPath] = Link.internal<InternalPath>(InternalPath.title[internalPath], internalPath);
      }
      return allLinks;
  })();
}
