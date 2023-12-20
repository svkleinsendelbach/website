import { InternalPathKey } from './../../../../types/internal-paths';
import { Component } from '@angular/core';
import { AuthenticationCheckComponent, AuthenticationService, ButtonComponent, CalendarComponent, Color, FirebaseApiService, LinkService, NavigationBarComponent, NavigationBarData, Result, ResultDisplayComponent, SharedDataService, TextSectionComponent, User, UtcDate } from 'kleinsendelbach-website-library';
import { Title } from '@angular/platform-browser';
import { FirebaseFunctions } from '../../../../types/firebase-functions';
import { UserRole } from '../../../../types/user-role';
import { Occupancy } from '../../../../types/occupancy';
import { CalendarEvent } from 'angular-calendar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'occupancy-overview-page',
    standalone: true,
    imports: [CommonModule, NavigationBarComponent, CalendarComponent, TextSectionComponent, ButtonComponent, AuthenticationCheckComponent, ResultDisplayComponent],
    templateUrl: './occupancy-overview.page.html',
    styleUrl: './occupancy-overview.page.sass'
})
export class OccupancyOverviewPage {

    public navigationBarData: NavigationBarData<InternalPathKey> = [
        {
            text: 'Zurück',
            alignment: 'left',
            link: 'editing/main',
            action: null
        },
        {
            text: 'Abmelden',
            alignment: 'right',
            link: 'editing/login',
            action: async () => void this.authenticationService.logout()
        }
    ];

    public calendarColumns: {
        id: Occupancy.Location;
        text: string;
        color: Color;
    }[] = Occupancy.Location.all.map(location => ({
        id: location,
        text: Occupancy.Location.description(location),
        color: Color.hex(Occupancy.Location.color(location).primary)
    }));

    public occupanciesResult: Result<Occupancy[]> | null = null;

    constructor(
        private readonly titleService: Title,
        private readonly authenticationService: AuthenticationService<UserRole>,
        private readonly firebaseApi: FirebaseApiService<FirebaseFunctions>,
        private readonly router: Router,
        private readonly linkService: LinkService<InternalPathKey>,
        private readonly sharedData: SharedDataService<{
            editOccupancy: {
                occupancy: Occupancy.Flatten;
                editDate: string;
            };
        }>
    ) {
        this.titleService.setTitle('Belegungsplan');
    }

    public async getOccupancies() {
        this.occupanciesResult = await this.firebaseApi.function('occupancy-get').call({});
    }

    public clearSharedData() {
        this.sharedData.removeValue('editOccupancy');
    }

    public events(occupancies: Occupancy[]): CalendarEvent<{ occupancy: Occupancy; date: UtcDate; columnId: Occupancy.Location }>[] {
        return occupancies.flatMap(occupancy => Occupancy.calendarEvents(occupancy).map(event => ({
            ...event,
            actions: [
                {
                    label: '<i class="fa fa-pencil"></i> Berarbeiten |',
                    // eslint-disable-next-line @typescript-eslint/no-shadow
                    onClick: ({ event }: {
                        event: CalendarEvent<{ occupancy: Occupancy; date: UtcDate; columnId: Occupancy.Location }>;
                        sourceEvent: KeyboardEvent | MouseEvent;
                    }) => {
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        void this.editOccupancy(event.meta!.occupancy, event.meta!.date);
                    }
                },
                {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    label: event.meta!.occupancy.recurring ? ' <i class="fa fa-trash"></i> Alle |' : ' <i class="fa fa-trash"></i> Löschen',
                    // eslint-disable-next-line @typescript-eslint/no-shadow
                    onClick: ({ event }: {
                        event: CalendarEvent<{ occupancy: Occupancy; date: UtcDate; columnId: Occupancy.Location }>;
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
                            label: ' <i class="fa fa-trash"></i> Einzelnen',
                            // eslint-disable-next-line @typescript-eslint/no-shadow
                            onClick: ({ event }: {
                                event: CalendarEvent<{ occupancy: Occupancy; date: UtcDate; columnId: Occupancy.Location }>;
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

    public async deleteOccupancy(occupancy: Occupancy, editDate: UtcDate, deleteNotRecurring: boolean = false) {
        if (!this.occupanciesResult || this.occupanciesResult.isFailure())
            return;
        if (occupancy.recurring && deleteNotRecurring) {
            const _editDate = editDate.setted({ hour: 0, minute: 0 });
            let { excludingDates } = occupancy.recurring;
            if (!occupancy.recurring.excludingDates.some(date => _editDate.compare(date) === 'equal'))
                excludingDates = [...occupancy.recurring.excludingDates, _editDate];
            const newOccupancy: Occupancy = {
                ...occupancy,
                recurring: {
                    ...occupancy.recurring,
                    excludingDates: excludingDates
                }
            };
            this.occupanciesResult = Result.success(this.occupanciesResult.value.map(_occupancy => _occupancy.id.guidString === occupancy.id.guidString ? newOccupancy : _occupancy));
            await this.firebaseApi.function('occupancy-edit').call({
                editType: 'change',
                occupancy: Occupancy.flatten(newOccupancy),
                occupancyId: occupancy.id.guidString
            });
        } else {
            this.occupanciesResult = Result.success(this.occupanciesResult.value.filter(_occupancy => _occupancy.id.guidString !== occupancy.id.guidString));
            await this.firebaseApi.function('occupancy-edit').call({
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
        await this.router.navigateByUrl(this.linkService.link('editing/occupancy/edit').link);
    }
}
