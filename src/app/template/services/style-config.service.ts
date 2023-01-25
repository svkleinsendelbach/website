import { Injectable } from '@angular/core';
import { Style } from '../classes/style';
import { AppearanceService } from './appearance.service';

@Injectable({
  providedIn: 'root'
})
export class StyleConfigService {
  private styleConfig?: StyleConfigService.StyleConfig;

  public constructor(
    private readonly appearance: AppearanceService
  ) {}

  public setConfig(styleConfig: StyleConfigService.StyleConfig) {
    this.styleConfig = styleConfig;
  }

  public setStyle<Key extends keyof StyleConfigService.StyleConfig>(key: Key, style: StyleConfigService.StyleConfig[Key]) {
    if (this.styleConfig === undefined) {
      throw new Error('No style config is set.');
    }
    this.styleConfig[key] = style;
  }

  public style<Key extends keyof StyleConfigService.StyleConfig>(key: Key): StyleConfigService.StyleConfig[Key] {
    if (this.styleConfig === undefined) {
      throw new Error('No style config is set.');
    }
    return this.styleConfig[key];
  }

  public color<Key extends keyof StyleConfigService.StyleConfig>(key: Key): Style.Color {
     return this.style(key).color(this.appearance.current);
  }

  public css<Key extends keyof StyleConfigService.StyleConfig>(key: Key): string {
     return this.color(key).css;
  }
}

export namespace StyleConfigService {
  export interface StyleConfig {
    primaryColor: Style.AppearanceColor,
    backgroundColor: Style.AppearanceColor,
    secondaryBackgroundColor: Style.AppearanceColor,
    hoveredBackgroundColor: Style.AppearanceColor,
    textColor: Style.AppearanceColor,
    secondaryTextColor: Style.AppearanceColor,
    formSuccessStatusColor: Style.AppearanceColor,
    formErrorStatusColor: Style.AppearanceColor,
    formInfoStatusColor: Style.AppearanceColor
  }
}
