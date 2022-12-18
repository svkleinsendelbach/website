import { Component, Input } from '@angular/core';
import { AppearanceService } from 'src/app/template/services/appearance.service';
import { HeaderComponent } from '../header.component';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.sass']
})
export class MobileHeaderComponent<InternalPath extends string> {
  public faBars = faBars
  public faTimes = faTimes

  @Input() public headerData!: HeaderComponent.HeaderData<InternalPath>

  @Input() public homeLinkData!: HeaderComponent.HomeLinkData<InternalPath>

  @Input() public styleConfig!: HeaderComponent.StyleConfig

  public isExpanded = false

  public expandedHeaderItemId: string | null = null

  public constructor(
    public readonly appearance: AppearanceService
  ) {}

  public handleHamburgerMenuClick(toExpanded: boolean) {
    this.isExpanded = toExpanded
  }

  public handleHeaderItemClick(headerItemId: string) {
    if (this.expandedHeaderItemId === headerItemId) {
      this.expandedHeaderItemId = null
    } else {
      this.expandedHeaderItemId = headerItemId
    }
  }
}
