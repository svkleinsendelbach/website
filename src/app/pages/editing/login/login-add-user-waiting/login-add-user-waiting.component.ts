import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { InternalLink } from 'src/app/classes/InternalPath';
import { ErrorLevel } from 'src/app/template/modules/input-form/classes/error-level';
import { InputError } from 'src/app/template/modules/input-form/classes/input-error';
import { InputField } from 'src/app/template/modules/input-form/classes/input-field';
import { InputForm } from 'src/app/template/modules/input-form/classes/input-form';
import { ValidationResult } from 'src/app/template/modules/input-form/classes/validation-result';
import { Validator } from 'src/app/template/modules/input-form/classes/validator';
import { AuthService } from 'src/app/template/services/auth.service';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';

@Component({
  selector: 'app-login-add-user-waiting',
  templateUrl: './login-add-user-waiting.component.html',
  styleUrls: ['./login-add-user-waiting.component.sass']
})
export class LoginAddUserWaitingComponent {

  @Output() private addToWaitingUserCanceled = new EventEmitter<void>();

  public inputForm = new InputForm({
    firstName: new InputField<string>('', [
      Validator.required('Der Vorname ist erforderlich.')
    ]),
    lastName: new InputField<string>('', [
      Validator.required('Der Nachname ist erforderlich.')
    ])
  },
  {
    invalidInput: new InputError('Nicht alle Eingaben sind gültig.'),
    loading: new InputError('Antrag wird übermittelt.',  ErrorLevel.Info),
    ...AuthService.LoginError.Code.statusMessages
  });

  public constructor(
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService,
    private readonly authService: AuthService,
    private router: Router
  ) {}

  public async handleCancel() {
    this.inputForm.reset();
    await this.authService.removeRegistration();
    this.addToWaitingUserCanceled.emit();
  }

  public async handleApply() {
    if (this.inputForm.status !== 'valid')
      return;
    const validation = this.inputForm.evaluate();
    if (validation === ValidationResult.Invalid)
      return;
    const result = await this.authService
      .addUserForWaiting('websiteEditing', this.inputForm.field('firstName').value, this.inputForm.field('lastName').value)
      .catch(reason => this.handleLoginError(reason));
    if (result === 'error') return;
    this.inputForm.status = 'valid';
    this.inputForm.reset();
    this.router.navigateByUrl(InternalLink.all.home.link);
  }

  private handleLoginError(reason: unknown): 'error' {
    if (typeof reason !== 'object' || reason === null) {
      this.inputForm.status = 'unknown';
      return 'error';
    }
    if (!('name' in reason) || (reason as Record<'name', unknown>).name !== 'WebsiteEditorAuthServiceLoginError') {
      this.inputForm.status = 'unknown';
      return 'error';
    }
    if (!('code' in reason) || typeof (reason as Record<'code', unknown>).code !== 'string' || !AuthService.LoginError.Code.isLoginErrorCode((reason as Record<'code', string>).code)) {
      this.inputForm.status = 'unknown';
      return 'error';
    }
    this.inputForm.status = (reason as Record<'code', AuthService.LoginError.Code>).code;
    return 'error';
  }
}
