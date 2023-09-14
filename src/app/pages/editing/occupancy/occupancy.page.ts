import { CalendarDateFormatter, CalendarEvent, CalendarEventTitleFormatter, CalendarMonthViewDay, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { AppearanceService } from 'src/app/services/appearance.service';
import { CalendarEventTitleWithDateFormatter } from './CalendarEventTitleWithDateFormatter';
import { CalendarLocalizedDateFormtter } from './CalendarLocalizedDateFormatter';
import { Component } from '@angular/core';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { FetchState } from 'src/app/types/fetch-state';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { Guid } from 'src/app/modules/firebase-api/types/guid';
import { InternalLink } from 'src/app/types/internal-path';
import { Occupancy } from 'src/app/modules/firebase-api/types/occupancy';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';

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
    styleUrls: ['./occupancy.page.sass'],
    templateUrl: './occupancy.page.html'
})
export class OccupancyPage {
    public CalendarView = CalendarView;

    public FetchState = FetchState;

    public Location = Occupancy.Location;

    public occupancies: FetchState<Occupancy[]> = FetchState.loading;

    /*
     *FetchState.success([
     *  {
     *      end: UtcDate.now.advanced({ hour: 3 }),
     *      id: Guid.newGuid(),
     *      location: 'a-field',
     *      recurring: null,
     *      start: UtcDate.now.advanced({ hour: 1 }),
     *      title: 'Occupancy 1'
     *  },
     *  {
     *      end: UtcDate.now.advanced({ day: 1, hour: 5 }),
     *      id: Guid.newGuid(),
     *      location: 'a-field',
     *      recurring: null,
     *      start: UtcDate.now.advanced({ hour: 4 }),
     *      title: 'Occupancy 2'
     *  },
     *  {
     *      end: UtcDate.now.advanced({ hour: 5 }),
     *      id: Guid.newGuid(),
     *      location: 'b-field',
     *      recurring: null,
     *      start: UtcDate.now.advanced({ hour: 2 }),
     *      title: 'Occupancy 3'
     *  },
     *  {
     *      end: UtcDate.now.advanced({ hour: 1 }),
     *      id: Guid.newGuid(),
     *      location: 'sportshome',
     *      recurring: {
     *          excludingDates: [
     *              UtcDate.now.setted({ hour: 0, minute: 0 }).advanced({ day: 2 }),
     *              UtcDate.now.setted({ hour: 0, minute: 0 }).advanced({ day: 3 }),
     *              UtcDate.now.setted({ hour: 0, minute: 0 }).advanced({ day: 11 })
     *          ],
     *          repeatEvery: 'day',
     *          untilIncluding: UtcDate.now.setted({ hour: 0, minute: 0 }).advanced({ day: 10 })
     *      },
     *      start: UtcDate.now.advanced({ hour: 0 }),
     *      title: 'Occupancy 4'
     *  },
     *  {
     *      end: UtcDate.now.advanced({ day: 1, hour: 2 }),
     *      id: Guid.newGuid(),
     *      location: 'sportshome',
     *      recurring: {
     *          excludingDates: [
     *              UtcDate.now.setted({ hour: 0, minute: 0 }).advanced({ day: 3 }),
     *              UtcDate.now.setted({ hour: 0, minute: 0 }).advanced({ day: 14 })
     *          ],
     *          repeatEvery: 'week',
     *          untilIncluding: UtcDate.now.setted({ hour: 0, minute: 0 }).advanced({ day: 21 })
     *      },
     *      start: UtcDate.now.advanced({ hour: 1 }),
     *      title: 'Occupancy 5'
     *  },
     *  {
     *      end: new UtcDate(2023, 8, 31, 11, 0),
     *      id: Guid.newGuid(),
     *      location: 'sportshome',
     *      recurring: {
     *          excludingDates: [
     *              new UtcDate(2023, 10, 31, 0, 0),
     *              new UtcDate(2023, 11, 30, 0, 0)
     *          ],
     *          repeatEvery: 'month',
     *          untilIncluding: new UtcDate(2024, 8, 31, 0, 0)
     *      },
     *      start: new UtcDate(2023, 8, 31, 10, 0),
     *      title: 'Occupancy 6'
     *  },
     *  {
     *      end: new UtcDate(2020, 2, 29, 11, 0),
     *      id: Guid.newGuid(),
     *      location: 'sportshome',
     *      recurring: {
     *          excludingDates: [],
     *          repeatEvery: 'year',
     *          untilIncluding: new UtcDate(2024, 8, 31, 0, 0)
     *      },
     *      start: new UtcDate(2020, 2, 29, 10, 0),
     *      title: 'Occupancy 7'
     *  }
     *]);
     */

    public activeDate = new Date();

    public activeDateIsOpen = true;

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
            editOccupancy: Occupancy.Flatten;
        }>
    ) {
        this.titleService.setTitle('Belegungsplan');
    }

    public events(occupancies: Occupancy[]): CalendarEvent<{ location: Occupancy.Location }>[] {
        return occupancies.flatMap(occupancy => Occupancy.calendarEvents(occupancy));
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

    public async deleteOccupancy(occupancyId: Guid) {
        if (!this.occupancies.isSuccess())
            return;
        this.occupancies = FetchState.success(this.occupancies.content.filter(occupancy => occupancy.id.guidString !== occupancyId.guidString));
        await this.firebaseApiService
            .function('occupancy')
            .function('edit')
            .call({
                editType: 'remove',
                occupancy: null,
                occupancyId: occupancyId.guidString
            });
    }

    public async editOccupancy(occupancy: Occupancy) {
        this.sharedData.setValue('editOccupancy', Occupancy.flatten(occupancy));
        await this.router.navigateByUrl(InternalLink.all['bearbeiten/belegunsplan/bearbeiten'].link);
    }

    public async addNewOccupancy() {
        this.sharedData.removeValue('editOccupancy');
        await this.router.navigateByUrl(InternalLink.all['bearbeiten/belegunsplan/bearbeiten'].link);
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

    public trackByIdentity<T>(_index: number, value: T): T {
        return value;
    }
}
