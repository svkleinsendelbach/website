import { CalendarEvent, CalendarEventTitleFormatter } from 'angular-calendar';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class CalendarEventTitleWithDateFormatter extends CalendarEventTitleFormatter {
    public constructor(
        @Inject(LOCALE_ID) private readonly locale: string
    ) {
        super();
    }

    public override month(event: CalendarEvent, title: string): string {
        return `<b>${formatDate(event.start, 'H:mm', this.locale)} Uhr</b> ${title}`;
    }
}
