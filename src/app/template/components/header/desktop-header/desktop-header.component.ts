import { Component, Input } from '@angular/core';
import { StyleConfigService } from 'src/app/template/services/style-config.service';
import { HeaderComponent } from '../header.component';

@Component({
  selector: 'app-desktop-header',
  templateUrl: './desktop-header.component.html',
  styleUrls: ['./desktop-header.component.sass']
})
export class DesktopHeaderComponent {
  @Input() public headerData!: HeaderComponent.HeaderData;

  @Input() public homeLinkData!: HeaderComponent.HomeLinkData;

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

  public get headerItems(): (HeaderComponent.HeaderItem & { id: string })[] {
    return Object.entries(this.headerData).map(entry => {
      return {
        ...entry[1],
        id: entry[0]
      };
    });
  }
}
