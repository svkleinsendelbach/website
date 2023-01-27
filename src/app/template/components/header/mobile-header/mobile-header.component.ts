import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header.component';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { StyleConfigService } from 'src/app/template/services/style-config.service';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.sass']
})
export class MobileHeaderComponent {
  public faBars = faBars;
  public faTimes = faTimes;

  @Input() public headerData!: HeaderComponent.HeaderData;

  @Input() public homeLinkData!: HeaderComponent.HomeLinkData;

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

  public get headerItems(): (HeaderComponent.HeaderItem & { id: string })[] {
    return Object.entries(this.headerData).map(entry => {
      return {
        ...entry[1],
        id: entry[0]
      };
    });
  }
}
