import { Component, Input } from '@angular/core';
import { HeaderData, HeaderItem } from '../../types/header-data';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { HomeLinkData } from '../../types/home-link-data';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'mobile-header',
    styleUrls: ['./mobile-header.component.sass'],
    templateUrl: './mobile-header.component.html'
})
export class MobileHeaderComponent {
    @Input() public headerData!: HeaderData;

    @Input() public homeLinkData!: HomeLinkData;

    public faBars = faBars;

    public faTimes = faTimes;

    public isExpanded = false;

    public expandedHeaderItemId: string | null = null;

    public constructor(
        public readonly styleConfig: StyleConfigService
    ) {}

    public get headerItems(): (HeaderItem & { id: string })[] {
        return Object.entries(this.headerData).map(entry => ({
            ...entry[1],
            id: entry[0]
        }));
    }

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
