import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeaderComponent } from '../../header.component';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { Style } from 'src/app/template/classes/style';
import { AppearanceService } from 'src/app/template/services/appearance.service';

@Component({
  selector: 'app-desktop-header-item',
  templateUrl: './header-item.component.html',
  styleUrls: ['./header-item.component.sass']
})
export class DesktopHeaderItemComponent<InternalPath extends string>{
  public faCaretDown = faCaretDown
  public faCaretUp = faCaretUp

  @Input() public headerItem!: HeaderComponent.HeaderItem<InternalPath>

  @Input() public expandedHeaderItemId!: string | null

  @Input() public styleConfig!: HeaderComponent.StyleConfig

  @Output() public clickHeaderItemIdEmitter = new EventEmitter<string>()

  public hoveredHeaderItemId: string | null = null

  public constructor(
    public readonly appearance: AppearanceService
  ) {}

  public handleHeaderItemClick() {
    this.clickHeaderItemIdEmitter.emit(this.headerItem.id)
  }

  public handleHoverStart(headerItem: HeaderComponent.HeaderItemLink<InternalPath>) {
    this.hoveredHeaderItemId = headerItem.id
  }

  public handleHoverStop(headerItem: HeaderComponent.HeaderItemLink<InternalPath>) {
    if (this.hoveredHeaderItemId === headerItem.id) {
      this.hoveredHeaderItemId = null
    }
  }

  public textColor(headerItem: HeaderComponent.HeaderItemLink<InternalPath>): Style.Color {
    return this.hoveredHeaderItemId === headerItem.id
      ? this.styleConfig.primaryColor.color(this.appearance.current)
      : this.styleConfig.textColor.color(this.appearance.current)
  }

  public backgroundColor(headerItem: HeaderComponent.HeaderItemLink<InternalPath>): Style.Color {
    return this.hoveredHeaderItemId === headerItem.id
      ? this.styleConfig.backgroundColorHover.color(this.appearance.current)
      : this.styleConfig.backgroundColor.color(this.appearance.current)
  }
}
