import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { allInternalLinks } from 'src/app/app.component';
import { InputField, InputFields } from 'src/app/template/classes/input-fields';
import { Validator } from 'src/app/template/classes/validator';
import { InputFieldComponent } from 'src/app/template/components/input-form/input-field/input-field.component';
import { AuthService } from 'src/app/template/services/auth.service';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';

@Component({
  selector: 'app-login-add-user-waiting',
  templateUrl: './login-add-user-waiting.component.html',
  styleUrls: ['./login-add-user-waiting.component.sass']
})
export class LoginAddUserWaitingComponent {
  public FieldType = InputFieldComponent.FieldType

  @Output() private addToWaitingUserCanceled = new EventEmitter<void>();

  public inputFields = new InputFields({
    firstName: new InputField({
      required: {
        validator: Validator.required,
        errorMessage: 'Der Vorname ist erforderlich.'
      }
    }),
    lastName: new InputField({
      required: {
        validator: Validator.required,
        errorMessage: 'Der Nachname ist erforderlich.'
      }
    })
  },
  {
    invalidInput: {
      message: 'Nicht alle Eingaben sind gültig.',
      level: InputFields.StatusLevel.Error
    },
    loading: {
      message: 'Antrag wird übermittelt.',
      level: InputFields.StatusLevel.Info
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
    this.inputFields.resetAll();
    await this.authService.removeRegistration();
    this.addToWaitingUserCanceled.emit();
  }

  public async handleApply() {
    if (this.inputFields.status !== 'valid') return;
    const validation = this.inputFields.validationOfAllFields
    if (validation !== 'valid') return;
    const result = await this.authService
      .addUserForWaiting('websiteEditing', this.inputFields.field('firstName').textValue, this.inputFields.field('lastName').textValue)
      .catch(reason => this.handleLoginError(reason));
    if (result === 'error') return;
    this.inputFields.setStatus('valid');
    this.inputFields.resetAll();
    this.router.navigateByUrl(allInternalLinks.home.link);
  }

  private handleLoginError(reason: unknown): 'error' {
    if (typeof reason !== 'object' || reason === null) {
      this.inputFields.setStatus('unknown');
      return 'error';
    }
    if (!('name' in reason) || (reason as Record<'name', unknown>).name !== 'WebsiteEditorAuthServiceLoginError') {
      this.inputFields.setStatus('unknown');
      return 'error';
    }
    if (!('code' in reason) || typeof (reason as Record<'code', unknown>).code !== 'string' || !AuthService.LoginError.Code.isLoginErrorCode((reason as Record<'code', string>).code)) {
      this.inputFields.setStatus('unknown');
      return 'error';
    }
    this.inputFields.setStatus((reason as Record<'code', AuthService.LoginError.Code>).code);
    return 'error';
  }
}
