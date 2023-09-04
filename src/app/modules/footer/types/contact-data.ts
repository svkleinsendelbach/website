export interface ContactData {
    function: string;
    name: string;
    street: string;
    city: string;
    telephone: {
        number: string;
        text: string;
    };
}

export namespace ContactData {
    export function trackByName(_index: number, contact: ContactData): string {
        return contact.name;
    }
}
