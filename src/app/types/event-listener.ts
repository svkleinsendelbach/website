export class EventListener<T> {
    private listeners: {
        [key: string | number]: (newValue: T) => void;
    };

    public constructor() {
        this.listeners = {};
    }

    public add(key: string | number, listener: (newValue: T) => void) {
        this.listeners[key] = listener;
    }

    public remove(key: string | number) {
        if (key in this.listeners)
            delete this.listeners[key];
    }

    public emitValue(value: T) {
        for (const listener of Object.values(this.listeners)) {
            listener(value);
        }
    }
}
