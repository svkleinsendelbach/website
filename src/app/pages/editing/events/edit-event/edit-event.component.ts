import { OnInit, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EventGroupId } from 'src/app/classes/EventGroupId';
import { InternalLink } from 'src/app/classes/InternalPath';
import { Event } from 'src/app/template/classes/event';
import { guid } from 'src/app/template/classes/guid';
import { ErrorLevel } from 'src/app/modules/input-form/types/error-level';
import { InputError } from 'src/app/modules/input-form/types/input-error';
import { InputField } from 'src/app/modules/input-form/types/input-field';
import { InputForm } from 'src/app/modules/input-form/types/input-form';
import { ValidationResult } from 'src/app/modules/input-form/types/validation-result';
import { Validator } from 'src/app/modules/input-form/types/validator';
import { SelectOptions } from 'src/app/modules/input-form/components/input-field/select/select.component';
import { ApiService } from 'src/app/template/services/api.service';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { SharedDataService } from 'src/app/template/services/shared-data.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.sass']
})
export class EditEventComponent implements OnInit {
  public logInPageLink = InternalLink.all['bearbeiten/anmelden'];
  public editEventsLink = InternalLink.all['bearbeiten/termine'];

  public previousEvent: {
    groupId: EventGroupId,
    event: Event.Flatten
  } | undefined;

  public bfvGameInputForm = new InputForm({
    bfvGameLink: new InputField<string>('', [
      Validator.required('Der BFV Link ist erforderlich.'),
      Validator.url('Das ist kein gültiger Link.'),
      Validator.pattern(/^https:\/\/www\.bfv\.de\/spiele\/\S+$/g, 'Der Link führt nicht zur BFV Spiele Seite, bsp: \'https://www.bfv.de/spiele/...\'.')
    ])
  }, {
    invalidInput: new InputError('Nicht alle Eingaben sind gültig.'),
    gameIdNotFound: new InputError('Im BFV Link konnte die Spiel-Id nicht gefunden werden.'),
    gameNotFound: new InputError('Das Spiel konnte nicht beim BFV gefunden werden.'),
    loading: new InputError('Daten werden vom BFV übernommen.', ErrorLevel.Info)
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
    link: new InputField('', [
      Validator.eitherOne('Das ist kein gültiger Link.', Validator.empty(''), Validator.url(''))
    ]),
    date: new InputField<Date>(new Date, [
      Validator.futureDate('Das Datum muss in der Zukunft liegen')
    ])
  }, {
    invalidInput: new InputError('Nicht alle Eingaben sind gültig.'),
    loading: new InputError('Event wird gespeichert.', ErrorLevel.Info)
  });

  public constructor(
    public readonly titleService: Title,
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService,
    private readonly apiService: ApiService,
    private readonly sharedData: SharedDataService<{
      editEvent: {
        groupId: EventGroupId,
        event: Event.Flatten
      }
    }>,
    private router: Router
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
      this.inputForm.field('link').initialValue = this.previousEvent.event.link ?? '';
      this.inputForm.field('date').initialValue = new Date(this.previousEvent.event.date);
    }
  }

  public async takeBfvGame() {
    if (this.bfvGameInputForm.status === 'loading')
      return;
    this.bfvGameInputForm.status = 'valid';
    const validation = this.bfvGameInputForm.evaluate();
    if (validation === ValidationResult.Invalid)
      return;
    this.bfvGameInputForm.status ='loading';
    const gameId = /^https:\/\/www\.bfv\.de\/spiele\/(?:\S+?\/)?(?<id>\S+?)$/.exec(this.bfvGameInputForm.field('bfvGameLink').value)?.groups?.['id'];
    if (gameId === undefined) {
      this.bfvGameInputForm.status = 'gameIdNotFound';
      return;
    }
    try {
      const gameInfo = await this.apiService.gameInfoGet({
        gameId: gameId
      });
      const isKleinsendelbachHetzlesRegex = /Kleinsendelbach.*Hetzles|Hetzles.*Kleinsendelbach/g;
      const isKleinsendelbachHetzles2Regex = /Kleinsendelbach.*Hetzles.*2|Kleinsendelbach.*2.*Hetzles|Hetzles.*Kleinsendelbach.*2|Hetzles.*2.*Kleinsendelbach/g;
      let isSg2 = false;
      if (isKleinsendelbachHetzlesRegex.test(gameInfo.homeTeam.name))
        isSg2 = isKleinsendelbachHetzles2Regex.test(gameInfo.homeTeam.name);
      else if (isKleinsendelbachHetzlesRegex.test(gameInfo.awayTeam.name))
        isSg2 = isKleinsendelbachHetzles2Regex.test(gameInfo.awayTeam.name);
      this.inputForm.field('groupId').inputValue = isSg2 ? 'football-adults/second-team' : 'football-adults/first-team';
      this.inputForm.field('title').inputValue = `${gameInfo.homeTeam.name} gegen ${gameInfo.awayTeam.name}`;
      this.inputForm.field('link').inputValue = InternalLink.all.spiel(gameId).link;
      this.inputForm.field('date').inputValue = new Date(gameInfo.date);
    } catch (error) {
      if (error === null || typeof error !== 'object' || !('code' in error) || error.code !== 'not-found')
        throw error;
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
    this.inputForm.status ='loading';
    const eventId = this.previousEvent?.event.id ?? guid.newGuid().guidString;
    await this.apiService
      .eventEdit({
        editType: this.previousEvent !== undefined ? 'change' : 'add',
        groupId: this.inputForm.field('groupId').value,
        eventId: eventId,
        event: {
          date: this.inputForm.field('date').value.toISOString(),
          title: this.inputForm.field('title').value,
          subtitle: this.inputForm.field('subtitle').value || undefined,
          link: this.inputForm.field('link').value || undefined
        }
      });
    await this.router.navigateByUrl(InternalLink.all['bearbeiten/termine'].link);
    this.inputForm.status = 'valid';
  }
}
