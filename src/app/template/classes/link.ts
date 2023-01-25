export interface InternalLink<Path extends string> {
  title: string
  path: Path
}

export interface ExternalLink {
  title: string
  link: string
  openInNewTab: boolean
}

export class Link<InternalPath extends string>{
  public constructor(
    private readonly value: InternalLink<InternalPath> | ExternalLink
  ) {}

  public get title(): string {
    return this.value.title;
  }

  public get link(): string {
    return 'path' in this.value ? `/${this.value.path}` : this.value.link;
  }

  public get target(): '_self' | '_blank' {
    return ('openInNewTab' in this.value ? this.value.openInNewTab : false) ? '_blank' : '_self';
  }
}

export namespace Link {
  export function internal<Path extends string>(title: string, path: Path): Link<Path> {
    return new Link({
      title,
      path
    });
  }

  export function external<InternalPath extends string>(title: string, link: string, openInNewTab: boolean): Link<InternalPath> {
    return new Link({
      title,
      link,
      openInNewTab
    });
  }
}
