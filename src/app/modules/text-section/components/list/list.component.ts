import { AfterViewChecked, AfterViewInit, Component, ElementRef } from '@angular/core';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'list',
    styleUrls: ['./list.component.sass'],
    templateUrl: './list.component.html'
})
export class ListComponent implements AfterViewInit, AfterViewChecked {
    public constructor(
        public readonly styleConfig: StyleConfigService,
        private readonly elementRef: ElementRef<HTMLElement>
    ) {}

    public ngAfterViewInit() {
        this.setChildStyles();
    }

    public ngAfterViewChecked() {
        this.setChildStyles();
    }

    private setChildStyles() {
        const { children } = this.elementRef.nativeElement;
        let child: Element | null = children.item(0);
        let index = 0;
        while (child !== null) {
            (child as HTMLElement).style.backgroundColor = this.styleConfig.css('backgroundColor');
            (child as HTMLElement).style.borderColor = this.styleConfig.css('textColor');
            index += 1;
            child = children.item(index);
        }
    }
}
