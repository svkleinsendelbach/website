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
