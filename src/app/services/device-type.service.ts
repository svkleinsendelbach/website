import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeviceTypeService {
  private rawValue: 'mobile' | 'tablet' | 'desktop';

  private listeners: {
    [key: string | number]: (newValue: 'mobile' | 'tablet' | 'desktop') => void;
  } = {};

  public constructor() {
    this.rawValue = DeviceTypeService.currentRawValue;
  }

  public windowResized() {
    const newValue = DeviceTypeService.currentRawValue;
    if (this.rawValue !== newValue) {
      this.rawValue = newValue;
      for (const listener of Object.values(this.listeners)) {
        listener(newValue);
      }
    }
  }

  public addListener(id: string | number, listener: (newValue: 'mobile' | 'tablet' | 'desktop') => void) {
    this.listeners[id] = listener;
  }

  public removeListener(id: string | number) {
    delete this.listeners[id];
  }

  private static get currentRawValue(): 'mobile' | 'tablet' | 'desktop' {
    const width = window.innerWidth;
    if (width <= 480) {
      return 'mobile';
    } else if (width <= 1366) {
      return 'tablet';
    }
    return 'desktop';
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
