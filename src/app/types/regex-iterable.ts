export interface RegexMatch {
    groups: Record<string, string> | undefined;
    startIndex: number;
    endIndex: number;
}

export class RegexIterable implements Iterable<RegexMatch> {
    public constructor(
        private readonly regex: RegExp,
        private readonly value: string
    ) {}

    [Symbol.iterator](): RegexIterator {
        return new RegexIterator(this.regex, this.value);
    }
}

export class RegexIterator implements Iterator<RegexMatch, undefined> {
    private match: RegExpExecArray | null = null;

    public constructor(
        private readonly regex: RegExp,
        private readonly value: string
    ) {}

    next(): IteratorResult<RegexMatch, undefined> {
        this.match = this.regex.exec(this.value);
        if (this.match === null)
            return { done: true, value: undefined };
        if (this.match.index === this.regex.lastIndex)
            this.regex.lastIndex++;
        return {
            value: {
                groups: this.match.groups,
                startIndex: this.match.index,
                endIndex: this.regex.lastIndex - 1
            }
        };
    }
}
