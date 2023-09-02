export class EventListener<T> {
    private listeners: Record<number | string, (newValue: T) => void>;

    public constructor() {
        this.listeners = {};
    }

    public add(key: number | string, listener: (newValue: T) => void) {
        this.listeners[key] = listener;
    }

    public remove(key: number | string) {
        if (key in this.listeners)
            delete this.listeners[key];
    }

    public emitValue(value: T) {
        for (const listener of Object.values(this.listeners)) {
            listener(value);
        }
    }
}
