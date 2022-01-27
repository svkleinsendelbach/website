import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeaderItem } from '../../header.component';

@Component({
  selector: 'app-mobile-header-item',
  templateUrl: './header-item.component.html',
  styleUrls: ['./header-item.component.sass'],
})
export class HeaderItemComponent {
  @Input() headerItem!: HeaderItem;

  @Input() isIntransparent!: boolean;

  @Input() expandedHeaderItemId!: string | null;

  @Output() clickHeaderItemIdEmitter = new EventEmitter<string>();

  handleClick() {
    this.clickHeaderItemIdEmitter.emit(this.headerItem.id);
  }
}