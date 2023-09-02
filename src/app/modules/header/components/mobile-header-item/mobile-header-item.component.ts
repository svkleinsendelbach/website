import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { HeaderItem } from '../../types/header-data';
import { Link } from 'src/app/types/link';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'mobile-header-item',
    styleUrls: ['./mobile-header-item.component.sass'],
    templateUrl: './mobile-header-item.component.html'
})
export class MobileHeaderItemComponent {
    @Input() public headerItem!: HeaderItem & { id: string };

    @Input() public expandedHeaderItemId!: string | null;

    @Output() public clickHeaderItemIdEmitter = new EventEmitter<string>();

    public faCaretDown = faCaretDown;

    public faCaretUp = faCaretUp;

    public constructor(
        public readonly styleConfig: StyleConfigService
    ) {}

    public handleHeaderItemClick() {
        this.clickHeaderItemIdEmitter.emit(this.headerItem.id);
    }

    public subItems(subItems: Record<string, Link> | null): { id: string; link: Link }[] {
        if (!subItems)
            return [];
        return Object.entries(subItems).map(entry => ({
            id: entry[0],
            link: entry[1]
        }));
    }
}
