import { RegexIterable } from 'src/app/types/regex-iterable';

class Elements implements Iterable<HTMLElement | string> {
    public constructor(
        private readonly elements: (HTMLElement | string)[] = []
    ) {}

    public get stringElements(): string[] {
        return this.elements.flatMap(element => typeof element === 'string' ? element : []);
    }

    public get htmlElements(): HTMLElement[] {
        return this.elements.flatMap(element => typeof element === 'string' ? [] : element);
    }

    public static fromContent(content: string): Elements {
        return new Elements([content]);
    }

    public [Symbol.iterator](): IterableIterator<HTMLElement | string> {
        return this.elements[Symbol.iterator]();
    }

    public push(element: HTMLElement | string) {
        this.elements.push(element);
    }

    public copy(elements: 'all' | 'html' | 'string' | ['html', 'string'] | ['string', 'html'] = 'all'): Elements {
        if (elements === 'all')
            return new Elements();
        if (elements === 'string')
            return new Elements(this.stringElements);
        if (elements === 'html')
            return new Elements(this.htmlElements);
        return new Elements(this.elements);
    }
}

export class ReportMessageParser {
    public parse(message: string): Elements | null {
        const parsers = [
            // eslint-disable-next-line @typescript-eslint/unbound-method
            this.parseImages, this.parseLinks, this.parseNewLines, this.parseHorizonalLine, this.parseFormatting
        ];
        let elements: Elements | null = Elements.fromContent(message);
        for (const parser of parsers) {
            if (elements === null)
                return null;
            elements = parser(elements);
        }
        return elements;
    }

    private parseImages(elements: Elements): Elements | null {
        const result = elements.copy('html');
        for (const element of elements.stringElements) {
            let lastIndex = 0;
            const regexIt = new RegexIterable(/!\[(?<title>[\S\s]+?)\]\((?<link>[\S\s]+?)(?:\s*,\s*(?<width>\d*%)\s*)?\)/gu, element);
            for (const match of regexIt) {
                result.push(element.slice(lastIndex, match.startIndex));
                if (!match.groups)
                    continue;
                const image = document.createElement('img');
                image.src = match.groups['link'];
                image.title = match.groups['title'];
                image.alt = match.groups['title'];
                if ('width' in match.groups)
                    image.style.width = match.groups['width'];
                result.push(image);
                lastIndex = match.endIndex + 1;
            }
            result.push(element.slice(lastIndex));
        }
        return result;
    }

    private parseLinks(elements: Elements): Elements | null {
        const result = elements.copy('html');
        for (const element1 of elements.stringElements) {
            let lastIndex = 0;
            const regexIt = new RegexIterable(/\[(?<content>[\S\s]+?)\]\((?<link>[\S\s]+?)\)/gu, element1);
            for (const match of regexIt) {
                result.push(element1.slice(lastIndex, match.startIndex));
                if (!match.groups)
                    continue;
                const link = document.createElement('a');
                link.href = match.groups['link'];
                link.target = '_blank';
                const content = this.parseFormatting(new Elements([match.groups['content']]));
                if (content === null)
                    return null;
                for (const element2 of content)
                    link.append(element2);
                link.title = link.innerText;
                result.push(link);
                lastIndex = match.endIndex + 1;
            }
            result.push(element1.slice(lastIndex));
        }
        return result;
    }

    private parseNewLines(elements: Elements): Elements | null {
        const result = elements.copy('html');
        for (const element of elements.stringElements) {
            const regexIt = new RegexIterable(/\n/gu, element);
            let lastIndex = 0;
            for (const match of regexIt) {
                result.push(element.slice(lastIndex, match.startIndex));
                result.push(document.createElement('br'));
                lastIndex = match.endIndex + 1;
            }
            result.push(element.slice(lastIndex));
        }
        return result;
    }

