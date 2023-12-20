import { Component, OnInit } from '@angular/core';
import { AuthenticationCheckComponent, AuthenticationService, FirebaseApiService, NewsletterComponent, InputField, InputForm, InputFormComponent, LinkService, NavigationBarComponent, NavigationBarData, SelectInputComponent, SelectOptions, SharedDataService, StepperInputComponent, TextAreaInputComponent, TextInputComponent, TextSectionComponent, UtcDate, Validator, entries, keys, mapRecord, NewsletterData, values, TrackBy, DateTimeInputComponent, ButtonComponent } from 'kleinsendelbach-website-library';
import { InternalPathKey } from '../../../../types/internal-paths';
import { Newsletter } from '../../../../types/newsletter';
import { Title } from '@angular/platform-browser';
import { FirebaseFunctions } from '../../../../types/firebase-functions';
import { UserRole } from '../../../../types/user-role';
import { EventGroupId } from '../../../../types/event-group-id';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'edit-newsletter-page',
    standalone: true,
    imports: [CommonModule, NavigationBarComponent, AuthenticationCheckComponent, TextSectionComponent, InputFormComponent, StepperInputComponent, TextInputComponent, TextAreaInputComponent, SelectInputComponent, NewsletterComponent, DateTimeInputComponent, ButtonComponent],
    templateUrl: './edit-newsletter.page.html',
    styleUrl: './edit-newsletter.page.sass'
})
export class EditNewsletterPage implements OnInit {

    public TrackBy = TrackBy;

    public Department = Newsletter.Department;

    public EventGroup = EventGroupId;

    public navigationBarData: NavigationBarData<InternalPathKey> = [
        {
            text: 'Zurück',
            alignment: 'left',
            link: 'editing/newsletter',
            action: null
        },
        {
            text: 'Abmelden',
            alignment: 'right',
            link: 'editing/login',
            action: async () => void this.authenticationService.logout()
        }
    ];

    public inputForm = new InputForm({
        title: new InputField<string>('', [Validator.required('Der Titel ist erforderlich.')]),
        description: new InputField<string>('', [Validator.required('Die Nachricht ist erforderlich.')]),
        month: new InputField<Newsletter.Month>(Newsletter.Month.fromNumber(UtcDate.now.month) ?? 'january', [
            Validator.required('Der Monat ist erforderlich.'),
            Validator.isOneOf(keys(Newsletter.Month.title), 'Der Monat ist ungültig.')
        ]),
        year: new InputField<number>(UtcDate.now.year)
    }, {
        hasEmptyDepartmentOrEvent: 'Es gibt Abteilungen ohne Berichte oder fehlende Termine. Bitte füge sie unten hinzu.'
    });

    public departmentInputForm = new InputForm({
        title: new InputField<string>('', [Validator.required('Der Titel ist erforderlich.')]),
        description: new InputField<string>('', [Validator.required('Die Nachricht ist erforderlich.')])
    }, {});

    public eventInputForm = new InputForm({
        date: new InputField<UtcDate>(UtcDate.now, [Validator.futureDate('Das Datum muss in der Zukunft liegen')]),
        title: new InputField<string>('', [Validator.required('Der Titel ist erforderlich.')]),
        subtitle: new InputField<string>('')
    }, {});

    public previousNewsletter: Newsletter | null = null;

    public isPreviewShown = false;

    public departments: Record<Newsletter.Department, {
        title: string;
        description: string;
    }[]>;

    public events: Record<EventGroupId, {
        date: UtcDate;
        title: string;
        subtitle: string | null;
    }[]>;

    public activeDepartment: ['add' | 'edit', Newsletter.Department, number] | null = null;

    public activeEvent: ['add' | 'edit', EventGroupId, number] | null = null;

