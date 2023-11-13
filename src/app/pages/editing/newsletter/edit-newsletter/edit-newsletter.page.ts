import { EventGroup } from './../../../../types/event';
import { TrackBy } from 'src/app/types/track-by';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { SelectOptions } from 'src/app/modules/input-form/components/input-field/select/select.component';
import { ErrorLevel } from 'src/app/modules/input-form/types/error-level';
import { InputError } from 'src/app/modules/input-form/types/input-error';
import { InputField } from 'src/app/modules/input-form/types/input-field';
import { InputForm } from 'src/app/modules/input-form/types/input-form';
import { Validator } from 'src/app/modules/input-form/types/validator';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { EventGroupId } from 'src/app/types/event';
import { Newsletter } from 'src/app/types/newletter';
import { mapRecord, recordEntries, recordKeys, recordValues } from 'src/app/types/record-array';
import { UtcDate } from 'src/app/types/utc-date';
import { ValidationResult } from 'src/app/modules/input-form/types/validation-result';
import { internalLinks } from 'src/app/types/internal-link-path';

@Component({
    selector: 'app-edit-newsletter',
    templateUrl: './edit-newsletter.page.html',
    styleUrls: ['./edit-newsletter.page.sass']
})
export class EditNewsletterPage implements OnInit {
    public TrackBy = TrackBy;

    public Department = Newsletter.Department;

    public EventGroup = EventGroupId;

    public previousNewsletter: Newsletter | null = null;

    public isPreviewShown = false;

    public titlePageInputForm = new InputForm({
        title: new InputField<string>('', [Validator.required('Der Titel ist erforderlich.')]),
        description: new InputField<string>('', [Validator.required('Die Nachricht ist erforderlich.')]),
        month: new InputField<Newsletter.Month>(Newsletter.Month.fromNumber(UtcDate.now.month) ?? 'january', [
            Validator.required('Der Monat ist erforderlich.'),
            Validator.isOneOf(recordKeys(Newsletter.Month.title), 'Der Monat ist ungültig.')
        ]),
        year: new InputField<number>(UtcDate.now.year)
    }, {
        failed: new InputError('Der Newsletter konnte nicht gespeichert werden.'),
        invalidInput: new InputError('Nicht alle Eingaben sind gültig.'),
        hasEmptyDepartmentOrEvent: new InputError('Es gibt Abteilungen ohne Berichte oder fehlende Termine. Bitte füge sie unten hinzu.'),
        loading: new InputError('Der Newsletter wird gespeichert.', ErrorLevel.Info)
    });

    public departments: Record<Newsletter.Department, {
        title: string;
        description: string;
    }[]>;

    public activeDepartment: ['add' | 'edit', Newsletter.Department, number] | null = null;

    public departmentInputForm = new InputForm({
        title: new InputField<string>('', [Validator.required('Der Titel ist erforderlich.')]),
        description: new InputField<string>('', [Validator.required('Die Nachricht ist erforderlich.')])
    }, {
        invalidInput: new InputError('Nicht alle Eingaben sind gültig.')
    });

    public events: Record<EventGroupId, {
        date: UtcDate;
        title: string;
        subtitle: string | null;
    }[]>;

    public activeEvent: ['add' | 'edit', EventGroupId, number] | null = null;

