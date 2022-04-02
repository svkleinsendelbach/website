import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { InputFields, InputField, Validator } from 'src/app/components/input-form/input-form.component';
import { WebsiteEditorAuthService } from 'src/app/services/api/website-editor-auth.service';
import { DeviceTypeService } from '../../../../services/device-type.service';
import { LoginErrorCode } from '../../../../services/api/website-editor-auth.service';

@Component({
  selector: 'app-login-user-unregistered',
  templateUrl: './login-user-unregistered.component.html',
  styleUrls: ['./login-user-unregistered.component.sass'],
})
export class LoginUserUnregisteredComponent {
  public nameFields = new InputFields(
    {
      firstName: new InputField({
        required: Validator.required,
      }),
      lastName: new InputField({
        required: Validator.required,
      }),
    },
    undefined as LoginErrorCode | 'loading' | undefined,
  );

  @Output() cancelEmitter = new EventEmitter<void>();

  constructor(private authService: WebsiteEditorAuthService, public deviceType: DeviceTypeService, private router: Router) {}

  public isLoginErrorCode(value: string): value is LoginErrorCode {
    return LoginErrorCode.isLoginErrorCode(value);
  }

  public loginErrorMessage(errorCode: LoginErrorCode): string {
    return LoginErrorCode.errorMessage(errorCode);
  }

  public handleCancel() {
    this.nameFields.resetAll();
    this.authService.removeRegisteredUser().catch();
    this.cancelEmitter.emit();
  }

  public handleApply() {
    const validation = this.nameFields.validationOfAllFields;
    if (validation !== 'valid') return;
    this.nameFields.setStatus('loading');
    this.authService
      .addUserToWaitingForRegistration(
        this.nameFields.field('firstName').textValue,
        this.nameFields.field('lastName').textValue,
      )
      .then(() => {
        this.nameFields.setStatus('valid');
        this.router.navigateByUrl('/home');
      })
      .catch(error => {
        if ('name' in error && error.name === 'WebsiteEditorAuthServiceLoginError' && 'code' in error)
          this.nameFields.setStatus(error.code);
        else this.nameFields.setStatus('unknown');
      });;
  }
}
