import { AfterViewInit, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { lastValueFrom } from 'rxjs';
import { SendContactMailService } from 'src/app/services/send-contact-mail.service';
import { VerifyRecaptchaService } from 'src/app/services/verify-recaptcha.service';
import { InputField, InputFields } from 'src/app/template/classes/input-fields';
import { Validator } from 'src/app/template/classes/validator';
import { InputFieldComponent } from 'src/app/template/components/input-form/input-field/input-field.component';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements AfterViewInit {
  public FieldType = InputFieldComponent.FieldType

  public receivers = [
    {
      name: 'Vorstandschaft',
      address: 'vorstand@sv-kleinsendelbach.de'
    },
    {
      name: 'Herrenfußball',
      address: 'herrenfußball@sv-kleinsendelbach.de'
    },
    {
      name: 'Jugendfußball',
      address: 'jugenfußball@sv-kleinsendelbach.de'
    },
    {
      name: 'Gymnastik',
      address: 'gymnastik@sv-kleinsendelbach.de'
    },
    {
      name: 'Tanzen',
      address: 'tanzen@sv-kleinsendelbach.de'
    },
  ]

  public inputFields = new InputFields(
    {
      name: new InputField({
        required: {
          validator: Validator.required,
          errorMessage: 'Ihr Name ist erforderlich.'
        }
      }),
      email: new InputField({
        required: {
          validator: Validator.required,
          errorMessage: 'Ihre E-Mail Adresse ist erforderlich.'
        },
        email: {
          validator: Validator.email,
          errorMessage: 'Das ist keine gültige E-Mail Addresse.'
        }
      }),
      receiver: new InputField({
        required: {
          validator: Validator.required,
          errorMessage: 'Ein Empfänger ist erforderlich.'
        },
        isOneOf: {
          validator: Validator.isOneOf(this.reveiverNames),
          errorMessage: 'Der Empfänger ist ungültig'
        }
      }),
      message: new InputField({
        required: {
          validator: Validator.required,
          errorMessage: 'Eine Nachricht ist erforderlich.'
        }
      })
    },
    {
      invalidInput: {
        message: 'Nicht alle Eingaben sind gültig.',
        level: InputFields.StatusLevel.Error
      },
      loading: {
        message: 'Email wird versandt.',
        level: InputFields.StatusLevel.Info
      },
      recaptchaFailed: {
        message: 'reCAPTCHA ungültig.',
        level: InputFields.StatusLevel.Error
      },
      sendFailed: {
        message: 'Es gab einen Fehler beim Senden.',
        level: InputFields.StatusLevel.Error
      },
      sendSucceded: {
        message: 'Email wurde versendet.',
        level: InputFields.StatusLevel.Success
      }
    }
  )

  public constructor(
    public readonly titleService: Title,
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService,
    private readonly sendContactMailService: SendContactMailService,
    private readonly verifyRecaptchaService: VerifyRecaptchaService,
    private recaptchaService: ReCaptchaV3Service
  ) {
    this.titleService.setTitle('Kontakt')
  }

  public ngAfterViewInit() {
    this.inputFields.field('receiver').textValue = this.receivers[0].name
  }

  public get reveiverNames(): string[] {
    return this.receivers.map(receiver => receiver.name)
  }

  public onSubmit() {
    if (this.inputFields.status !== 'valid') { return }
    const validation = this.inputFields.validationOfAllFields
    if (validation !== 'valid') { return }
    this.sendContactMail();
  }

  private async sendContactMail() {
    const address = this.receivers.find(receiver => receiver.name === this.inputFields.field('receiver').textValue )?.address;
    if (address === undefined) {
      this.inputFields.setStatus('invalidInput')
      return
    }
    this.inputFields.setStatus('loading')
    const token = await lastValueFrom(this.recaptchaService.execute('contactFormAction'));
    const verifyResponse = await this.verifyRecaptchaService.fetch('contactForm', token);
    if (!verifyResponse.success) {
      this.inputFields.setStatus('recaptchaFailed')
      return
    }
    const request: SendContactMailService.MailRequest = {
      sender: {
        name: this.inputFields.field('name').textValue,
        address: this.inputFields.field('email').textValue,
      },
      receiver: {
        name: this.inputFields.field('receiver').textValue,
        address: address,
      },
      message: this.inputFields.field('message').textValue,
    };
    const response = await this.sendContactMailService.sendMail(request);
    const status: 'sendSucceded' | 'sendFailed' = response === 'success' ? 'sendSucceded' : 'sendFailed'
    this.inputFields.setStatus(status);
    if (response === 'success') {
      this.resetForm();
    }
  }

  private resetForm() {
    this.inputFields.resetAll()
    this.inputFields.field('receiver').textValue = this.receivers[0].name
  }
}