    constructor(
        private readonly titleService: Title,
        private readonly authenticationService: AuthenticationService<UserRole>,
        private readonly firebaseApi: FirebaseApiService<FirebaseFunctions>,
        private readonly linkService: LinkService<InternalPathKey>,
        private readonly sharedData: SharedDataService<{
            editNewsletter: Newsletter.Flatten;
        }>
    ) {
        const previousNewsletter = this.sharedData.getValue('editNewsletter');
        if (previousNewsletter) {
            this.previousNewsletter = Newsletter.concrete(previousNewsletter)
        }
        this.titleService.setTitle('Newsletter');
        this.departments = mapRecord(Newsletter.Department.title, () => []);
        this.events = mapRecord(EventGroupId.title, () => []);
    }

    public get monthSelectOptions(): SelectOptions<Newsletter.Month> {
        return SelectOptions.ungrouped<Newsletter.Month>(entries(Newsletter.Month.title).map(({ key, value }) => ({ id: key, text: value })));
    }

    public ngOnInit() {
        if (this.previousNewsletter) {
            this.inputForm.field('title').initialValue = this.previousNewsletter.titlePage.title;
            this.inputForm.field('description').initialValue = this.previousNewsletter.titlePage.description;
            this.inputForm.field('month').initialValue = this.previousNewsletter.titlePage.month;
            this.inputForm.field('year').initialValue = this.previousNewsletter.titlePage.year;
            this.departments = mapRecord(this.previousNewsletter.departments, department => department ?? []);
            this.events = mapRecord(this.previousNewsletter.events, event => event ?? []);
        }
    }

    public togglePreview(active: boolean) {
        this.isPreviewShown = active;
    }

    public get hasEmptyDepartment(): boolean {
        return values(this.departments).some(department => department.length === 0);
    }

    public get hasEmptyEvent(): boolean {
        return values(this.events).some(event => event.length === 0);
    }

    public get departmentList(): {
        id: Newsletter.Department;
        content: {
            index: number;
            title: string;
            description: string;
        }[];
    }[] {
        return entries(this.departments).map(({ key, value }) => ({
            id: key,
            content: value.map((department, index) => ({
                index: index,
                ...department
            }))
        }));
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
        return entries(this.events).map(({ key, value }) => ({
            id: key,
            events: value.map((event, index) => ({
                index: index,
                ...event
            }))
        }));
    }

    public get newsletter(): Newsletter {
        const newsletterId = this.previousNewsletter ? this.previousNewsletter.id : `${this.inputForm.field('year').value}-${Newsletter.Month.title[this.inputForm.field('month').value]}`.toLowerCase();
        return {
            id: newsletterId,
            alreadyPublished: this.previousNewsletter ? this.previousNewsletter.alreadyPublished : false,
            date: this.previousNewsletter ? this.previousNewsletter.date : UtcDate.now,
            titlePage: {
                title: this.inputForm.field('title').value,
                description: this.inputForm.field('description').value,
                year: this.inputForm.field('year').value,
                month: this.inputForm.field('month').value
            },
            departments: mapRecord(this.departments, department => department.length === 0 ? null : department),
            events: mapRecord(this.events, eventGroup => eventGroup.length === 0 ? null : eventGroup)
        };
    }

    public get newsletterData(): NewsletterData {
        return Newsletter.newsletterData(this.newsletter, false, this.linkService);
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
        if (this.departmentInputForm.evaluate() === 'invalid')
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
        if (this.eventInputForm.evaluate() === 'invalid')
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

    public async saveNewsletter() {
        const hasEmptyDepartmentOrEventStateAlreadyShown = this.inputForm.state === 'hasEmptyDepartmentOrEvent';
        if (this.inputForm.evaluateAndSetLoading() === 'invalid')
            return;
        if (!hasEmptyDepartmentOrEventStateAlreadyShown && (this.hasEmptyDepartment || this.hasEmptyEvent))
            return this.inputForm.setState('hasEmptyDepartmentOrEvent');
        const result = await this.firebaseApi.function('newsletter-edit').call({
            editType: this.previousNewsletter ? 'change' : 'add',
            newsletter: Newsletter.flatten(this.newsletter),
            newsletterId: this.newsletter.id
        });
        this.inputForm.finish(result);
        if (result.isSuccess())
            await this.linkService.navigate('editing/newsletter');
    }
}
