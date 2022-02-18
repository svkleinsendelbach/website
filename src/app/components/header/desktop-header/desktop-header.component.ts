import { Component, HostListener, Input, OnInit } from '@angular/core';
import { HeaderItem } from '../header.component';
import { HeaderIntransparentService } from '../../../services/header-intransparent.service';

@Component({
  selector: 'app-desktop-header',
  templateUrl: './desktop-header.component.html',
  styleUrls: ['./desktop-header.component.sass'],
})
export class DesktopHeaderComponent implements OnInit {
  @Input() headerItemsList!: HeaderItem[];

  isOnTop = true;

  expandedHeaderItemId: string | null = null;

  constructor(private headerIntransparentService: HeaderIntransparentService) {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.isOnTop = window.scrollY <= 0;
  }

  ngOnInit(): void {}

  get isIntransparent(): boolean {
    return this.headerIntransparentService.isIntransparent || !this.isOnTop || this.expandedHeaderItemId !== null;
  }

  handleHeaderItemClick(id: string) {
    if (this.expandedHeaderItemId === id) {
      this.expandedHeaderItemId = null;
    } else {
      this.expandedHeaderItemId = id;
    }
  }
}
