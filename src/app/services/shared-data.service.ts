import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SharedDataService<T extends Record<string, unknown>> {
    private data: Partial<T> = {};

    public setValue<Key extends keyof T>(key: Key, value: T[Key]) {
        this.data[key] = value;
    }

    public getValue<Key extends keyof T>(key: Key): T[Key] | null {
        return this.data[key] ?? null;
    }

    public removeValue<Key extends keyof T>(key: Key) {
        if (key in this.data)
            delete this.data[key];
    }
}
