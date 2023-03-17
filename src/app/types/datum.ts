export class Datum {
    public constructor(
        private readonly year: number,
        private readonly month: number,
        private readonly day: number,
        private readonly hour: number,
        private readonly minute: number
    ) {}

    public static fromDate(date: Date): Datum {
        return new Datum(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
    }

    public static fromIsoDate(date: string): Datum {
        return Datum.fromDate(new Date(date));
    }

    public get dateShortDescription(): string {
        const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
        return `${this.day}. ${monthNames[this.month]}`;
    }

    public get dateDescription(): string {
        return `${this.dateShortDescription} ${this.year}`;
    }

    public get timeDescription(): string {
        const minute = this.minute <= 9 ? `0${this.minute}` : this.minute.toString();
        return `${this.hour}:${minute} Uhr`;
    }

    public get description(): string {
        return `${this.dateDescription}, ${this.timeDescription}`;
    }
}
