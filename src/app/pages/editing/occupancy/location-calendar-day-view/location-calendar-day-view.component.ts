import { CalendarEvent, CalendarWeekViewComponent, DateAdapter, getWeekViewPeriod } from 'angular-calendar';
import { ChangeDetectorRef, Component, ElementRef, Inject, LOCALE_ID } from '@angular/core';
import { LocationDayCalendarUtils, LocationDayView } from './LocationDayCalendarUtils';
import { WeekViewAllDayEventRow, WeekViewHourColumn } from 'calendar-utils';
import { Occupancy } from 'src/app/modules/firebase-api/types/occupancy';
import { UtcDate } from 'src/app/types/utc-date';

@Component({
    selector: 'app-location-calendar-day-view',
    styleUrls: ['./location-calendar-day-view.component.sass'],
    templateUrl: './location-calendar-day-view.component.html'
})
export class LocationCalendarDayViewComponent extends CalendarWeekViewComponent {
    public Location = Occupancy.Location;

    public override view: LocationDayView;

    public override daysInWeek = 1;

    public constructor(
        protected override cdr: ChangeDetectorRef,
        protected override utils: LocationDayCalendarUtils,
        @Inject(LOCALE_ID) locale: string,
        protected override dateAdapter: DateAdapter,
        protected override element: ElementRef<HTMLElement>
    ) {
        super(cdr, utils, locale, dateAdapter, element);
        this.view = {
            ...super.view,
            locations: Occupancy.Location.all
        };
        (this.view.allDayEventRows as WeekViewAllDayEventRow[] | undefined) ??= [];
        (this.view.hourColumns as WeekViewHourColumn[] | undefined) ??= [];
    }

    public trackByIdentity<T>(_index: number, value: T): T {
        return value;
    }

    public override getDayColumnWidth(eventRowContainer: HTMLElement): number {
        return Math.floor(eventRowContainer.offsetWidth / Occupancy.Location.all.length);
    }

    protected override getWeekView(events: CalendarEvent<{ occupancy: Occupancy; date: UtcDate }>[]): LocationDayView {
        return this.utils.getWeekView({
            absolutePositionedEvents: true,
            dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute
            },
            dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute
            },
            events: events,
            excluded: this.excludeDays,
            hourSegments: this.hourSegments,
            precision: this.precision,
            segmentHeight: this.hourSegmentHeight,
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            weekendDays: this.weekendDays,
            ...getWeekViewPeriod(
                this.dateAdapter,
                this.viewDate,
                this.weekStartsOn,
                this.excludeDays,
                this.daysInWeek
            )
        });
    }
}
