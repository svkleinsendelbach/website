import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeviceTypeService {
  private rawValue: 'mobile' | 'tablet' | 'desktop';

  public constructor() {
    this.rawValue = DeviceTypeService.currentRawValue;
  }

  public windowResized() {
    this.rawValue = DeviceTypeService.currentRawValue;
  }

  private static get currentRawValue(): 'mobile' | 'tablet' | 'desktop' {
    const width = window.innerWidth;
    if (width <= 480) {
      return 'mobile';
    } else if (width <= 1366) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  }

  public get isMobile(): boolean {
    return this.rawValue === 'mobile';
  }

  public get isTablet(): boolean {
    return this.rawValue === 'tablet';
  }

  public get isDesktop(): boolean {
    return this.rawValue === 'desktop';
  }

  public get stringValue(): 'mobile' | 'tablet' | 'desktop' {
    return this.rawValue;
  }
}
