import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Link } from 'src/app/types/link';
import { HeaderItem } from '../../types/header-data';

@Component({
    selector: 'desktop-header-item',
    templateUrl: './desktop-header-item.component.html',
    styleUrls: ['./desktop-header-item.component.sass']
})
export class DesktopHeaderItemComponent {
    public faCaretDown = faCaretDown;
    public faCaretUp = faCaretUp;

    @Input() public headerItem!: HeaderItem & { id: string };

    @Input() public expandedHeaderItemId!: string | null;

    @Output() public clickHeaderItemIdEmitter = new EventEmitter<string>();

    public constructor(
        public readonly styleConfig: StyleConfigService
    ) {}

    public handleHeaderItemClick() {
        this.clickHeaderItemIdEmitter.emit(this.headerItem.id);
    }

    public subItems(subItems: Record<string, Link> | undefined): { id: string; link: Link }[] {
        if (subItems === undefined)
            return [];
        return Object.entries(subItems).map(entry => {
            return {
                id: entry[0],
                link: entry[1]
            };
        });
    }
}
