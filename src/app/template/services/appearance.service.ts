import { Injectable } from '@angular/core';
import { EventListener } from '../classes/event-listener';

@Injectable({
  providedIn: 'root'
})
export class AppearanceService {
  public appearance: AppearanceService.Appearance;

  public listeners = new EventListener<AppearanceService.Appearance>();

  constructor() {
    if (!window.matchMedia) {
      this.appearance = AppearanceService.Appearance.Light;
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.appearance = prefersDark ? AppearanceService.Appearance.Dark : AppearanceService.Appearance.Light;
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      const newAppearance = event.matches ? AppearanceService.Appearance.Dark : AppearanceService.Appearance.Light;
      if (this.appearance !== newAppearance) {
        this.appearance = newAppearance;
        this.listeners.emitValue(newAppearance);
      }
    });
  }

  public get current(): AppearanceService.Appearance {
    return this.appearance;
  }
}

export namespace AppearanceService {
  export enum Appearance {
    Light,
    Dark
  }
}
