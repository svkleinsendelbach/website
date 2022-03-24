import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  public isDarkMode;

  private listeners: {
    [key: string | number]: (isDarkMode: boolean) => void;
  } = {};

  constructor() {
    this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      const newValue = event.matches;
      if (this.isDarkMode !== newValue) {
        this.isDarkMode = newValue;
        for (const listener of Object.values(this.listeners)) {
          listener(newValue);
        }
      }
    });
  }

  public addListener(id: string | number, listener: (isDarkMode: boolean) => void) {
    this.listeners[id] = listener;
  }

  public removeListener(id: string | number) {
    delete this.listeners[id];
  }

  public get current(): 'light' | 'dark' {
    return this.isDarkMode ? 'dark' : 'light';
  }
}
