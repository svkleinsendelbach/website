import { RegexIterable } from 'src/app/types/regex-iterable';

export class ReportMessageParser {
    public constructor(
        private readonly linkColor: string
    ) {}

    public parse(message: string): (string | HTMLElement)[] | null {
        const elements = this.parseLinks(message);
        if (elements === null)
            return null;
        return this.parseFormatting(elements);
    }

    private parseLinks(message: string): (string | HTMLAnchorElement)[] | null {
        let lastIndex = 0;
        const elements: (string | HTMLAnchorElement)[] = [];
        const regexIt = new RegexIterable(/\[(?<content>[\S\s]+?)\]\((?<link>[\S\s]+?)\)/g, message);
        for (const match of regexIt) {
            elements.push(message.slice(lastIndex, match.startIndex));
            if (match.groups === undefined)
                continue;
            const link = document.createElement('a');
            link.style.color = this.linkColor;
            link.href = match.groups['link'];
            const content = this.parseFormatting([match.groups['content']]);
            if (content === null)
                return null;
            for (const element of content)
                link.append(element);
            link.title = link.innerText;
            elements.push(link);
            lastIndex = match.endIndex + 1;
        }
        elements.push(message.slice(lastIndex));
        return elements;
    }

    private parseFormatting(elements: (string | HTMLElement)[]): (string | HTMLElement)[] | null {
        const result: (string | HTMLElement)[] = [];
        let lastIndex = 0;
        let components: ['***' | '**' | '*', (string | HTMLElement)[]][] = [];
        for (const element of elements) {
            if (typeof element !== 'string') {
                if (components.length === 0)
                    result.push(element);
                else
                    components[components.length - 1][1].push(element);
                continue;
            }
            const regexIt = new RegexIterable(/(?<three>\*\*\*)|(?<two>\*\*)|(?<one>\*)/g, element);
            for (const match of regexIt) {
                const format = match.groups?.['three'] !== undefined ? '***' : match.groups?.['two'] !== undefined ? '**' : match.groups?.['one'] !== undefined ? '*' : null;
                if (format === null)
                    continue;
                const currentValue = element.slice(lastIndex, match.startIndex);
                let formats = components.reduce((result, value) => result === '' ? value[0] : `${result}|${value[0]}`, '');
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
            result.push(element.slice(lastIndex));
        }
        if (components.length !== 0)
            return null;
        return result;
    }

    private createElement(type: 'italic' | 'strong', elements: string | HTMLElement | (string | HTMLElement)[]): HTMLElement {
        const element = document.createElement('div');
        element.classList.add(type);
        if (Array.isArray(elements)) {
            for (const child of elements)
                element.append(child);
        } else {
            element.append(elements);
        }
        return element;
    }
}
