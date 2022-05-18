import { Component, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { InputFields, InputField, Validator } from 'src/app/components/input-form/input-form.component';
import { EventGroupId, GroupedEventGroupId, Event } from 'src/app/services/api/events-fetcher.service';
import { WebsiteEditingErrorCode, WebsiteEditingService } from 'src/app/services/api/website-editing.service';
import { WebsiteEditorAuthService } from 'src/app/services/api/website-editor-auth.service';
import { HeaderIntransparentService } from 'src/app/services/header-intransparent.service';
import { ShareEventEditService } from 'src/app/services/shared-data/share-event-edit.service';
import { DeviceTypeService } from '../../../../services/device-type.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.sass'],
})
export class EditEventComponent implements AfterViewInit {
  public isStartupLoading: boolean = true;

  public editType: 'add' | 'update' = 'add';

  private event: { groupId: EventGroupId; event: Event } | undefined;

  public inputFields = new InputFields(
    {
      groupId: new InputField({
        required: Validator.required,
        isOneOf: Validator.isOneOf(EventGroupId.all),
      }),
      title: new InputField({
        required: Validator.required,
      }),
      subtitle: new InputField(),
      link: new InputField({
        url: Validator.eitherOne(Validator.empty, Validator.url),
      }),
      date: new InputField({
        required: Validator.required,
        date: Validator.date,
        futureDate: Validator.custom(_ => {
          const inputDate: Date = new Date(
            `${this.inputFields.field('date').textValue}T${this.inputFields.field('time').textValue}:59.999Z`,
          );
          inputDate.setMinutes(inputDate.getMinutes() + inputDate.getTimezoneOffset());
          return inputDate >= new Date() ? 'valid' : 'invalid';
        }),
      }),
      time: new InputField({
        required: Validator.required,
        time: Validator.time,
        futureDate: Validator.custom(_ => {
          const inputDate: Date = new Date(
            `${this.inputFields.field('date').textValue}T${this.inputFields.field('time').textValue}:59.999Z`,
          );
          inputDate.setMinutes(inputDate.getMinutes() + inputDate.getTimezoneOffset());
          return inputDate >= new Date() ? 'valid' : 'invalid';
        }),
      }),
    },
    undefined as WebsiteEditingErrorCode | 'loading' | undefined,
  );

  public EventGroupId = EventGroupId;

  public GroupedEventGroupId = GroupedEventGroupId;

  public WebsiteEditingErrorCode = WebsiteEditingErrorCode;

  constructor(
    private titleService: Title,
    private headerIntransparentService: HeaderIntransparentService,
    private authService: WebsiteEditorAuthService,
    private router: Router,
    private shareEventEdit: ShareEventEditService,
    public deviceType: DeviceTypeService,
    private websiteEditing: WebsiteEditingService,
  ) {
    this.headerIntransparentService.makeIntransparent();
    this.event = this.shareEventEdit.event;
    this.editType = this.event === undefined ? 'add' : 'update';
    if (this.editType === 'update') {
      this.titleService.setTitle('Termin Bearbeiten');
    } else {
      this.titleService.setTitle('Termin Hinzufügen');
    }
    this.authService.isLoggedIn.then(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigateByUrl('/bearbeiten/anmelden').then(success => {
          if (!success) throw new Error("Couldn't navigate to url.");
        });
      } else {
        this.isStartupLoading = false;
      }
    });
  }

  ngAfterViewInit() {
    if (this.editType === 'update' && this.event !== undefined) {
      this.inputFields.field('groupId').textValue = this.event.groupId;
      this.inputFields.field('title').textValue = this.event.event.title;
      this.inputFields.field('subtitle').textValue = this.event.event.subtitle ?? '';
      this.inputFields.field('link').textValue = this.event.event.link ?? '';
      const dateTime = this.dateTime(new Date(this.event.event.date));
      this.inputFields.field('date').textValue = dateTime.date;
      this.inputFields.field('time').textValue = dateTime.time;
    } else {
      const dateTime = this.dateTime(new Date());
      this.inputFields.field('date').textValue = dateTime.date;
      this.inputFields.field('time').textValue = dateTime.time;
    }
  }

  private dateTime(date: Date): { date: string; time: string } {
    const day = date.getDate() <= 9 ? `0${date.getDate()}` : `${date.getDate()}`;
    const month = date.getMonth() + 1 <= 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const hour = date.getHours() <= 9 ? `0${date.getHours()}` : `${date.getHours()}`;
    const minute = date.getMinutes() <= 9 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
    return {
      date: `${date.getFullYear()}-${month}-${day}`,
      time: `${hour}:${minute}`,
    };
  }

  public get now(): { date: string; time: string } {
    return this.dateTime(new Date());
  }

  public handleAddEditEvent() {
    const validation = this.inputFields.validationOfAllFields;
    if (validation !== 'valid') return;
    this.inputFields.setStatus('loading');
    this.websiteEditing
      .editEvent({
        editType: this.editType,
        groupId: this.inputFields.field('groupId').textValue as EventGroupId,
        eventId: uuid.v4(),
        eventDate: `${this.inputFields.field('date').textValue}T${this.inputFields.field('time').textValue}:00.000Z`,
        eventTitle: this.inputFields.field('title').textValue,
        eventSubtitle: this.inputFields.field('subtitle').textValue || undefined,
        eventLink: this.inputFields.field('link').textValue || undefined,
      })
      .then(() => {
        this.router.navigateByUrl('bearbeiten/termine');
      })
      .catch(error => {
        if ('name' in error && error.name === 'WebsiteEditingServiceError' && 'code' in error)
          this.inputFields.setStatus(error.code);
        else this.inputFields.setStatus('unknown');
      });
  }
}
