import { Component, OnInit } from '@angular/core';
import { AuthenticationCheckComponent, AuthenticationService, CheckboxInputComponent, DateTimeInputComponent, Event, FirebaseApiService, Guid, InputError, InputField, InputForm, InputFormComponent, LinkService, NavigationBarComponent, NavigationBarData, SelectInputComponent, SelectOptions, SharedDataService, TextInputComponent, TextSectionComponent, UtcDate, Validator } from 'kleinsendelbach-website-library';
import { InternalPathKey } from '../../../../types/internal-paths';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FirebaseFunctions } from '../../../../types/firebase-functions';
import { UserRole } from '../../../../types/user-role';
import { EventGroupId } from '../../../../types/event-group-id';
import { CommonModule } from '@angular/common';
import { GameInfo } from '../../../../types/game-info';

@Component({
    selector: 'edit-events-page',
    standalone: true,
    imports: [CommonModule, NavigationBarComponent, AuthenticationCheckComponent, TextSectionComponent, InputFormComponent, TextInputComponent, SelectInputComponent, DateTimeInputComponent, CheckboxInputComponent],
    templateUrl: './edit-events.page.html',
    styleUrl: './edit-events.page.sass'
})
export class EditEventsPage implements OnInit {

    public navigationBarData: NavigationBarData<InternalPathKey> = [
        {
            text: 'Zurück',
            alignment: 'left',
            link: 'editing/events',
            action: null
        },
        {
            text: 'Abmelden',
            alignment: 'right',
            link: 'editing/login',
            action: async () => void this.authenticationService.logout()
        }
    ];

    public bfvGameInputForm = new InputForm({
        bfvGameLink: new InputField<string>('', [
            Validator.required('Der BFV Link ist erforderlich.'),
            Validator.url('Das ist kein gültiger Link.')
        ])
    }, {
        failed: new InputError('Das Event konnte nicht gefunden werden.'),
        gameIdNotFound: new InputError('Die Spiel-Id wurde im Link nicht gefunden.'),
        gameNotFound: new InputError('Das Spiel wurde bei BFV nicht gefunden.'),
        invalidInput: new InputError('Nicht alle Eingaben sind gültig.'),
        loading: new InputError('BFV Daten werden übernommen.', 'info')
    });

    public inputForm = new InputForm({
        date: new InputField<UtcDate>(UtcDate.now, [Validator.futureDate('Das Datum muss in der Zukunft liegen')]),
        groupId: new InputField<EventGroupId>('general', [
            Validator.required('Ein zugehöiges Thema ist erforderlich.'),
            Validator.isOneOf(EventGroupId.all, 'Das zugehörige Thema ist ungültig.')
        ]),
        isImportant: new InputField<boolean>(false),
        link: new InputField('', [Validator.eitherOne('Das ist kein gültiger Link.', Validator.empty(''), Validator.url(''))]),
        subtitle: new InputField<string>(''),
        title: new InputField<string>('', [Validator.required('Der Titel ist erfordelich.')])
    }, {
        failed: new InputError('Das Event konnte nicht gespeichert werden.'),
        invalidInput: new InputError('Nicht alle Eingaben sind gültig.'),
        loading: new InputError('Das Event wird gespeichert.', 'info')
    });

    public previousEvent: (Event & { groupId: EventGroupId }) | null = null;

    constructor(
        private readonly titleService: Title,
        private readonly authenticationService: AuthenticationService<UserRole>,
        private readonly firebaseApi: FirebaseApiService<FirebaseFunctions>,
        private readonly router: Router,
        private readonly linkService: LinkService<InternalPathKey>,
        private readonly sharedData: SharedDataService<{
            editEvent: {
                event: Event.Flatten,
                groupId: EventGroupId
            }
        }>
    ) {
        const previousEvent = this.sharedData.getValue('editEvent');
        if (previousEvent) {
            this.previousEvent = {
                ... Event.concrete(previousEvent.event),
                groupId: previousEvent.groupId
            }
        }
        this.titleService.setTitle('Kommender Termin');
    }

    public get groupIdSelectOptions(): SelectOptions<EventGroupId> {
        return SelectOptions.grouped<EventGroupId>(
            EventGroupId.grouped.map(group => ({
                options: group.groupIds.map(groupId => ({
                    id: groupId,
                    text: EventGroupId.title[groupId]
                })),
                title: group.title
            }))
        );
    }

    public ngOnInit() {
        if (this.previousEvent) {
            this.inputForm.field('groupId').initialValue = this.previousEvent.groupId;
            this.inputForm.field('title').initialValue = this.previousEvent.title;
            this.inputForm.field('subtitle').initialValue = this.previousEvent.subtitle ?? '';
            this.inputForm.field('isImportant').initialValue = this.previousEvent.isImportant;
            this.inputForm.field('link').initialValue = this.previousEvent.link ?? '';
            this.inputForm.field('date').initialValue = this.previousEvent.date;
        }
    }

    public async takeBfvGame() {
        if (this.bfvGameInputForm.evaluate() === 'invalid')
            return;
        this.bfvGameInputForm.status = 'loading';
        const match = (/^(?:https:\/\/)?(?:www\.)?bfv\.de\/spiele\/(?:\S+?\/)?(?<id>\S+?)$/gu).exec(this.bfvGameInputForm.field('bfvGameLink').value);
        if (!match || !match.groups || !('id' in match.groups)) {
            this.bfvGameInputForm.status = 'gameIdNotFound';
            return;
        }
        const gameInfo = await this.firebaseApi.function('bfvData-gameInfo').call({
            gameId: match.groups['id']
        });
        if (gameInfo.isFailure()) {
            if (gameInfo.error.code === 'not-found')
                this.bfvGameInputForm.status = 'gameNotFound';
            else
                this.bfvGameInputForm.status = 'failed';
        } else {
            const { isSg2 } = GameInfo.additionalProperties(gameInfo.value);
            this.inputForm.field('groupId').inputValue = isSg2 ? 'football-adults/second-team' : 'football-adults/first-team';
            this.inputForm.field('title').inputValue = `${gameInfo.value.homeTeam.name} gegen ${gameInfo.value.awayTeam.name}`;
            this.inputForm.field('subtitle').inputValue = gameInfo.value.adressDescription ?? '';
            this.inputForm.field('link').inputValue = `https://www.bfv.de/spiele/${match.groups['id']}`;
            this.inputForm.field('date').inputValue = UtcDate.decode(gameInfo.value.date);
            this.bfvGameInputForm.status = 'valid';
        }
    }

    public async saveEvent() {
        if (this.inputForm.evaluate() === 'invalid')
            return;
        this.inputForm.status = 'loading';
        const eventId = this.previousEvent ? this.previousEvent.id : Guid.newGuid();
        const result = await this.firebaseApi.function('event-edit').call({
            editType: this.previousEvent ? 'change' : 'add',
            event: {
                date: this.inputForm.field('date').value.encoded,
                isImportant: this.inputForm.field('isImportant').value,
                link: this.inputForm.field('link').value || null,
                subtitle: this.inputForm.field('subtitle').value || null,
                title: this.inputForm.field('title').value
            },
            eventId: eventId.guidString,
            groupId: this.inputForm.field('groupId').value,
            previousGroupId: this.previousEvent ? this.previousEvent.groupId : null
        });
        if (result.isFailure())
            this.inputForm.status = 'failed';
        else {
            await this.router.navigateByUrl(this.linkService.link('editing/events').link);
            this.inputForm.status = 'valid';
        }
    }
}
