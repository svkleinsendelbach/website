import { Component, Input } from '@angular/core';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { HeaderItem } from '../../types/header-item';
import { HomeLinkData } from '../../types/home-link-data';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { TrackBy } from 'src/app/types/track-by';

@Component({
    selector: 'mobile-header',
    styleUrls: ['./mobile-header.component.sass'],
    templateUrl: './mobile-header.component.html'
})
export class MobileHeaderComponent {
    @Input() public headerItems!: HeaderItem[];

    @Input() public homeLinkData!: HomeLinkData;

    public TrackBy = TrackBy;

    public faBars = faBars;

    public faTimes = faTimes;

    public isExpanded = false;

    public expandedHeaderItemId: string | null = null;

    public constructor(
        public readonly styleConfig: StyleConfigService
    ) {}

    public handleHamburgerMenuClick(toExpanded: boolean) {
        this.isExpanded = toExpanded;
    }

    public handleHeaderItemClick(headerItemId: string) {
        if (this.expandedHeaderItemId === headerItemId)
            this.expandedHeaderItemId = null;
        else
            this.expandedHeaderItemId = headerItemId;
    }
}
