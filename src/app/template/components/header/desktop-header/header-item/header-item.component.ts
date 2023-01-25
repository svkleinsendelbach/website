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
  public Object = Object;
  public faCaretDown = faCaretDown;
  public faCaretUp = faCaretUp;

  @Input() public headerItem!: [string, HeaderComponent.HeaderItem<InternalPath>];

  @Input() public expandedHeaderItemId!: string | null;

  @Input() public styleConfig!: HeaderComponent.StyleConfig;

  @Output() public clickHeaderItemIdEmitter = new EventEmitter<string>();

  public hoveredHeaderItemId: string | null = null;

  public constructor(
    public readonly appearance: AppearanceService
  ) {}

  public handleHeaderItemClick() {
    this.clickHeaderItemIdEmitter.emit(this.headerItem[0]);
  }

  public handleHoverStart(id: string) {
    this.hoveredHeaderItemId = id;
  }

  public handleHoverStop(id: string) {
    if (this.hoveredHeaderItemId === id) {
      this.hoveredHeaderItemId = null;
    }
  }

  public textColor(id: string): Style.Color {
    return this.hoveredHeaderItemId === id
      ? this.styleConfig.primaryColor.color(this.appearance.current)
      : this.styleConfig.textColor.color(this.appearance.current);
  }

  public backgroundColor(id: string): Style.Color {
    return this.hoveredHeaderItemId === id
      ? this.styleConfig.backgroundColorHover.color(this.appearance.current)
      : this.styleConfig.backgroundColor.color(this.appearance.current);
  }
}
