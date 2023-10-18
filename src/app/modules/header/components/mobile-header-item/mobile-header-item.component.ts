import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeaderItem } from '../../types/header-item';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { TrackBy } from 'src/app/types/track-by';

@Component({
    selector: 'mobile-header-item',
    styleUrls: ['./mobile-header-item.component.sass'],
    templateUrl: './mobile-header-item.component.html'
})
export class MobileHeaderItemComponent {
    @Input() public headerItem!: HeaderItem;

    @Input() public expandedHeaderItemId!: string | null;

    @Output() public clickHeaderItemIdEmitter = new EventEmitter<string>();

    public TrackBy = TrackBy;

    public constructor(
        public readonly styleConfig: StyleConfigService
    ) {}

    public handleHeaderItemClick() {
        this.clickHeaderItemIdEmitter.emit(this.headerItem.id);
    }
}
