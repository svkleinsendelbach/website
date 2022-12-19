import { Component, Input } from '@angular/core';
import { Style } from '../../classes/style';
import { AppearanceService } from '../../services/appearance.service';

@Component({
  selector: 'app-text-section',
  templateUrl: './text-section.component.html',
  styleUrls: ['./text-section.component.sass']
})
export class TextSectionComponent {
  @Input() title?: string

  @Input() public styleConfig!: TextSectionComponent.StyleConfig

  public constructor(
    public readonly appearance: AppearanceService
  ) {}
}

export namespace TextSectionComponent {
  export interface StyleConfig {
    textColor: Style.AppearanceColor
  }
}
