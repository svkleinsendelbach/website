export interface ContactItem {
    function: string;
    name: string;
    mobile?: {
        number: string;
        text: string;
    };
    telephone?: {
        number: string;
        text: string;
    };
    email?: string;
}
