import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { HeaderItem } from '../../types/header-item';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { TrackBy } from 'src/app/types/track-by';

@Component({
    selector: 'desktop-header-item',
    styleUrls: ['./desktop-header-item.component.sass'],
    templateUrl: './desktop-header-item.component.html'
})
export class DesktopHeaderItemComponent {
    @Input() public headerItem!: HeaderItem;

    @Input() public expandedHeaderItemId!: string | null;

    @Output() public clickHeaderItemIdEmitter = new EventEmitter<string>();

    public TrackBy = TrackBy;

    public faCaretDown = faCaretDown;

    public faCaretUp = faCaretUp;

    public constructor(
        public readonly styleConfig: StyleConfigService
    ) {}

    public handleHeaderItemClick() {
        this.clickHeaderItemIdEmitter.emit(this.headerItem.id);
    }
}
