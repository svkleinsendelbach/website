const internalPathTitles = {
    home: 'Startseite'
} satisfies Record<string, string>;

export type InternalPath = keyof typeof internalPathTitles;
