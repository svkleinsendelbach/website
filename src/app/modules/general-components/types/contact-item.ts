export interface ContactItem {
    function: string;
    name: string;
    mobile: {
        number: string;
        text: string;
    } | null;
    telephone: {
        number: string;
        text: string;
    } | null;
    email: string | null;
}

export namespace ContactItem {
    export function trackByName(_index: number, item: ContactItem): string {
        return item.name;
    }
}
