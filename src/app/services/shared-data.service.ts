import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SharedDataService<T extends { [key: string]: unknown }> {
    private data: Partial<T> = {};

    public setValue<Key extends keyof T>(key: Key, value: T[Key]) {
        this.data[key] = value;
    }

    public getValue<Key extends keyof T>(key: Key): T[Key] | undefined {
        return this.data[key];
    }

    public removeValue<Key extends keyof T>(key: Key) {
        if (key in this.data)
            delete this.data[key];
    }
}
