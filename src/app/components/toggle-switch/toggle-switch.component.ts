import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.sass'],
})
export class ToggleSwitchComponent {
  @Input() public checked: boolean = false;

  @Output() public checkedChange = new EventEmitter<boolean>();

  constructor() {}

  public handleClick() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
