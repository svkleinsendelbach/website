import { Component, OnInit } from '@angular/core';
import { AppearanceService } from 'src/app/services/appearance.service';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { EditType } from 'src/app/modules/firebase-api/types/edit-type';
import { ErrorLevel } from 'src/app/modules/input-form/types/error-level';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { Guid } from 'src/app/modules/firebase-api/types/guid';
import { InputError } from 'src/app/modules/input-form/types/input-error';
import { InputField } from 'src/app/modules/input-form/types/input-field';
import { InputForm } from 'src/app/modules/input-form/types/input-form';
import { internalLinks } from 'src/app/types/internal-link-path';
import { Occupancy } from 'src/app/modules/firebase-api/types/occupancy';
import { Router } from '@angular/router';
import { SelectOptions } from 'src/app/modules/input-form/components/input-field/select/select.component';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';
import { UtcDate } from 'src/app/types/utc-date';
import { ValidationResult } from 'src/app/modules/input-form/types/validation-result';
import { Validator } from 'src/app/modules/input-form/types/validator';

@Component({
    selector: 'app-edit-occupancy',
    styleUrls: ['./edit-occupancy.page.sass'],
    templateUrl: './edit-occupancy.page.html'
})
export class EditOccupancyPage implements OnInit {
    public previousOccupancy: Occupancy | null = null;

    // eslint-disable-next-line @typescript-eslint/consistent-generic-constructors
    public inputForm: InputForm<{
        end: InputField<UtcDate>;
        isRecurring: InputField<boolean>;
        location: InputField<Occupancy.Location>;
        recurringRepeatEvery: InputField<Occupancy.Recurring.Type>;
        recurringUntilIncluding: InputField<UtcDate>;
        start: InputField<UtcDate>;
        title: InputField<string>;
    }, 'failed' | 'invalidInput' | 'loading'> = new InputForm({
            end: new InputField<UtcDate>(UtcDate.now, [
                Validator.custom(endDate => {
                    if (this.inputForm.field('start').value.compare(endDate) === 'less')
                        return ValidationResult.Valid;
                    return ValidationResult.Invalid;
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
            loading: new InputError('Das Event wird gespeichert.', ErrorLevel.Info)
        });

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
        const previousOccupancy = this.sharedData.getValue('editOccupancy');
        if (previousOccupancy)
            this.previousOccupancy = Occupancy.concrete(previousOccupancy.occupancy);
        this.titleService.setTitle(this.previousOccupancy ? 'Belgungsplan Event bearbeiten' : 'Belgungsplan Event hinzufügen');
    }

    public get selectLocationOptions(): SelectOptions<Occupancy.Location> {
        return SelectOptions.ungrouped(Occupancy.Location.all.map(location => ({
            id: location,
            text: Occupancy.Location.description(location)
        })));
    }

    public get selectRecurringTypeOptions(): SelectOptions<Occupancy.Recurring.Type> {
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
        if (this.inputForm.status === 'loading')
            return;
        this.inputForm.status = 'valid';
        const validation = this.inputForm.evaluate();
        if (validation === ValidationResult.Invalid)
            return;
        this.inputForm.status = 'loading';
        const recurring: Occupancy.Recurring = {
            excludingDates: this.previousOccupancy && this.previousOccupancy.recurring ? this.previousOccupancy.recurring.excludingDates : [],
            repeatEvery: this.inputForm.field('recurringRepeatEvery').value,
            // eslint-disable-next-line object-property-newline
            untilIncluding: this.inputForm.field('recurringUntilIncluding').value.setted({ hour: 0, minute: 0 })
        };
        let occupancyId = this.previousOccupancy ? this.previousOccupancy.id : Guid.newGuid();
        let editType: EditType = this.previousOccupancy ? 'change' : 'add';
        if (this.previousOccupancy && this.previousOccupancy.recurring && !this.inputForm.field('isRecurring').value && editNotRecurring) {
            occupancyId = Guid.newGuid();
            editType = 'add';
            let { excludingDates } = this.previousOccupancy.recurring;
            const editOccupancy = this.sharedData.getValue('editOccupancy');
            // eslint-disable-next-line object-property-newline
            const editDate = editOccupancy ? UtcDate.decode(editOccupancy.editDate).setted({ hour: 0, minute: 0 }) : null;
            if (editDate && !this.previousOccupancy.recurring.excludingDates.some(date => editDate.compare(date) === 'equal'))
                // eslint-disable-next-line object-property-newline
                excludingDates = [...this.previousOccupancy.recurring.excludingDates, editDate];
            await this.firebaseApiService
                .function('occupancy')
                .function('edit')
                .call({
                    editType: 'change',
                    occupancy: {
                        ...Occupancy.flatten(this.previousOccupancy),
                        recurring: Occupancy.Recurring.flatten({
                            ...this.previousOccupancy.recurring,
                            excludingDates: excludingDates
                        })
                    },
                    occupancyId: this.previousOccupancy.id.guidString
                })
                .catch(_ => {
                    this.inputForm.status = 'failed';
                });
        }
        await this.firebaseApiService
            .function('occupancy')
            .function('edit')
            .call({
                editType: editType,
                occupancy: {
                    end: this.inputForm.field('end').value.encoded,
                    location: this.inputForm.field('location').value,
                    recurring: this.inputForm.field('isRecurring').value ? Occupancy.Recurring.flatten(recurring) : null,
                    start: this.inputForm.field('start').value.encoded,
                    title: this.inputForm.field('title').value
                },
                occupancyId: occupancyId.guidString
            })
            .catch(reason => {
                this.inputForm.status = 'failed';
                throw reason;
            });
        await this.router.navigateByUrl(internalLinks['bearbeiten/belegungsplan'].link);
        this.inputForm.status = 'valid';
    }
}
