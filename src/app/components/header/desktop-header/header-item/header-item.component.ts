import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { HeaderItem } from '../../header.component';

@Component({
  selector: 'app-desktop-header-item',
  templateUrl: './header-item.component.html',
  styleUrls: ['./header-item.component.sass'],
})
export class HeaderItemComponent implements OnInit {
  @Input() headerItem!: HeaderItem;

  constructor() {}

  ngOnInit(): void {}
}
