import { Component, Input } from '@angular/core';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { StyleConfigService } from 'src/app/template/services/style-config.service';
import { HeaderData, HeaderItem } from '../../types/HeaderData';
import { HomeLinkData } from '../../types/HomeLinkData';

@Component({
    selector: 'mobile-header',
    templateUrl: './mobile-header.component.html',
    styleUrls: ['./mobile-header.component.sass']
})
export class MobileHeaderComponent {
    public faBars = faBars;
    public faTimes = faTimes;

  @Input() public headerData!: HeaderData;

  @Input() public homeLinkData!: HomeLinkData;

  public isExpanded = false;

  public expandedHeaderItemId: string | null = null;

  public constructor(
    public readonly styleConfig: StyleConfigService
  ) {}

  public handleHamburgerMenuClick(toExpanded: boolean) {
      this.isExpanded = toExpanded;
  }

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