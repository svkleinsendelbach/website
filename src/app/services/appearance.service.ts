import { EventListener } from '../types/event-listener';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppearanceService {
    public appearance: Appearance;

    public listeners = new EventListener<Appearance>();

    public constructor() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.appearance = prefersDark ? 'dark' : 'light';
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            const newAppearance = event.matches ? 'dark' : 'light';
            if (this.appearance !== newAppearance) {
                this.appearance = newAppearance;
                this.listeners.emitValue(newAppearance);
            }
        });
    }

    public get current(): Appearance {
        return this.appearance;
    }
}

export type Appearance = 'dark' | 'light';