    private parseHorizonalLine(elements: Elements): Elements | null {
        const result = elements.copy('html');
        for (const element of elements.stringElements) {
            const match = (/^\s*---\s*$/gu).exec(element);
            if (match) {
                const line = document.createElement('div');
                line.classList.add('horizontal-line');
                line.append(document.createElement('div'));
                result.push(line);
            } else
                result.push(element);
        }
        return result;
    }

    private parseFormatting(elements: Elements): Elements | null {
        const result = new Elements();
        let components: ['*' | '**' | '***', (HTMLElement | string)[]][] = [];
        for (const element of elements) {
            if (typeof element !== 'string') {
                if (components.length === 0)
                    result.push(element);
                else
                    components[components.length - 1][1].push(element);
                continue;
            }
            let lastIndex = 0;
            const regexIt = new RegexIterable(/(?<three>\*\*\*)|(?<two>\*\*)|(?<one>\*)/gu, element);
            for (const match of regexIt) {
                if (!match.groups)
                    continue;
                const format = match.groups['three'] ? '***' : match.groups['two'] ? '**' : match.groups['one'] ? '*' : null;
                if (format === null)
                    continue;
                const currentValue = element.slice(lastIndex, match.startIndex);
                let formats = components.reduce((_result, value) => _result === '' ? value[0] : `${_result}|${value[0]}`, '');
                formats += (formats === '' ? '' : '|') + format;
                switch (formats) {
                case '*':
                    result.push(currentValue);
                    components = [['*', []]];
                    break;
                case '**':
                    result.push(currentValue);
                    components = [['**', []]];
                    break;
                case '***':
                    result.push(currentValue);
                    components = [['***', []]];
                    break;
                case '*|*':
                    result.push(this.createElement('italic', [...components[0][1], currentValue]));
                    components = [];
                    break;
                case '*|**':
                    components[0][1].push(currentValue);
                    components.push(['**', []]);
                    break;
                case '*|***':
                    result.push(this.createElement('italic', [...components[0][1], currentValue]));
                    components = [['**', []]];
                    break;
                case '**|*':
                    components[0][1].push(currentValue);
                    components.push(['*', []]);
                    break;
                case '**|**':
                    result.push(this.createElement('strong', [...components[0][1], currentValue]));
                    components = [];
                    break;
                case '**|***':
                    result.push(this.createElement('strong', [...components[0][1], currentValue]));
                    components = [['*', []]];
                    break;
                case '***|*':
                    components = [['**', [this.createElement('italic', [...components[0][1], currentValue])]]];
                    break;
                case '***|**':
                    components = [['*', [this.createElement('strong', [...components[0][1], currentValue])]]];
                    break;
                case '***|***':
                    result.push(this.createElement('italic', this.createElement('strong', [...components[0][1], currentValue])));
                    components = [];
                    break;
                case '*|**|**':
                    components = [['*', [...components[0][1], this.createElement('strong', [...components[1][1], currentValue])]]];
                    break;
                case '*|**|***':
                    result.push(this.createElement('italic', [...components[0][1], this.createElement('strong', [...components[1][1], currentValue])]));
                    components = [];
                    break;
                case '**|*|*':
                    components = [['**', [...components[0][1], this.createElement('italic', [...components[1][1], currentValue])]]];
                    break;
                case '**|*|***':
                    result.push(this.createElement('strong', [...components[0][1], this.createElement('italic', [...components[1][1], currentValue])]));
                    components = [];
                    break;
                default:
                    return null;
                }
                lastIndex = match.endIndex + 1;
            }
            if (components.length === 0)
                result.push(element.slice(lastIndex));
            else
                components[components.length - 1][1].push(element.slice(lastIndex));
        }
        if (components.length !== 0)
            return null;
        return result;
    }

    private createElement(type: 'italic' | 'strong', elements: (HTMLElement | string)[] | HTMLElement | string): HTMLElement {
        const element = document.createElement('div');
        element.classList.add(type);
        if (Array.isArray(elements)) {
            for (const child of elements)
                element.append(child);
        } else
            element.append(elements);

        return element;
    }
}
