import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Link } from '../../../types/link';
import { InternalLinkPath, internalLinks } from '../../../types/internal-link-path';

@Directive({
    selector: '[link]'
})
export class LinkDirective implements OnInit {
    @Input() public link!: Link | InternalLinkPath;

    public constructor(
        private readonly element: ElementRef<HTMLAnchorElement>
    ) {
    }

    public ngOnInit() {
        const link = typeof this.link === 'string' ? internalLinks[this.link] : this.link;
        if (this.element.nativeElement.href === '')
            this.element.nativeElement.href = link.link;
        if (this.element.nativeElement.title === '')
            this.element.nativeElement.title = link.title;
        if (this.element.nativeElement.target === '')
            this.element.nativeElement.target = link.target;
    }
}