    public eventInputForm = new InputForm({
        date: new InputField<UtcDate>(UtcDate.now, [Validator.futureDate('Das Datum muss in der Zukunft liegen')]),
        title: new InputField<string>('', [Validator.required('Der Titel ist erforderlich.')]),
        subtitle: new InputField<string>('')
    }, {
        invalidInput: new InputError('Nicht alle Eingaben sind gültig.')
    });

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly firebaseApiService: FirebaseApiService,
        private readonly sharedData: SharedDataService<{
            editNewsletter: Newsletter;
        }>,
        private readonly router: Router
    ) {
        this.previousNewsletter = this.sharedData.getValue('editNewsletter');
        this.titleService.setTitle(this.previousNewsletter ? 'Newsletter bearbeiten' : 'Newsletter hinzufügen');
        this.departments = mapRecord(Newsletter.Department.title, () => []);
        this.events = mapRecord(EventGroupId.title, () => []);
    }

    public get monthSelectOptions(): SelectOptions<Newsletter.Month> {
        return SelectOptions.ungrouped<Newsletter.Month>(recordEntries(Newsletter.Month.title).map(entry => ({ id: entry.key, text: entry.value })));
    }

    public ngOnInit() {
        if (this.previousNewsletter) {
            this.titlePageInputForm.field('title').initialValue = this.previousNewsletter.titlePage.title;
            this.titlePageInputForm.field('description').initialValue = this.previousNewsletter.titlePage.description;
            this.titlePageInputForm.field('month').initialValue = this.previousNewsletter.titlePage.month;
            this.titlePageInputForm.field('year').initialValue = this.previousNewsletter.titlePage.year;
            this.departments = mapRecord(this.previousNewsletter.departments, department => department ?? []);
            this.events = mapRecord(this.previousNewsletter.events, event => event ?? []);
        }
    }

    public togglePreview(active: boolean) {
        this.isPreviewShown = active;
    }

    public get departmentList(): {
        id: Newsletter.Department;
        content: {
            index: number;
            title: string;
            description: string;
        }[];
    }[] {
        return recordEntries(this.departments).map(entry => ({
            id: entry.key,
            content: entry.value.map((department, index) => ({
                index: index,
                ...department
            }))
        }));
    }

    public get hasEmptyDepartment(): boolean {
        return recordValues(this.departments).some(department => department.length === 0);
    }

    public addDepartmentButtonClicked(id: Newsletter.Department) {
        this.activeDepartment = ['add', id, this.departments[id].length];
        this.departmentInputForm.reset();
    }

    public editDepartmentButtonClicked(id: Newsletter.Department, content: {
        index: number;
        title: string;
        description: string;
    }) {
        this.activeDepartment = ['edit', id, content.index];
        this.departmentInputForm.field('title').inputValue = content.title;
        this.departmentInputForm.field('description').inputValue = content.description;
    }

    public deleteDepartmentButtonClicked(id: Newsletter.Department, index: number) {
        this.departments[id].splice(index, 1);
        if (this.activeDepartment && this.activeDepartment[1] === id && this.activeDepartment[2] >= index) {
            if (this.activeDepartment[2] === index) {
                this.activeDepartment = null;
                this.departmentInputForm.reset();
            }
            if (this.activeDepartment && this.activeDepartment[2] !== 0)
                this.activeDepartment[2] -= 1;
        }
    }

    public cancelDepartmentInput() {
        this.activeDepartment = null;
        this.departmentInputForm.reset();
    }

    public submitDepartmentInput() {
        if (!this.activeDepartment)
            return;
        if (this.departmentInputForm.evaluate() === ValidationResult.Invalid)
            return;
        const department = {
            title: this.departmentInputForm.field('title').value,
            description: this.departmentInputForm.field('description').value
        };
        if (this.activeDepartment[2] < this.departments[this.activeDepartment[1]].length)
            this.departments[this.activeDepartment[1]][this.activeDepartment[2]] = department;
        else
            this.departments[this.activeDepartment[1]].push(department);
        if (this.activeDepartment[0] === 'add')
            this.activeDepartment[2] += 1;
        else
            this.activeDepartment = null;
        this.departmentInputForm.reset();
    }

    public get eventList(): {
        id: EventGroupId;
        events: {
            index: number;
            date: UtcDate;
            title: string;
            subtitle: string | null;
        }[];
    }[] {
        return recordEntries(this.events).map(entry => ({
            id: entry.key,
            events: entry.value.map((event, index) => ({
                index: index,
                ...event
            }))
        }));
    }

    public get hasEmptyEventGroup(): boolean {
        return recordValues(this.events).some(eventGroup => eventGroup.length === 0);
    }

    public addEventButtonClicked(id: EventGroupId) {
        this.activeEvent = ['add', id, this.events[id].length];
        this.eventInputForm.reset();
    }

    public editEventButtonClicked(id: EventGroupId, event: {
        index: number;
        date: UtcDate;
        title: string;
        subtitle: string | null;
    }) {
        this.activeEvent = ['edit', id, event.index];
        this.eventInputForm.field('date').inputValue = event.date;
        this.eventInputForm.field('title').inputValue = event.title;
        this.eventInputForm.field('subtitle').inputValue = event.subtitle ?? '';
    }

    public deleteEventButtonClicked(id: EventGroupId, index: number) {
        this.events[id].splice(index, 1);
        if (this.activeEvent && this.activeEvent[1] === id && this.activeEvent[2] >= index) {
            if (this.activeEvent[2] === index) {
                this.activeEvent = null;
                this.eventInputForm.reset();
            }
            if (this.activeEvent && this.activeEvent[2] !== 0)
                this.activeEvent[2] -= 1;
        }
    }

    public cancelEventInput() {
        this.activeEvent = null;
        this.eventInputForm.reset();
    }

    public submitEventInput() {
        if (!this.activeEvent)
            return;
        if (this.eventInputForm.evaluate() === ValidationResult.Invalid)
            return;
        const event = {
            date: this.eventInputForm.field('date').value,
            title: this.eventInputForm.field('title').value,
            subtitle: this.eventInputForm.field('subtitle').value === '' ? null : this.eventInputForm.field('subtitle').value
        };
        if (this.activeEvent[2] < this.events[this.activeEvent[1]].length)
            this.events[this.activeEvent[1]][this.activeEvent[2]] = event;
        else
            this.events[this.activeEvent[1]].push(event);
        if (this.activeEvent[0] === 'add')
            this.activeEvent[2] += 1;
        else
            this.activeEvent = null;
        this.eventInputForm.reset();
    }

    public get newsletter(): Newsletter {
        const newsletterId = this.previousNewsletter ? this.previousNewsletter.id : `${this.titlePageInputForm.field('year').value}-${Newsletter.Month.title[this.titlePageInputForm.field('month').value]}`.toLowerCase();
        return {
            id: newsletterId,
            alreadyPublished: this.previousNewsletter ? this.previousNewsletter.alreadyPublished : false,
            date: this.previousNewsletter ? this.previousNewsletter.date : UtcDate.now,
            titlePage: {
                title: this.titlePageInputForm.field('title').value,
                description: this.titlePageInputForm.field('description').value,
                year: this.titlePageInputForm.field('year').value,
                month: this.titlePageInputForm.field('month').value
            },
            departments: mapRecord(this.departments, department => department.length === 0 ? null : department),
            events: mapRecord(this.events, eventGroup => eventGroup.length === 0 ? null : eventGroup)
        };
    }

    public async saveNewsletter() {
        if (this.titlePageInputForm.status === 'loading')
            return;
        const hasEmptyDepartmentOrEventStateAlreadyShown = this.titlePageInputForm.status === 'hasEmptyDepartmentOrEvent';
        if (this.titlePageInputForm.evaluate() === ValidationResult.Invalid)
            return;
        if (!hasEmptyDepartmentOrEventStateAlreadyShown && (this.hasEmptyDepartment || this.hasEmptyEventGroup)) {
            this.titlePageInputForm.status = 'hasEmptyDepartmentOrEvent';
            return;
        }
        this.titlePageInputForm.status = 'loading';
        const result = await this.firebaseApiService.function('newsletter-edit').call({
            editType: this.previousNewsletter ? 'change' : 'add',
            newsletter: Newsletter.flatten(this.newsletter),
            newsletterId: this.newsletter.id
        });
        if (result.isFailure())
            this.titlePageInputForm.status = 'failed';
        else {
            await this.router.navigateByUrl(internalLinks['bearbeiten/newsletter'].link);
            this.titlePageInputForm.status = 'valid';
        }
    }
}
