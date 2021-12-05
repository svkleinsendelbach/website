import { Component, Input, OnInit } from '@angular/core';
import { HeaderItem } from '../header.component';

@Component({
  selector: 'app-desktop-header',
  templateUrl: './desktop-header.component.html',
  styleUrls: ['./desktop-header.component.sass'],
})
export class DesktopHeaderComponent implements OnInit {
  @Input() headerItemsList!: HeaderItem[];

  constructor() {}

  ngOnInit(): void {}
}
