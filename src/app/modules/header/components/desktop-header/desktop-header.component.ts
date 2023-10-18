import { Component, Input } from '@angular/core';
import { HeaderItem } from '../../types/header-item';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { TrackBy } from 'src/app/types/track-by';

@Component({
    selector: 'desktop-header',
    styleUrls: ['./desktop-header.component.sass'],
    templateUrl: './desktop-header.component.html'
})
export class DesktopHeaderComponent {
    @Input() public headerItems!: HeaderItem[];

    public TrackBy = TrackBy;

    public expandedHeaderItemId: string | null = null;

    public constructor(
        public readonly styleConfig: StyleConfigService
    ) {}

    public handleHeaderItemClick(headerItemId: string) {
        if (this.expandedHeaderItemId === headerItemId)
            this.expandedHeaderItemId = null;
        else
            this.expandedHeaderItemId = headerItemId;
    }
}
