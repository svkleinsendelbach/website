import { AfterViewInit, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { allEventGroupIds, allInternalLinks, eventGroupDescription, EventGroupId, groupedEventGroupIds } from 'src/app/app.component';
import { Event } from 'src/app/template/classes/event';
import { guid } from 'src/app/template/classes/guid';
import { InputField } from 'src/app/template/classes/input-field';
import { InputForm } from 'src/app/template/classes/input-form';
import { Validator } from 'src/app/template/classes/validators';
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

  public previousEvent: {
    groupId: EventGroupId,
    event: Event.ReturnType
  } | undefined;

  public inputForm = new InputForm({
    groupId: new InputField(
      'Zugehöriges Thema:',
      InputField.Type.selectGrouped(groupedEventGroupIds.map(group => {
        return {
          groupText: group.groupDescription,
          options: group.eventIds.map(eventId => {
            return {
              id: eventId,
              text: eventGroupDescription[eventId]
            };
          })
        }
      })),
      {
        required: {
          validator: Validator.required,
          errorMessage: 'Ein zugehöiges Thema ist erforderlich.'
        },
        isOneOf: {
          validator: Validator.isOneOf(allEventGroupIds),
          errorMessage: 'Das zugehörige Thema ist ungültig.'
        }
      }
    ),
    title: new InputField(
      'Titel:',
      InputField.Type.inputText('Titel'),
      {
        required: {
          validator: Validator.required,
          errorMessage: 'Der Titel is erfordelich.'
        }
      }
    ),
    subtitle: new InputField(
      'Untertitel:',
      InputField.Type.inputText('Untertitel (Optional)')
    ),
    link: new InputField(
      'Link:',
      InputField.Type.inputText('Link (Optional)'),
      {
        url: {
          validator: Validator.eitherOne(Validator.empty, Validator.url),
          errorMessage: 'Das ist kein gültiger Link.'
        }
      }
    ),
    date: new InputField(
      'Datum:',
      InputField.Type.date('Datum', EditEventComponent.getDateAndTime(new Date()).date),
      {
        required: {
          validator: Validator.required,
          errorMessage: 'Das Datum ist erforderlich.'
        },
        date: {
          validator: Validator.date,
          errorMessage: 'Das ist kein gültiges Datum.'
        },
        futureDate: {
          validator: Validator.custom(() => {
            const inputDate: Date = new Date(`${this.inputForm.field('date').textValue}T${this.inputForm.field('time').textValue}:59.999Z`);
            inputDate.setMinutes(inputDate.getMinutes() + inputDate.getTimezoneOffset());
            return inputDate >= new Date() ? 'valid' : 'invalid';
          }),
          errorMessage: 'Das Datum muss in der Zukunft liegen'
        }
      }
    ),
    time: new InputField(
      'Uhrzeit:',
      InputField.Type.time('Uhrzeit'),
      {
        required: {
          validator: Validator.required,
          errorMessage: 'Die Uhrzeit ist erforderlich.'
        },
        time: {
          validator: Validator.time,
          errorMessage: 'Das ist keine gültige Uhrzeit.'
        },
        futureDate: {
          validator: Validator.custom(() => {
            const inputDate: Date = new Date(`${this.inputForm.field('date').textValue}T${this.inputForm.field('time').textValue}:59.999Z`);
            inputDate.setMinutes(inputDate.getMinutes() + inputDate.getTimezoneOffset());
            return inputDate >= new Date() ? 'valid' : 'invalid';
          }),
          errorMessage: 'Das Datum muss in der Zukunft liegen.'
        }
      }
    )
  }, {
    invalidInput: {
      message: 'Nicht alle Eingaben sind gültig.',
      level: InputForm.StatusLevel.Error
    },
    loading: {
      message: 'Event wird gespeichert.',
      level: InputForm.StatusLevel.Info
    }
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

  public ngAfterViewInit(): void {
    if (this.previousEvent !== undefined) {
      this.inputForm.field('groupId').textValue = this.previousEvent.groupId;
      this.inputForm.field('title').textValue = this.previousEvent.event.title;
      this.inputForm.field('subtitle').textValue = this.previousEvent.event.subtitle ?? '';
      this.inputForm.field('link').textValue = this.previousEvent.event.link ?? '';
      const dateTime = EditEventComponent.getDateAndTime(new Date(this.previousEvent.event.date));
      this.inputForm.field('date').textValue = dateTime.date;
      this.inputForm.field('time').textValue = dateTime.time;
    } else {
      const now = EditEventComponent.getDateAndTime(new Date());
      this.inputForm.field('date').textValue = now.date;
      this.inputForm.field('time').textValue = now.time;
    }
  }

  private static getDateAndTime(date: Date): { date: string, time: string } {
    const day = date.getDate() <= 9 ? `0${date.getDate()}` : `${date.getDate()}`;
    const month = date.getMonth() + 1 <= 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const hour = date.getHours() <= 9 ? `0${date.getHours()}` : `${date.getHours()}`;
    const minute = date.getMinutes() <= 9 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
    return {
      date: `${date.getFullYear()}-${month}-${day}`,
      time: `${hour}:${minute}`,
    };
  }

  public async saveEvent() {
    if (this.inputForm.status !== 'valid') return;
    const validation = this.inputForm.validationOfAllFields
    if (validation !== 'valid') return;
    this.inputForm.setStatus('loading')
    const eventId = this.previousEvent?.event.id ?? guid.newGuid().guidString;
    await this.apiService
      .editEvent({
        editType: this.previousEvent !== undefined ? 'change' : 'add',
        groupId: this.inputForm.field('groupId').textValue as EventGroupId,
        eventId: eventId,
        event: {
          date: `${this.inputForm.field('date').textValue}T${this.inputForm.field('time').textValue}:00.000Z`,
          title: this.inputForm.field('title').textValue,
          subtitle: this.inputForm.field('subtitle').textValue || undefined,
          link: this.inputForm.field('link').textValue || undefined
        }
      })
      await this.router.navigateByUrl(allInternalLinks['bearbeiten/termine'].link);
      this.inputForm.setStatus('valid');
  }
}
