import { AfterViewInit, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { allEventGroupIds, allInternalLinks, eventGroupDescription, EventGroupId, groupedEventGroupIds } from 'src/app/app.component';
import { Event } from 'src/app/template/classes/event';
import { guid } from 'src/app/template/classes/guid';
import { ErrorLevel } from 'src/app/template/modules/input-form/classes/error-level';
import { InputError } from 'src/app/template/modules/input-form/classes/input-error';
import { InputField } from 'src/app/template/modules/input-form/classes/input-field';
import { InputForm } from 'src/app/template/modules/input-form/classes/input-form';
import { ValidationResult } from 'src/app/template/modules/input-form/classes/validation-result';
import { Validator } from 'src/app/template/modules/input-form/classes/validator';
import { SelectOptions } from 'src/app/template/modules/input-form/components/input-field/select/select.component';
import { ApiService } from 'src/app/template/services/api.service';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { SharedDataService } from 'src/app/template/services/shared-data.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.sass']
})
export class EditEventComponent implements AfterViewInit {
  public logInPageLink = allInternalLinks['bearbeiten/anmelden'];
  public editEventsLink = allInternalLinks['bearbeiten/termine'];

  public previousEvent: {
    groupId: EventGroupId,
    event: Event.ReturnType
  } | undefined;

  public inputForm = new InputForm({
    groupId: new InputField<EventGroupId>('general', [
      Validator.required('Ein zugehöiges Thema ist erforderlich.'),
      Validator.isOneOf(allEventGroupIds, 'Das zugehörige Thema ist ungültig.')
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
        event: Event.ReturnType
      }
    }>,
    private router: Router
  ) {
    this.previousEvent = this.sharedData.getValue('editEvent');
    this.titleService.setTitle(this.previousEvent === undefined ? 'Termin hinzufügen' : 'Termin bearbeiten');
  }

  public get groupIdSelectOptions(): SelectOptions<EventGroupId> {
    return SelectOptions.grouped<EventGroupId>(
      groupedEventGroupIds.map(group => {
        return {
          title: group.groupDescription,
          options: group.eventIds.map(groupId => {
            return {
              id: groupId,
              text: eventGroupDescription[groupId]
            };
          })
        };
      })
    );
  }

  public ngAfterViewInit(): void {
    if (this.previousEvent !== undefined) {
      this.inputForm.field('groupId').initialValue = this.previousEvent.groupId;
      this.inputForm.field('title').initialValue = this.previousEvent.event.title;
      this.inputForm.field('subtitle').initialValue = this.previousEvent.event.subtitle ?? '';
      this.inputForm.field('link').initialValue = this.previousEvent.event.link ?? '';
      this.inputForm.field('date').initialValue = new Date(this.previousEvent.event.date);
    }
  }

  public async saveEvent() {
    if (this.inputForm.status !== 'valid')
      return;
    const validation = this.inputForm.evaluate();
    if (validation === ValidationResult.Invalid)
      return;
    this.inputForm.status ='loading';
    const eventId = this.previousEvent?.event.id ?? guid.newGuid().guidString;
    await this.apiService
      .editEvent({
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
      await this.router.navigateByUrl(allInternalLinks['bearbeiten/termine'].link);
      this.inputForm.status = 'valid';
  }
}
