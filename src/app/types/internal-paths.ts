export const internalPaths = {
    home: {
        title: 'Startseite',
        path: 'home'
    },
    managers: {
        title: 'Vorstandschaft',
        path: 'über-uns'
    },
    sportshome: {
        title: 'Sportheim',
        path: 'sportheim'
    },
    chronicle: {
        title: 'Chronik',
        path: 'chronik'
    },
    statute: {
        title: 'Satzung',
        path: 'satzung'
    },
    sponsors: {
        title: 'Sponsoren',
        path: 'sponsoren'
    },
    privacy: {
        title: 'Datenschutz',
        path: 'datenschutz'
    },
    request: {
        title: 'Mitgliedsantrag',
        path: 'mitgliedsantrag'
    },
    'football-adults': {
        title: 'Herrenfußball',
        path: 'fussball/herren'
    },
    'football-adults/first-team': {
        title: 'Erste Mannschaft',
        path: 'fussball/herren/erste-mannschaft'
    },
    'football-adults/second-team': {
        title: 'Zweite Mannschaft',
        path: 'fussball/herren/zweite-mannschaft'
    },
    'football-adults/ah-team': {
        title: 'Alte Herren',
        path: 'fussball/herren/alte-herren'
    },
    'football-youth': {
        title: 'Jugendfußball',
        path: 'fussball/jugend'
    },
    'football-youth/a-youth': {
        title: 'A-Jugend',
        path: 'fussball/jugend/a-jugend'
    },
    'football-youth/b-youth': {
        title: 'B-Jugend',
        path: 'fussball/jugend/b-jugend'
    },
    'football-youth/c-youth': {
        title: 'C-Jugend',
        path: 'fussball/jugend/c-jugend'
    },
    'football-youth/d-youth': {
        title: 'D-Jugend',
        path: 'fussball/jugend/d-jugend'
    },
    'football-youth/e-youth': {
        title: 'E-Jugend',
        path: 'fussball/jugend/e-jugend'
    },
    'football-youth/f-youth': {
        title: 'F-Jugend',
        path: 'fussball/jugend/f-jugend'
    },
    'football-youth/g-youth': {
        title: 'G-Jugend',
        path: 'fussball/jugend/g-jugend'
    },
    gymnastics: {
        title: 'Gymnastik',
        path: 'gymnastik'
    },
    dancing: {
        title: 'Tanzen',
        path: 'tanzen'
    },
    drive: {
        title: 'Anfahrt',
        path: 'anfahrt'
    },
    contact: {
        title: 'Kontakt',
        path: 'kontakt'
    },
    criticism: {
        title: 'Kritik und Vorschläge',
        path: 'kritik'
    },
    impressum: {
        title: 'Impressum',
        path: 'impressum'
    },
    reports: {
        title: 'Berichte',
        path: 'berichte'
    },
    'editing/login': {
        title: 'Anmelden',
        path: 'bearbeiten/anmelden'
    },
    'editing/main': {
        title: 'Bearbeiten',
        path: 'bearbeiten'
    },
    'editing/user-roles/edit': {
        title: 'Benutzerollen',
        path: 'bearbeiten/benutzerrollen/bearbeiten'
    },
    'editing/criticism/edit': {
        title: 'Kritik und Vorschläge',
        path: 'bearbeiten/kritik/bearbeiten'
    },
    'editing/occupancy': {
        title: 'Belegungsplan',
        path: 'bearbeiten/belegungsplan'
    },
    'editing/occupancy/edit': {
        title: 'Belegungsplan',
        path: 'bearbeiten/belegungsplan/bearbeiten'
    },
    'editing/events': {
        title: 'Termine',
        path: 'bearbeiten/termine'
    },
    'editing/events/edit': {
        title: 'Termine',
        path: 'bearbeiten/termine/bearbeiten'
    },
    'editing/reports': {
        title: 'Berichte',
        path: 'bearbeiten/berichte'
    },
    'editing/reports/edit': {
        title: 'Berichte',
        path: 'bearbeiten/berichte/bearbeiten'
    }
} satisfies Record<string, {
    title: string;
    path: string;
}>;

export type InternalPathKey = keyof typeof internalPaths;
