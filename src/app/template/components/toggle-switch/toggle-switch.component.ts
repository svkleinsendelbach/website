import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Style } from '../../classes/style';
import { AppearanceService } from '../../services/appearance.service';

@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.sass']
})
export class ToggleSwitchComponent {
  @Input() public checked = false

  @Output() public checkedChanged = new EventEmitter<boolean>();

  @Input() public styleConfig!: ToggleSwitchComponent.StyleConfig

  public constructor(
    public readonly appearance: AppearanceService
  ) {}

  public handleClick() {
    this.checked = !this.checked
    this.checkedChanged.emit(this.checked)
  }
}

export namespace ToggleSwitchComponent {
  export interface StyleConfig {
    backgroundColor: Style.AppearanceColor,
    uncheckedColor: Style.AppearanceColor,
    primaryColor: Style.AppearanceColor
  }
}
