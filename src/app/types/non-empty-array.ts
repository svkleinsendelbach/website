export type NonEmptyArray<T> = [T, ...T[]];

export function isNonEmpty<T>(array: T[]): array is NonEmptyArray<T> {
    return array.length !== 0;
}

export namespace NonEmptyArray {
    export function fromArray<T>(array: T[]): NonEmptyArray<T> | null {
        if (isNonEmpty(array))
            return array;
        return null;
    }
}
