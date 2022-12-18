import { Component, Input } from '@angular/core';
import { AppearanceService } from 'src/app/template/services/appearance.service';
import { HeaderComponent } from '../header.component';

@Component({
  selector: 'app-desktop-header',
  templateUrl: './desktop-header.component.html',
  styleUrls: ['./desktop-header.component.sass']
})
export class DesktopHeaderComponent<InternalPath extends string> {
  public Object = Object;

  @Input() public headerData!: HeaderComponent.HeaderData<InternalPath>

  @Input() public homeLinkData!: HeaderComponent.HomeLinkData<InternalPath>

  @Input() public styleConfig!: HeaderComponent.StyleConfig

  public expandedHeaderItemId: string | null = null

  public constructor(
    public readonly appearance: AppearanceService
  ) {}

  public handleHeaderItemClick(headerItemId: string) {
    if (this.expandedHeaderItemId === headerItemId) {
      this.expandedHeaderItemId = null
    } else {
      this.expandedHeaderItemId = headerItemId
    }
  }
}
