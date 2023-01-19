import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { allInternalLinks } from 'src/app/app.component';
import { InputField } from 'src/app/template/classes/input-field';
import { InputForm } from 'src/app/template/classes/input-form';
import { Validator } from 'src/app/template/classes/validators';
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
    firstName: new InputField(
      'Vorname:',
      InputField.Type.inputText('Vorname'),
      {
        required: {
          validator: Validator.required,
          errorMessage: 'Der Vorname ist erforderlich.'
        }
      }
    ),
    lastName: new InputField(
      'Nachname:',
      InputField.Type.inputText('Nachname'),
      {
        required: {
          validator: Validator.required,
          errorMessage: 'Der Nachname ist erforderlich.'
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
      message: 'Antrag wird übermittelt.',
      level: InputForm.StatusLevel.Info
    },
    ...AuthService.LoginError.Code.statusMessages
  });

  public constructor(
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService,
    private readonly authService: AuthService,
    private router: Router
  ) {}

  public async handleCancel() {
    this.inputForm.resetAll();
    await this.authService.removeRegistration();
    this.addToWaitingUserCanceled.emit();
  }

  public async handleApply() {
    if (this.inputForm.status !== 'valid') return;
    const validation = this.inputForm.validationOfAllFields
    if (validation !== 'valid') return;
    const result = await this.authService
      .addUserForWaiting('websiteEditing', this.inputForm.field('firstName').textValue, this.inputForm.field('lastName').textValue)
      .catch(reason => this.handleLoginError(reason));
    if (result === 'error') return;
    this.inputForm.setStatus('valid');
    this.inputForm.resetAll();
    this.router.navigateByUrl(allInternalLinks.home.link);
  }

  private handleLoginError(reason: unknown): 'error' {
    if (typeof reason !== 'object' || reason === null) {
      this.inputForm.setStatus('unknown');
      return 'error';
    }
    if (!('name' in reason) || (reason as Record<'name', unknown>).name !== 'WebsiteEditorAuthServiceLoginError') {
      this.inputForm.setStatus('unknown');
      return 'error';
    }
    if (!('code' in reason) || typeof (reason as Record<'code', unknown>).code !== 'string' || !AuthService.LoginError.Code.isLoginErrorCode((reason as Record<'code', string>).code)) {
      this.inputForm.setStatus('unknown');
      return 'error';
    }
    this.inputForm.setStatus((reason as Record<'code', AuthService.LoginError.Code>).code);
    return 'error';
  }
}
