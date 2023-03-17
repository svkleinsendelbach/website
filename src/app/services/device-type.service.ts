import { Injectable } from '@angular/core';
import { EventListener } from '../types/event-listener';

@Injectable({
    providedIn: 'root'
})
export class DeviceTypeService {

    private deviceType: DeviceType;

    public listeners = new EventListener<DeviceType>();

    constructor() {
        this.deviceType = DeviceTypeService.computeDeviceType();
    }

    private static computeDeviceType(): DeviceType {
        const width = window.innerWidth;
        if (width <= 480) {
            return 'mobile';
        } else if (width <= 1366) {
            return 'tablet';
        } else {
            return 'desktop';
        }
    }

    public windowResized() {
        const newDeviceType = DeviceTypeService.computeDeviceType();
        if (this.deviceType !== newDeviceType) {
            this.deviceType = newDeviceType;
            this.listeners.emitValue(newDeviceType);
        }
    }

    public get current(): DeviceType {
        return this.deviceType;
    }

    public get isMobile(): boolean {
        return this.deviceType === 'mobile';
    }

    public get isTable(): boolean {
        return this.deviceType === 'tablet';
    }

    public get isDesktop(): boolean {
        return this.deviceType === 'desktop';
    }
}

export type DeviceType = 'mobile' | 'tablet' | 'desktop';
