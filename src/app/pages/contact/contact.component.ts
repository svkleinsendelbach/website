/* eslint-disable no-unused-vars */
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { HeaderIntransparentService } from 'src/app/services/header-intransparent.service';
import { lastValueFrom, Observable } from 'rxjs';
import { VerifyRecaptchaService } from '../../services/api/verify-recaptcha.service';
import { SendContactMailService, MailRequest } from '../../services/api/send-contact-mail.service';

enum Status {
  input = '',
  loading = 'loading',
  success = 'success',
  inputError = 'inputError',
  failure = 'failure',
  recaptchFailed = 'recaptchFailed'
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass'],
})
export class ContactComponent {
  public Status = Status;

  public formEvaluated = false;

  public status: Status = Status.input;

  private currentStatusTimeout: number | null = null;

  public receivers = [
    { name: 'Vorstandschaft', address: 'vorstand@sv-kleinsendelbach.de' },
    { name: 'Herrenfußball', address: 'herrenfußball@sv-kleinsendelbach.de' },
    { name: 'Jugendfußball', address: 'jugenfußball@sv-kleinsendelbach.de' },
    { name: 'Gymnastik', address: 'gymnastik@sv-kleinsendelbach.de' },
    { name: 'Tanzen', address: 'tanzen@sv-kleinsendelbach.de' },
  ];

  public contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.compose([Validators.email, Validators.required])],
    receiver: [this.receivers[0].name, Validators.required],
    message: ['', Validators.required],
  });

  constructor(
    private headerIntransparentService: HeaderIntransparentService,
    private titleService: Title,
    public deviceType: DeviceTypeService,
    private fb: FormBuilder,
    private recaptchaService: ReCaptchaV3Service,
    private verifyRecaptchaService: VerifyRecaptchaService,
    private sendContactMailService: SendContactMailService,
  ) {
    this.headerIntransparentService.makeIntransparent();
    this.titleService.setTitle('Kontakt');
  }

  public onSubmit(): void {
    if (this.contactForm.invalid) {
      this.formEvaluated = true;
      this.setStatus(Status.inputError);
      return;
    }
    this.sendContactMail();
  }

  private async sendContactMail() {
    const address = this.receivers.find(receiver => {
      return receiver.name === this.contactForm.value.receiver;
    })?.address;
    if (address === undefined) {
      this.setStatus(Status.inputError);
      return;
    }
    this.setStatus(Status.loading);
    const token = await lastValueFrom(this.recaptchaService.execute('contactFormAction'));
    const verifyResponse = await this.verifyRecaptchaService.fetch('contactForm', token);
    if (!verifyResponse.success) {
      this.setStatus(Status.recaptchFailed);
      return;
    }
    const request: MailRequest = {
      sender: {
        name: this.contactForm.value.name,
        address: this.contactForm.value.email,
      },
      receiver: {
        name: this.contactForm.value.receiver,
        address,
      },
      message: this.contactForm.value.message,
    };
    const response = await this.sendContactMailService.sendMail(request);
    const status = response === 'success' ? Status.success : Status.failure;
    this.setStatus(status);
    if (response === 'success') {
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.contactForm.reset();
    this.contactForm.controls['receiver'].setValue(this.receivers[0].name);
    this.formEvaluated = false;
  }

  private setStatus(status: Status): void {
    this.status = status;
    if (this.currentStatusTimeout) {
      clearTimeout(this.currentStatusTimeout);
    }
    this.currentStatusTimeout = window.setTimeout(() => {
      this.status = Status.input;
    }, 5000);
  }

  public evaluateError(t: 'name' | 'receiver' | 'message'): 'fieldEmpty' | null;
  public evaluateError(t: 'email'): 'fieldEmpty' | 'emailInvalid' | null;
  public evaluateError(type: 'name' | 'email' | 'receiver' | 'message'): 'fieldEmpty' | 'emailInvalid' | null {
    if (this.isInputInvalid(type, 'required')) {
      return 'fieldEmpty';
    } else if (type === 'email' && this.isInputInvalid('email', 'email')) {
      return 'emailInvalid';
    }
    return null;
  }

  private isInputInvalid(t: 'name' | 'email' | 'receiver' | 'message', et: 'required'): boolean;
  private isInputInvalid(t: 'email', et: 'email'): boolean;
  private isInputInvalid(type: 'name' | 'email' | 'receiver' | 'message', errorType: 'required' | 'email'): boolean {
    return (
      (this.contactForm.controls[type].errors?.[errorType] ?? false) &&
      (this.contactForm.controls[type].touched || this.formEvaluated)
    );
  }
}
