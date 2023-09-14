import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class CalendarLocalizedDateFormtter extends CalendarDateFormatter {
    public override dayViewHour({ date, locale }: DateFormatterParams): string {
        return `${formatDate(date, 'H:mm', locale ?? 'de')} Uhr`;
    }

    public override weekViewHour(params: DateFormatterParams): string {
        return this.dayViewHour(params);
    }
}
