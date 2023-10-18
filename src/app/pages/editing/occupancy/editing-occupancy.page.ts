import { CalendarDateFormatter, CalendarEvent, CalendarEventTitleFormatter, CalendarMonthViewDay, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { AppearanceService } from 'src/app/services/appearance.service';
import { CalendarEventTitleWithDateFormatter } from './CalendarEventTitleWithDateFormatter';
import { CalendarLocalizedDateFormtter } from './CalendarLocalizedDateFormatter';
import { Component } from '@angular/core';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { FetchState } from 'src/app/types/fetch-state';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { internalLinks } from 'src/app/types/internal-link-path';
import { Occupancy } from 'src/app/modules/firebase-api/types/occupancy';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';
import { TrackBy } from 'src/app/types/track-by';
import { UtcDate } from 'src/app/types/utc-date';

@Component({
    providers: [
        {
            provide: CalendarEventTitleFormatter,
            useClass: CalendarEventTitleWithDateFormatter
        },
        {
            provide: CalendarDateFormatter,
            useClass: CalendarLocalizedDateFormtter
        }
    ],
    selector: 'app-occupancy',
    styleUrls: ['./editing-occupancy.page.sass'],
    templateUrl: './editing-occupancy.page.html'
})
export class EditingOccupancyPage {
    public TrackBy = TrackBy;

    public CalendarView = CalendarView;

    public FetchState = FetchState;

    public Location = Occupancy.Location;

    public occupancies: FetchState<Occupancy[]> = FetchState.loading;

    public activeDate = new Date();

    public activeDateIsOpen = false;

    public currentView = CalendarView.Month;

    public readonly locale = 'de';

    public readonly weekStartsOn = DAYS_OF_WEEK.MONDAY;

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        public readonly appearance: AppearanceService,
        private readonly firebaseApiService: FirebaseApiService,
        private readonly router: Router,
        private readonly sharedData: SharedDataService<{
            editOccupancy: {
                occupancy: Occupancy.Flatten;
                editDate: string;
            };
        }>
    ) {
        this.titleService.setTitle('Belegungsplan');
    }

    public events(occupancies: Occupancy[]): CalendarEvent<{ occupancy: Occupancy; date: UtcDate }>[] {
        return occupancies.flatMap(occupancy => Occupancy.calendarEvents(occupancy).map(event => ({
            ...event,
            actions: [
                {
                    label: '<i class="fa fa-pencil"></i> |',
                    // eslint-disable-next-line @typescript-eslint/no-shadow
                    onClick: ({ event }: {
                        event: CalendarEvent<{ occupancy: Occupancy; date: UtcDate }>;
                        sourceEvent: KeyboardEvent | MouseEvent;
                    }) => {
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        void this.editOccupancy(event.meta!.occupancy, event.meta!.date);
                    }
                },
                {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    label: event.meta!.occupancy.recurring ? ' <i class="fa fa-trash"></i> Alle |' : ' <i class="fa fa-trash"></i>',
                    // eslint-disable-next-line @typescript-eslint/no-shadow
                    onClick: ({ event }: {
                        event: CalendarEvent<{ occupancy: Occupancy; date: UtcDate }>;
                        sourceEvent: KeyboardEvent | MouseEvent;
                    }) => {
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        void this.deleteOccupancy(event.meta!.occupancy, event.meta!.date);
                    }
                },
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ...event.meta!.occupancy.recurring
                    ? [
                        {
                            label: ' <i class="fa fa-trash"></i> Einzeln',
                            // eslint-disable-next-line @typescript-eslint/no-shadow
                            onClick: ({ event }: {
                                event: CalendarEvent<{ occupancy: Occupancy; date: UtcDate }>;
                                sourceEvent: KeyboardEvent | MouseEvent;
                            }) => {
                                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                void this.deleteOccupancy(event.meta!.occupancy, event.meta!.date, true);
                            }
                        }
                    ]
                    : []
            ]
        })));
    }

    public getOccupancy() {
        this.firebaseApiService
            .function('occupancy')
            .function('getAll')
            .call({})
            .then(occupancies => {
                this.occupancies = FetchState.success(occupancies.map(occupancy => Occupancy.concrete(occupancy)));
            })
            .catch(reason => {
                this.occupancies = FetchState.failure(reason);
            });
    }

    public async deleteOccupancy(occupancy: Occupancy, editDate: UtcDate, deleteNotRecurring: boolean = false) {
        if (!this.occupancies.isSuccess())
            return;
        if (occupancy.recurring && deleteNotRecurring) {
            // eslint-disable-next-line no-underscore-dangle, object-property-newline
            const _editDate = editDate.setted({ hour: 0, minute: 0 });
            let { excludingDates } = occupancy.recurring;
            if (!occupancy.recurring.excludingDates.some(date => _editDate.compare(date) === 'equal'))
                // eslint-disable-next-line object-property-newline
                excludingDates = [...occupancy.recurring.excludingDates, _editDate];
            const newOccupancy: Occupancy = {
                ...occupancy,
                recurring: {
                    ...occupancy.recurring,
                    excludingDates: excludingDates
                }
            };
            this.occupancies = FetchState.success(this.occupancies.content.map(_occupancy => _occupancy.id.guidString === occupancy.id.guidString ? newOccupancy : _occupancy));
            await this.firebaseApiService
                .function('occupancy')
                .function('edit')
                .call({
                    editType: 'change',
                    occupancy: Occupancy.flatten(newOccupancy),
                    occupancyId: occupancy.id.guidString
                });
        } else {
            this.occupancies = FetchState.success(this.occupancies.content.filter(_occupancy => _occupancy.id.guidString !== occupancy.id.guidString));
            await this.firebaseApiService
                .function('occupancy')
                .function('edit')
                .call({
                    editType: 'remove',
                    occupancy: null,
                    occupancyId: occupancy.id.guidString
                });
        }
    }

    public async editOccupancy(occupancy: Occupancy, editDate: UtcDate) {
        this.sharedData.setValue('editOccupancy', {
            editDate: editDate.encoded,
            occupancy: Occupancy.flatten(occupancy)
        });
        await this.router.navigateByUrl(internalLinks['bearbeiten/belegungsplan/bearbeiten'].link);
    }

    public async addNewOccupancy() {
        this.sharedData.removeValue('editOccupancy');
        await this.router.navigateByUrl(internalLinks['bearbeiten/belegungsplan/bearbeiten'].link);
    }

    public dateClicked(day: CalendarMonthViewDay) {
        if (!isSameMonth(day.date, this.activeDate))
            return;
        if (isSameDay(day.date, this.activeDate)) {
            if (this.activeDateIsOpen)
                this.viewDate(day.date);
            else
                this.activeDateIsOpen = true;
        }
        if (day.events.length === 0)
            this.viewDate(day.date);
        this.activeDate = day.date;
    }

    public eventClicked(event: CalendarEvent<{ occupancy: Occupancy; date: UtcDate }>) {
        this.viewDate(event.start);
    }

    public viewDate(date: Date) {
        this.activeDate = date;
        this.currentView = CalendarView.Day;
    }

    public setCurrentView(view: CalendarView) {
        this.currentView = view;
    }

    public closeActiveDate() {
        this.activeDateIsOpen = false;
    }
}
