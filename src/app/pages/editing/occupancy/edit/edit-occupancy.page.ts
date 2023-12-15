import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationBarComponent, CalendarComponent, TextSectionComponent, AuthenticationCheckComponent, NavigationBarData, AuthenticationService, FirebaseApiService, SharedDataService, InputError, InputField, InputForm, UtcDate, Validator, SelectOptions, Guid, InternalLinkService, InputFormComponent, InlineSelectInputComponent, CheckboxInputComponent, TextInputComponent, DateTimeInputComponent } from 'kleinsendelbach-website-library';
import { InternalPathKey } from '../../../../types/internal-paths';
import { Title } from '@angular/platform-browser';
import { FirebaseFunctions } from '../../../../types/firebase-functions';
import { Occupancy } from '../../../../types/occupancy';
import { UserRole } from '../../../../types/user-role';
import { EditType } from '../../../../types/edit-type';
import { Router } from '@angular/router';

@Component({
    selector: 'edit-occupancy-page',
    standalone: true,
    imports: [CommonModule, NavigationBarComponent, CalendarComponent, TextSectionComponent, AuthenticationCheckComponent, InputFormComponent, InlineSelectInputComponent, CheckboxInputComponent, TextInputComponent, DateTimeInputComponent],
    templateUrl: './edit-occupancy.page.html',
    styleUrl: './edit-occupancy.page.sass'
})
export class EditOccupancyPage implements OnInit {

    public navigationBarData: NavigationBarData<InternalPathKey> = [
        {
            text: 'Zurück',
            alignment: 'left',
            link: 'editing/occupancy',
            action: null
        },
        {
            text: 'Abmelden',
            alignment: 'right',
            link: 'editing/login',
            action: async () => void this.authenticationService.logout()
        }
    ];

    public inputForm: InputForm<{
        end: UtcDate;
        isRecurring: boolean;
        location: Occupancy.Location;
        recurringRepeatEvery: Occupancy.Recurring.Type;
        recurringUntilIncluding: UtcDate;
        start: UtcDate;
        title: string;
    }, 'failed' | 'invalidInput' | 'loading'> = new InputForm({
        end: new InputField<UtcDate>(UtcDate.now, [
            Validator.custom(endDate => {
                if (this.inputForm.field('start').value.compare(endDate) === 'less')
                    return 'valid';
                return 'invalid';
            }, 'Das Enddatum muss nach dem Startdatum liegen.')
        ]),
        isRecurring: new InputField<boolean>(false),
        location: new InputField<Occupancy.Location>('sportshome', [
            Validator.required('Ein zugehöriger Ort ist erforderlich'),
            Validator.isOneOf(Occupancy.Location.all, 'Der zugehörige Ort ist ungültig')
        ]),
        recurringRepeatEvery: new InputField<Occupancy.Recurring.Type>('month', [
            Validator.validateIf(() => this.inputForm.field('isRecurring').value, Validator.required('Der Wiederholungstyp ist erforderlich')),
            Validator.validateIf(() => this.inputForm.field('isRecurring').value, Validator.isOneOf(Occupancy.Recurring.Type.all, 'Der Wiederholungstyp ist ungültig'))
        ]),
        recurringUntilIncluding: new InputField<UtcDate>(UtcDate.now, [Validator.validateIf(() => this.inputForm.field('isRecurring').value, Validator.futureDate('Das Datum muss in der Zukunft liegen.'))]),
        start: new InputField<UtcDate>(UtcDate.now, []),
        title: new InputField<string>('', [Validator.required('Der Titel ist erfordelich.')])
    }, {
        failed: new InputError('Das Event konnte nicht gespeichert werden.'),
        invalidInput: new InputError('Nicht alle Eingaben sind gültig.'),
        loading: new InputError('Das Event wird gespeichert.', 'info')
    });

    public previousOccupancy: Occupancy | null = null;

    constructor(
        private readonly titleService: Title,
        private readonly authenticationService: AuthenticationService<UserRole>,
        private readonly firebaseApi: FirebaseApiService<FirebaseFunctions>,
        private readonly router: Router,
        private readonly linkService: InternalLinkService<InternalPathKey>,
        private readonly sharedData: SharedDataService<{
            editOccupancy: {
                occupancy: Occupancy.Flatten;
                editDate: string;
            };
        }>
    ) {
        const previousOccupancy = this.sharedData.getValue('editOccupancy');
        if (previousOccupancy)
            this.previousOccupancy = Occupancy.concrete(previousOccupancy.occupancy);
        this.titleService.setTitle('Belegungsplan');
    }

