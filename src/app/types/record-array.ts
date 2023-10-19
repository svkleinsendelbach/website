export function recordKeys<T extends Record<string, unknown>>(record: T): (keyof T)[] {
    return Object.keys(record);
}

export function recordValues<T extends Record<string, unknown>>(record: T): T[keyof T][] {
    return Object.values(record) as T[keyof T][];
}

export function recordEntries<T extends Record<string, unknown>>(record: T): { key: keyof T; value: T[keyof T] }[] {
    return (Object.entries(record) as [keyof T, T[keyof T]][])
        .map(entry => ({
            key: entry[0],
            value: entry[1]
        }));
}

export function mapRecord<T extends Record<string, unknown>, U>(record: T, callbackfn: (value: T[keyof T], key: keyof T) => U): Record<keyof T, U> {
    const newRecord = {} as Record<keyof T, U>;
    for (const entry of recordEntries(record))
        newRecord[entry.key] = callbackfn(entry.value, entry.key);
    return newRecord;
}

export function includesAll<T>(array: T[], expectedElements: T[]): boolean {
    for (const expectedElement of expectedElements) {
        if (!array.includes(expectedElement))
            return false;
    }
    return true;
}
