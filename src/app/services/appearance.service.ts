import { EventListener } from '../types/event-listener';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppearanceService {
    public listeners = new EventListener<Appearance>();

    private appearance: Appearance | 'system' = 'system';

    public constructor() {
        const savedAppearance = localStorage.getItem('appearance') as Appearance | null;
        this.setAppearance(savedAppearance ?? 'system');
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            this.listeners.emitValue(event.matches ? 'dark' : 'light');
        });
    }

    public get current(): Appearance {
        if (this.appearance !== 'system')
            return this.appearance;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    }

    public get currentConfig(): Appearance | 'system' {
        return this.appearance;
    }

    public get configDescription(): string {
        if (this.appearance === 'light')
            return 'Hell';
        if (this.appearance === 'dark')
            return 'Dunkel';
        return 'System';
    }

    public setAppearance(appearance: Appearance | 'system') {
        this.appearance = appearance;
        localStorage.setItem('appearance', appearance);
        this.listeners.emitValue(this.current);
    }
}

export type Appearance = 'dark' | 'light';
