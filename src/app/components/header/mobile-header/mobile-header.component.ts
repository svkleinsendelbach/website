import { Component, HostListener, Input } from '@angular/core';
import { HeaderItem } from '../header.component';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { HeaderIntransparentService } from 'src/app/services/header-intransparent.service';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.sass'],
})
export class MobileHeaderComponent {
  public faBars = faBars;
  public faTimes = faTimes;

  @Input() headerItemsList!: HeaderItem[];

  isOnTop = true;

  isExpanded = false;

  expandedHeaderItemId: string | null = null;

  constructor(private headerIntransparentService: HeaderIntransparentService) {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.isOnTop = window.scrollY <= 0;
  }

  get isIntransparent(): boolean {
    return (
      this.headerIntransparentService.isIntransparent ||
      !this.isOnTop ||
      this.isExpanded ||
      this.expandedHeaderItemId !== null
    );
  }

  handleHamburgerMenuClicked(toExpand: boolean) {
    this.isExpanded = toExpand;
  }

  handleHeaderItemClick(id: string) {
    if (this.expandedHeaderItemId === id) {
      this.expandedHeaderItemId = null;
    } else {
      this.expandedHeaderItemId = id;
    }
  }
}
