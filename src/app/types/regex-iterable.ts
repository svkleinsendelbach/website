export interface RegexMatch {
    groups: Record<string, string> | null;
    startIndex: number;
    endIndex: number;
}

export class RegexIterator implements Iterator<RegexMatch> {
    private match: RegExpExecArray | null = null;

    public constructor(
        private readonly regex: RegExp,
        private readonly value: string
    ) {}

    public next(): IteratorResult<RegexMatch> {
        this.match = this.regex.exec(this.value);
        if (this.match === null) {
            return {
                done: true,
                value: null
            };
        }
        if (this.match.index === this.regex.lastIndex)
            this.regex.lastIndex++;
        return {
            value: {
                endIndex: this.regex.lastIndex - 1,
                groups: this.match.groups ?? null,
                startIndex: this.match.index
            }
        };
    }
}

export class RegexIterable implements Iterable<RegexMatch> {
    public constructor(
        private readonly regex: RegExp,
        private readonly value: string
    ) {}

    public [Symbol.iterator](): RegexIterator {
        return new RegexIterator(this.regex, this.value);
    }
}
