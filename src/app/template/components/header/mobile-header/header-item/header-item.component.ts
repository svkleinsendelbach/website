import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { AppearanceService } from 'src/app/template/services/appearance.service';
import { HeaderComponent } from '../../header.component';

@Component({
  selector: 'app-mobile-header-item',
  templateUrl: './header-item.component.html',
  styleUrls: ['./header-item.component.sass']
})
export class MobileHeaderItemComponent<InternalPath extends string>{
  public Object = Object;
  public faCaretDown = faCaretDown;
  public faCaretUp = faCaretUp;

  @Input() public headerItem!: [string, HeaderComponent.HeaderItem<InternalPath>];

  @Input() public expandedHeaderItemId!: string | null;

  @Input() public styleConfig!: HeaderComponent.StyleConfig;

  @Output() public clickHeaderItemIdEmitter = new EventEmitter<string>();

  public constructor(
    public readonly appearance: AppearanceService
  ) {}

  public handleHeaderItemClick() {
    this.clickHeaderItemIdEmitter.emit(this.headerItem[0]);
  }
}
