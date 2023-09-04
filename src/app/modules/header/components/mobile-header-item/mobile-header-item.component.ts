import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { HeaderItem } from '../../types/header-item';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'mobile-header-item',
    styleUrls: ['./mobile-header-item.component.sass'],
    templateUrl: './mobile-header-item.component.html'
})
export class MobileHeaderItemComponent {
    @Input() public headerItem!: HeaderItem;

    @Input() public expandedHeaderItemId!: string | null;

    @Output() public clickHeaderItemIdEmitter = new EventEmitter<string>();

    public SubItem = HeaderItem.SubItem;

    public faCaretDown = faCaretDown;

    public faCaretUp = faCaretUp;

    public constructor(
        public readonly styleConfig: StyleConfigService
    ) {}

    public handleHeaderItemClick() {
        this.clickHeaderItemIdEmitter.emit(this.headerItem.id);
    }
}
