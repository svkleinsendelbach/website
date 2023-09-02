import { OnInit, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { InternalLink } from 'src/app/types/internal-path';
import { ErrorLevel } from 'src/app/modules/input-form/types/error-level';
import { InputError } from 'src/app/modules/input-form/types/input-error';
import { InputField } from 'src/app/modules/input-form/types/input-field';
import { InputForm } from 'src/app/modules/input-form/types/input-form';
import { ValidationResult } from 'src/app/modules/input-form/types/validation-result';
import { Validator } from 'src/app/modules/input-form/types/validator';
import { SelectOptions } from 'src/app/modules/input-form/components/input-field/select/select.component';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Event, EventGroupId } from 'src/app/modules/firebase-api/types/event';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { Guid } from 'src/app/modules/firebase-api/types/guid';
import { UtcDate } from 'src/app/types/utc-date';
import { GameInfo } from 'src/app/modules/firebase-api/types/game-info';

@Component({
    selector: 'pages-edit-event',
    templateUrl: './edit-event.page.html',
    styleUrls: ['./edit-event.page.sass']
})
export class EditEventPage implements OnInit {
    public logInPageLink = InternalLink.all['bearbeiten/anmelden'];

    public editEventsLink = InternalLink.all['bearbeiten/termine'];

    public previousEvent: {
        groupId: EventGroupId;
        event: Event.Flatten;
    } | undefined;

    public bfvGameInputForm = new InputForm({
        bfvGameLink: new InputField<string>('', [
            Validator.required('Der BFV Link ist erforderlich.'),
            Validator.url('Das ist kein gültiger Link.')
        ])
    }, {
        invalidInput: new InputError('Nicht alle Eingaben sind gültig.'),
        gameIdNotFound: new InputError('Die Spiel-Id wurde im Link nicht gefunden.'),
        gameNotFound: new InputError('Das Spiel wurde bei BFV nicht gefunden.'),
        loading: new InputError('BFV Daten werden übernommen.', ErrorLevel.Info),
        failed: new InputError('Das Event konnte nicht gefunden werden.')
    });

    public inputForm = new InputForm({
        groupId: new InputField<EventGroupId>('general', [
            Validator.required('Ein zugehöiges Thema ist erforderlich.'),
            Validator.isOneOf(EventGroupId.all, 'Das zugehörige Thema ist ungültig.')
        ]),
        title: new InputField<string>('', [
            Validator.required('Der Titel is erfordelich.')
        ]),
        subtitle: new InputField<string>(''),
        isImportant: new InputField<boolean>(false),
        link: new InputField('', [
            Validator.eitherOne('Das ist kein gültiger Link.', Validator.empty(''), Validator.url(''))
        ]),
        date: new InputField<UtcDate>(UtcDate.now, [
            Validator.futureDate('Das Datum muss in der Zukunft liegen')
        ])
    }, {
        invalidInput: new InputError('Nicht alle Eingaben sind gültig.'),
        loading: new InputError('Das Event wird gespeichert.', ErrorLevel.Info),
        failed: new InputError('Das Event konnte nicht gespeichert werden.')
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
        this.titleService.setTitle(this.previousEvent === undefined ? 'Termin hinzufügen' : 'Termin bearbeiten');
    }

    public get groupIdSelectOptions(): SelectOptions<EventGroupId> {
        return SelectOptions.grouped<EventGroupId>(
            EventGroupId.grouped.map(group => {
                return {
                    title: group.title,
                    options: group.groupIds.map(groupId => {
                        return {
                            id: groupId,
                            text: EventGroupId.title[groupId]
                        };
                    })
                };
            })
        );
    }

    public ngOnInit() {
        if (this.previousEvent !== undefined) {
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
        const gameId = /^(?:https:\/\/)?(?:www\.)?bfv\.de\/spiele\/(?:\S+?\/)?(?<id>\S+?)$/g.exec(this.bfvGameInputForm.field('bfvGameLink').value)?.groups?.['id'];
        if (gameId === undefined) {
            this.bfvGameInputForm.status = 'gameIdNotFound';
            return;
        }
        try {
            const gameInfo = await this.firebaseApiService.function('bfvData').function('gameInfo').call({
                gameId: gameId
            });
            const { isSg2 } = GameInfo.additionalProperties(gameInfo);
            this.inputForm.field('groupId').inputValue = isSg2 ? 'football-adults/second-team' : 'football-adults/first-team';
            this.inputForm.field('title').inputValue = `${gameInfo.homeTeam.name} gegen ${gameInfo.awayTeam.name}`;
            this.inputForm.field('subtitle').inputValue = gameInfo.adressDescription ?? '';
            this.inputForm.field('link').inputValue = `https://www.bfv.de/spiele/${gameId}`;
            this.inputForm.field('date').inputValue = UtcDate.decode(gameInfo.date);
        } catch (error) {
            if (error === null || typeof error !== 'object' || !('code' in error) || error.code !== 'not-found') {
                this.bfvGameInputForm.status = 'failed';
                throw error;
            }
            this.bfvGameInputForm.status = 'gameNotFound';
            return;
        }
        this.bfvGameInputForm.status = 'valid';
    }

    public async saveEvent() {
        if (this.inputForm.status === 'loading')
            return;
        this.inputForm.status = 'valid';
        const validation = this.inputForm.evaluate();
        if (validation === ValidationResult.Invalid)
            return;
        this.inputForm.status = 'loading';
        const eventId = this.previousEvent?.event.id ?? Guid.newGuid().guidString;
        await this.firebaseApiService.function('event').function('edit').call({
            editType: this.previousEvent !== undefined ? 'change' : 'add',
            groupId: this.inputForm.field('groupId').value,
            previousGroupId: this.previousEvent?.groupId,
            eventId: eventId,
            event: {
                date: this.inputForm.field('date').value.encoded,
                title: this.inputForm.field('title').value,
                subtitle: this.inputForm.field('subtitle').value || undefined,
                isImportant: this.inputForm.field('isImportant').value,
                link: this.inputForm.field('link').value || undefined
            }
        }).catch(reason => {
            this.inputForm.status = 'failed';
            throw reason;
        });
        await this.router.navigateByUrl(InternalLink.all['bearbeiten/termine'].link);
        this.inputForm.status = 'valid';
    }
}
