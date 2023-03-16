import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'src/app/template/classes/link';
import { StyleConfigService } from 'src/app/template/services/style-config.service';
import { HeaderItem } from '../../types/HeaderData';

@Component({
    selector: 'mobile-header-item',
    templateUrl: './mobile-header-item.component.html',
    styleUrls: ['./mobile-header-item.component.sass']
})
export class MobileHeaderItemComponent {
    public faCaretDown = faCaretDown;
    public faCaretUp = faCaretUp;

  @Input() public headerItem!: HeaderItem & { id: string };

  @Input() public expandedHeaderItemId!: string | null;

  @Output() public clickHeaderItemIdEmitter = new EventEmitter<string>();

  public constructor(
    public readonly styleConfig: StyleConfigService
  ) {}

  public handleHeaderItemClick() {
      this.clickHeaderItemIdEmitter.emit(this.headerItem.id);
  }

  public subItems(subItems: Record<string, Link> | undefined): { id: string; link: Link }[] {
      if (subItems === undefined)
          return [];
      return Object.entries(subItems).map(entry => {
          return {
              id: entry[0],
              link: entry[1]
          };
      });
  }
}