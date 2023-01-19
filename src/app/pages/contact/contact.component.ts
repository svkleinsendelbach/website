import { AfterViewInit, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { lastValueFrom } from 'rxjs';
import { InputField } from 'src/app/template/classes/input-field';
import { InputForm } from 'src/app/template/classes/input-form';
import { Validator } from 'src/app/template/classes/validators';
import { SendContactMailFunction } from 'src/app/template/services/api-functions-types';
import { ApiService } from 'src/app/template/services/api.service';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements AfterViewInit {
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

  public inputForm = new InputForm(
    {
      name: new InputField(
        'Ihr Name:',
        InputField.Type.inputText('Ihr Name'),
        {
          required: {
            validator: Validator.required,
            errorMessage: 'Ihr Name ist erforderlich.'
          }
        }
      ),
      email: new InputField(
        'Ihre E-Mail Adresse:',
        InputField.Type.inputText('Ihre E-Mail Adresse'),
        {
          required: {
            validator: Validator.required,
            errorMessage: 'Ihre E-Mail Addresse ist erforderlich.'
          },
          email: {
            validator: Validator.email,
            errorMessage: 'Das ist keine gültige E-Mail Addresse.'
          }
        }
      ),
      receiver: new InputField(
        'Anfrage an:',
        InputField.Type.select(this.receivers.map(receiver => {
          return {
            id: receiver.name,
            text: receiver.name
          }
        })),
        {
          required: {
            validator: Validator.required,
            errorMessage: 'Ein Empfänger ist erforderlich.'
          },
          isOneOf: {
            validator: Validator.isOneOf(this.reveiverNames),
            errorMessage: 'Der Empfänger ist ungültig'
          }
        }
      ),
        message: new InputField(
          'Ihre Nachricht:',
          InputField.Type.textarea('Ihre Nachricht'),
          {
          required: {
            validator: Validator.required,
            errorMessage: 'Eine Nachricht ist erforderlich.'
          }
        }
      )
    },
    {
      invalidInput: {
        message: 'Nicht alle Eingaben sind gültig.',
        level: InputForm.StatusLevel.Error
      },
      loading: {
        message: 'Email wird versandt.',
        level: InputForm.StatusLevel.Info
      },
      recaptchaFailed: {
        message: 'reCAPTCHA ungültig.',
        level: InputForm.StatusLevel.Error
      },
      sendFailed: {
        message: 'Es gab einen Fehler beim Senden.',
        level: InputForm.StatusLevel.Error
      },
      sendSucceded: {
        message: 'Email wurde versendet.',
        level: InputForm.StatusLevel.Success
      }
    }
  )

  public constructor(
    public readonly titleService: Title,
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService,
    private readonly apiService: ApiService,
    private recaptchaService: ReCaptchaV3Service
  ) {
    this.titleService.setTitle('Kontakt')
  }

  public ngAfterViewInit() {
    this.inputForm.field('receiver').textValue = this.receivers[0].name
  }

  public get reveiverNames(): string[] {
    return this.receivers.map(receiver => receiver.name)
  }

  public onSubmit() {
    if (this.inputForm.status !== 'valid') { return }
    const validation = this.inputForm.validationOfAllFields
    if (validation !== 'valid') { return }
    this.sendContactMail();
  }

  private async sendContactMail() {
    const address = this.receivers.find(receiver => receiver.name === this.inputForm.field('receiver').textValue )?.address;
    if (address === undefined) {
      this.inputForm.setStatus('invalidInput')
      return
    }
    this.inputForm.setStatus('loading')
    const token = await lastValueFrom(this.recaptchaService.execute('contactForm'));
    const verifyResponse = await this.apiService.verifyRecaptcha({
      token: token
    })
    if (verifyResponse.action !== 'contactForm' || !verifyResponse.success) {
      this.inputForm.setStatus('recaptchaFailed')
      return
    }
    const request: SendContactMailFunction.Parameters = {
      senderName: this.inputForm.field('name').textValue,
      senderAddress: this.inputForm.field('email').textValue,
      receiverName: this.inputForm.field('receiver').textValue,
      receiverAddress: address,
      message: this.inputForm.field('message').textValue,
    };
    const response = await this.apiService.sendContactMail(request);
    const status: 'sendSucceded' | 'sendFailed' = response.success ? 'sendSucceded' : 'sendFailed'
    this.inputForm.setStatus(status);
    if (response.success) {
      this.resetForm();
    }
  }

  private resetForm() {
    this.inputForm.resetAll()
    this.inputForm.field('receiver').textValue = this.receivers[0].name
  }
}
