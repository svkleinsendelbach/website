import { Component, OnInit } from '@angular/core';
import { Event, EventGroupId } from 'src/app/types/event';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { ErrorLevel } from 'src/app/modules/input-form/types/error-level';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { GameInfo } from 'src/app/types/game-info';
import { Guid } from 'src/app/types/guid';
import { InputError } from 'src/app/modules/input-form/types/input-error';
import { InputField } from 'src/app/modules/input-form/types/input-field';
import { InputForm } from 'src/app/modules/input-form/types/input-form';
import { internalLinks } from 'src/app/types/internal-link-path';
import { Router } from '@angular/router';
import { SelectOptions } from 'src/app/modules/input-form/components/input-field/select/select.component';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';
import { UtcDate } from 'src/app/types/utc-date';
import { ValidationResult } from 'src/app/modules/input-form/types/validation-result';
import { Validator } from 'src/app/modules/input-form/types/validator';

@Component({
    selector: 'pages-edit-event',
    styleUrls: ['./edit-event.page.sass'],
    templateUrl: './edit-event.page.html'
})
export class EditEventPage implements OnInit {
    public previousEvent: {
        groupId: EventGroupId;
        event: Event.Flatten;
    } | null = null;

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
        loading: new InputError('BFV Daten werden übernommen.', ErrorLevel.Info)
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
        title: new InputField<string>('', [Validator.required('Der Titel is erfordelich.')])
    }, {
        failed: new InputError('Das Event konnte nicht gespeichert werden.'),
        invalidInput: new InputError('Nicht alle Eingaben sind gültig.'),
        loading: new InputError('Das Event wird gespeichert.', ErrorLevel.Info)
    });

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly firebaseApiService: FirebaseApiService,
        private readonly sharedData: SharedDataService<{
            editEvent: {
                groupId: EventGroupId;
                event: Event.Flatten;
            };
        }>,
        private readonly router: Router
    ) {
        this.previousEvent = this.sharedData.getValue('editEvent');
        this.titleService.setTitle(this.previousEvent ? 'Termin bearbeiten' : 'Termin hinzufügen');
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
            this.inputForm.field('title').initialValue = this.previousEvent.event.title;
            this.inputForm.field('subtitle').initialValue = this.previousEvent.event.subtitle ?? '';
            this.inputForm.field('isImportant').initialValue = this.previousEvent.event.isImportant;
            this.inputForm.field('link').initialValue = this.previousEvent.event.link ?? '';
            this.inputForm.field('date').initialValue = UtcDate.decode(this.previousEvent.event.date);
        }
    }

    public async takeBfvGame() {
        if (this.bfvGameInputForm.status === 'loading')
            return;
        this.bfvGameInputForm.status = 'valid';
        const validation = this.bfvGameInputForm.evaluate();
        if (validation === ValidationResult.Invalid)
            return;
        this.bfvGameInputForm.status = 'loading';
        const match = (/^(?:https:\/\/)?(?:www\.)?bfv\.de\/spiele\/(?:\S+?\/)?(?<id>\S+?)$/gu).exec(this.bfvGameInputForm.field('bfvGameLink').value);
        if (!match || !match.groups || !('id' in match.groups)) {
            this.bfvGameInputForm.status = 'gameIdNotFound';
            return;
        }
        const gameInfo = await this.firebaseApiService.function('bfvData-gameInfo').call({
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
        if (this.inputForm.status === 'loading')
            return;
        this.inputForm.status = 'valid';
        const validation = this.inputForm.evaluate();
        if (validation === ValidationResult.Invalid)
            return;
        this.inputForm.status = 'loading';
        const eventId = this.previousEvent ? this.previousEvent.event.id : Guid.newGuid().guidString;
        const result = await this.firebaseApiService.function('event-edit').call({
            editType: this.previousEvent ? 'change' : 'add',
            event: {
                date: this.inputForm.field('date').value.encoded,
                isImportant: this.inputForm.field('isImportant').value,
                link: this.inputForm.field('link').value || null,
                subtitle: this.inputForm.field('subtitle').value || null,
                title: this.inputForm.field('title').value
            },
            eventId: eventId,
            groupId: this.inputForm.field('groupId').value,
            previousGroupId: this.previousEvent ? this.previousEvent.groupId : null
        });
        if (result.isFailure())
            this.inputForm.status = 'failed';
        else {
            await this.router.navigateByUrl(internalLinks['bearbeiten/termine'].link);
            this.inputForm.status = 'valid';
        }
    }
}
