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
