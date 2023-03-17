import { Injectable } from '@angular/core';
import { EventListener } from '../../types/event-listener';

@Injectable({
  providedIn: 'root'
})
export class DeviceTypeService {
  private static computeDeviceType(): DeviceTypeService.DeviceType {
    const width = window.innerWidth;
    if (width <= 480) {
      return DeviceTypeService.DeviceType.Mobile;
    } else if (width <= 1366) {
      return DeviceTypeService.DeviceType.Tablet;
    } else {
      return DeviceTypeService.DeviceType.Desktop;
    }
  }

  private deviceType: DeviceTypeService.DeviceType;

  public listeners = new EventListener<DeviceTypeService.DeviceType>();

  constructor() {
    this.deviceType = DeviceTypeService.computeDeviceType();
  }

  public windowResized() {
    const newDeviceType = DeviceTypeService.computeDeviceType();
    if (this.deviceType !== newDeviceType) {
      this.deviceType = newDeviceType;
      this.listeners.emitValue(newDeviceType);
    }
  }

  public get current(): DeviceTypeService.DeviceType {
    return this.deviceType;
  }

  public get isMobile(): boolean {
    return this.deviceType === DeviceTypeService.DeviceType.Mobile;
  }

  public get isTable(): boolean {
    return this.deviceType === DeviceTypeService.DeviceType.Tablet;
  }

  public get isDesktop(): boolean {
    return this.deviceType === DeviceTypeService.DeviceType.Desktop;
  }

  public get className(): 'mobile' | 'tablet' | 'desktop'{
    switch (this.deviceType) {
      case DeviceTypeService.DeviceType.Mobile: return 'mobile';
      case DeviceTypeService.DeviceType.Tablet: return 'tablet';
      case DeviceTypeService.DeviceType.Desktop: return 'desktop';
    }
  }
}

export namespace DeviceTypeService {
  export enum DeviceType {
    Mobile,
    Tablet,
    Desktop
  }
}

export type DeviceType = 'mobile' | 'tablet' | 'desktop';
