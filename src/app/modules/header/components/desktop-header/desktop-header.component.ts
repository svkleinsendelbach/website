import { Component, Input } from '@angular/core';
import { HeaderData, HeaderItem } from '../../types/header-data';
import { HomeLinkData } from '../../types/home-link-data';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'desktop-header',
    styleUrls: ['./desktop-header.component.sass'],
    templateUrl: './desktop-header.component.html'
})
export class DesktopHeaderComponent {
    @Input() public headerData!: HeaderData;

    @Input() public homeLinkData!: HomeLinkData;

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

    public handleHeaderItemClick(headerItemId: string) {
        if (this.expandedHeaderItemId === headerItemId)
            this.expandedHeaderItemId = null;
        else
            this.expandedHeaderItemId = headerItemId;
    }
}
