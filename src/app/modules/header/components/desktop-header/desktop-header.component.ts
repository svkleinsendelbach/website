import { Component, Input } from '@angular/core';
import { StyleConfigService } from 'src/app/template/services/style-config.service';
import { HeaderData, HeaderItem } from '../../types/HeaderData';
import { HomeLinkData } from '../../types/HomeLinkData';

@Component({
    selector: 'desktop-header',
    templateUrl: './desktop-header.component.html',
    styleUrls: ['./desktop-header.component.sass']
})
export class DesktopHeaderComponent {
  @Input() public headerData!: HeaderData;

  @Input() public homeLinkData!: HomeLinkData;

  public expandedHeaderItemId: string | null = null;

  public constructor(
    public readonly styleConfig: StyleConfigService
  ) {}

  public handleHeaderItemClick(headerItemId: string) {
      if (this.expandedHeaderItemId === headerItemId) {
          this.expandedHeaderItemId = null;
      } else {
          this.expandedHeaderItemId = headerItemId;
      }
  }

  public get headerItems(): (HeaderItem & { id: string })[] {
      return Object.entries(this.headerData).map(entry => {
          return {
              ...entry[1],
              id: entry[0]
          };
      });
  }
}