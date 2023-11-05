export class Link {
    public constructor(
        public readonly title: string,
        public readonly link: string,
        private readonly openInNewTab: boolean
    ) {}

    public get target(): '_blank' | '_self' {
        return this.openInNewTab ? '_blank' : '_self';
    }
}

export namespace Link {
    export function internal<InternalPath extends string>(title: string, path: InternalPath): Link {
        return new Link(title, `/${path}`, false);
    }

    export function internalParam<InternalPath extends string>(title: string, path: InternalPath, param: string): Link {
        return new Link(title, `/${path}/${param}`, false);
    }

    export function external(title: string, link: string, openInNewTab: boolean = true): Link {
        return new Link(title, link, openInNewTab);
    }
}
