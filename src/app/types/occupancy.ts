import { Guid, UtcDate } from "kleinsendelbach-website-library";
import { CalendarEvent } from "angular-calendar";

export type Occupancy = {
    id: Guid;
    location: Occupancy.Location;
    title: string;
    start: UtcDate;
    end: UtcDate;
    recurring: Occupancy.Recurring | null;
};

export namespace Occupancy {
    export type Location = 'a-field' | 'b-field' | 'sportshome';

    export namespace Location {
        export const all: Location[] = ['sportshome', 'a-field', 'b-field'];

        export function description(location: Location): string {
            switch (location) {
            case 'a-field':
                return 'A-Platz';
            case 'b-field':
                return 'B-Platz';
            case 'sportshome':
                return 'Sportheim';
            default:
                return '';
            }
        }

        export function color(location: Location): Exclude<CalendarEvent['color'], undefined> {
            switch (location) {
            case 'a-field':
                return {
                    primary: '#ad2121',
                    secondary: '#FAE3E3',
                    secondaryText: '#24252A'
                };
            case 'b-field':
                return {
                    primary: '#e3bc08',
                    secondary: '#FDF1BA',
                    secondaryText: '#24252A'
                };
            case 'sportshome':
                return {
                    primary: '#1e90ff',
                    secondary: '#D1E8FF',
                    secondaryText: '#24252A'
                };
            default:
                return {
                    primary: '#888888',
                    secondary: '#CCCCCC',
                    secondaryText: '#24252A'
                };
            }
        }
    }

    export type Recurring = {
        repeatEvery: Recurring.Type;
        untilIncluding: UtcDate;
        excludingDates: UtcDate[];
    };

    export namespace Recurring {
        export type Type = 'day' | 'month' | 'week' | 'year';

        export namespace Type {
            export const all: Type[] = ['day', 'week', 'month', 'year'];

            export function description(type: Type): string {
                switch (type) {
                case 'day':
                    return 'Tag';
                case 'month':
                    return 'Monat';
                case 'week':
                    return 'Woche';
                case 'year':
                    return 'Jahr';
                default:
                    return '';
                }
            }
        }

        export type Flatten = {
            repeatEvery: Recurring.Type;
            untilIncluding: string;
            excludingDates: string[];
        };

        export function flatten(recurring: Recurring): Recurring.Flatten {
            return {
                excludingDates: recurring.excludingDates.map(date => date.encoded),
                repeatEvery: recurring.repeatEvery,
                untilIncluding: recurring.untilIncluding.encoded
            };
        }

        export function concrete(recurring: Recurring.Flatten): Recurring {
            return {
                excludingDates: recurring.excludingDates.map(date => UtcDate.decode(date)),
                repeatEvery: recurring.repeatEvery,
                untilIncluding: UtcDate.decode(recurring.untilIncluding)
            };
        }

        export function advancement(type: Type, times: number): Record<'day' | 'month' | 'year', number> {
            return {
                day: type === 'day' ? times : type === 'week' ? 7 * times : 0,
                month: type === 'month' ? times : 0,
                year: type === 'year' ? times : 0
            };
        }
    }

    export type Flatten = {
        id: string;
        location: Occupancy.Location;
        title: string;
        start: string;
        end: string;
        recurring: Occupancy.Recurring.Flatten | null;
    };

    export function flatten(occupancy: Occupancy): Occupancy.Flatten;
    export function flatten(occupancy: Omit<Occupancy, 'id'>): Omit<Occupancy.Flatten, 'id'>;
    export function flatten(occupancy: Occupancy | Omit<Occupancy, 'id'>): Occupancy.Flatten | Omit<Occupancy.Flatten, 'id'> {
        return {
            ...'id' in occupancy ? { id: occupancy.id.guidString } : {},
            end: occupancy.end.encoded,
            location: occupancy.location,
            recurring: occupancy.recurring === null
                ? null
                : Occupancy.Recurring.flatten(occupancy.recurring),
            start: occupancy.start.encoded,
            title: occupancy.title
        };
    }

    export function concrete(occupancy: Occupancy.Flatten): Occupancy;
    export function concrete(occupancy: Omit<Occupancy.Flatten, 'id'>): Omit<Occupancy, 'id'>;
    export function concrete(occupancy: Occupancy.Flatten | Omit<Occupancy.Flatten, 'id'>): Occupancy | Omit<Occupancy, 'id'> {
        return {
            ...'id' in occupancy ? { id: new Guid(occupancy.id) } : {},
            end: UtcDate.decode(occupancy.end),
            location: occupancy.location,
            recurring: occupancy.recurring === null
                ? null
                : Occupancy.Recurring.concrete(occupancy.recurring),
            start: UtcDate.decode(occupancy.start),
            title: occupancy.title
        };
    }

    export function toCalendarEvent(occupancy: Occupancy, originalOccupancy: Occupancy): CalendarEvent<{ occupancy: Occupancy; date: UtcDate; columnId: Occupancy.Location }> {
        return {
            color: Location.color(occupancy.location),
            end: occupancy.end.localized,
            id: occupancy.id.guidString,
            meta: {
                date: occupancy.start,
                occupancy: originalOccupancy,
                columnId: occupancy.location
            },
            start: occupancy.start.localized,
            title: `${occupancy.title} | ${Location.description(occupancy.location)}`
        };
    }

    export function calendarEvents(occupancy: Occupancy): CalendarEvent<{ occupancy: Occupancy; date: UtcDate; columnId: Occupancy.Location }>[] {
        if (!occupancy.recurring)
            return [toCalendarEvent(occupancy, occupancy)];
        const events: CalendarEvent<{ occupancy: Occupancy; date: UtcDate; columnId: Occupancy.Location }>[] = [];
        let i = 0;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, no-constant-condition
        while (true) {
            const event = toCalendarEvent({
                ...occupancy,
                end: occupancy.end.advanced(Recurring.advancement(occupancy.recurring.repeatEvery, i)),
                start: occupancy.start.advanced(Recurring.advancement(occupancy.recurring.repeatEvery, i))
            }, occupancy);
            // eslint-disable-next-line object-property-newline, newline-per-chained-call
            const startDay = occupancy.start.advanced(Recurring.advancement(occupancy.recurring.repeatEvery, i)).setted({ hour: 0, minute: 0 });
            if (occupancy.recurring.untilIncluding.compare(startDay) === 'less')
                break;
            if (!occupancy.recurring.excludingDates.some(excludingDate => excludingDate.compare(startDay) === 'equal'))
                events.push(event);
            i += 1;
        }
        return events;
    }
}
