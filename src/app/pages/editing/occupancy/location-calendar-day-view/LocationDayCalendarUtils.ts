import { CalendarEvent, GetWeekViewArgs, WeekView } from 'calendar-utils';
import { CalendarUtils } from 'angular-calendar';
import { Injectable } from '@angular/core';
import { Occupancy } from 'src/app/types/occupancy';
import { UtcDate } from 'src/app/types/utc-date';

export type GetLocationDayViewArgs = GetWeekViewArgs & {
    events?: CalendarEvent<{ occupancy: Occupancy; date: UtcDate }>[];
};

export type LocationDayView = WeekView & {
    locations: Occupancy.Location[];
};

@Injectable({
    providedIn: 'root'
})
export class LocationDayCalendarUtils extends CalendarUtils {
    public override getWeekView(args: GetLocationDayViewArgs): LocationDayView {
        const { period } = super.getWeekView(args);
        const view: LocationDayView = {
            allDayEventRows: [],
            hourColumns: [],
            locations: Occupancy.Location.all,
            period: period
        };
        view.locations.forEach((location, columnIndex) => {
            const events = args.events
                ? args.events.filter((event: CalendarEvent<{ occupancy: Occupancy; date: UtcDate }>) => event.meta ? event.meta.occupancy.location === location : false)
                : [];
            const columnView = super.getWeekView({
                ...args,
                events: events
            });
            view.hourColumns.push(columnView.hourColumns[0]);
            columnView.allDayEventRows.forEach(({ row }, rowIndex) => {
                view.allDayEventRows[rowIndex] ||= { row: [] };
                view.allDayEventRows[rowIndex].row.push({
                    ...row[0],
                    offset: columnIndex,
                    span: 1
                });
            });
        });
        return view;
    }
}