    public get selectLocationOptions(): SelectOptions.Ungrouped<Occupancy.Location> {
        return SelectOptions.ungrouped(Occupancy.Location.all.map(location => ({
            id: location,
            text: Occupancy.Location.description(location)
        })));
    }

    public get selectRecurringTypeOptions(): SelectOptions.Ungrouped<Occupancy.Recurring.Type> {
        return SelectOptions.ungrouped(Occupancy.Recurring.Type.all.map(type => ({
            id: type,
            text: Occupancy.Recurring.Type.description(type)
        })));
    }

    public ngOnInit() {
        if (this.previousOccupancy) {
            this.inputForm.field('location').initialValue = this.previousOccupancy.location;
            this.inputForm.field('title').initialValue = this.previousOccupancy.title;
            this.inputForm.field('start').initialValue = this.previousOccupancy.start;
            this.inputForm.field('end').initialValue = this.previousOccupancy.end;
            this.inputForm.field('isRecurring').initialValue = this.previousOccupancy.recurring !== null;
            if (this.previousOccupancy.recurring) {
                this.inputForm.field('recurringUntilIncluding').initialValue = this.previousOccupancy.recurring.untilIncluding;
                this.inputForm.field('recurringRepeatEvery').initialValue = this.previousOccupancy.recurring.repeatEvery;
            }
        }
    }

    public async saveOccupancy(editNotRecurring: boolean = false) {
        if (this.inputForm.evaluate() === 'invalid')
            return;
        this.inputForm.status = 'loading';
        const recurring: Occupancy.Recurring = {
            excludingDates: this.previousOccupancy && this.previousOccupancy.recurring ? this.previousOccupancy.recurring.excludingDates : [],
            repeatEvery: this.inputForm.field('recurringRepeatEvery').value,
            untilIncluding: this.inputForm.field('recurringUntilIncluding').value.setted({ hour: 0, minute: 0 })
        };
        let occupancyId = this.previousOccupancy ? this.previousOccupancy.id : Guid.newGuid();
        let editType: EditType = this.previousOccupancy ? 'change' : 'add';
        if (this.previousOccupancy && this.previousOccupancy.recurring && !this.inputForm.field('isRecurring').value && editNotRecurring) {
            occupancyId = Guid.newGuid();
            editType = 'add';
            let { excludingDates } = this.previousOccupancy.recurring;
            const editOccupancy = this.sharedData.getValue('editOccupancy');
            const editDate = editOccupancy ? UtcDate.decode(editOccupancy.editDate).setted({ hour: 0, minute: 0 }) : null;
            if (editDate && !this.previousOccupancy.recurring.excludingDates.some(date => editDate.compare(date) === 'equal'))
                excludingDates = [...this.previousOccupancy.recurring.excludingDates, editDate];
            const result1 = await this.firebaseApi.function('occupancy-edit').call({
                editType: 'change',
                occupancy: {
                    ...Occupancy.flatten(this.previousOccupancy),
                    recurring: Occupancy.Recurring.flatten({
                        ...this.previousOccupancy.recurring,
                        excludingDates: excludingDates
                    })
                },
                occupancyId: this.previousOccupancy.id.guidString
            });
            if (result1.isFailure())
                this.inputForm.status = 'failed';
        }
        const result2 = await this.firebaseApi.function('occupancy-edit').call({
            editType: editType,
            occupancy: {
                end: this.inputForm.field('end').value.encoded,
                location: this.inputForm.field('location').value,
                recurring: this.inputForm.field('isRecurring').value ? Occupancy.Recurring.flatten(recurring) : null,
                start: this.inputForm.field('start').value.encoded,
                title: this.inputForm.field('title').value
            },
            occupancyId: occupancyId.guidString
        });
        if (result2.isFailure())
            this.inputForm.status = 'failed';
        else {
            await this.router.navigateByUrl(this.linkService.link('editing/occupancy').link);
            this.inputForm.status = 'valid';
        }
    }
}