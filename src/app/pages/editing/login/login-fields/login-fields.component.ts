import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { InputField, InputFields, Validator } from 'src/app/components/input-form/input-form.component';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { LoginErrorCode, WebsiteEditorAuthService } from 'src/app/services/website-editor-auth.service';

@Component({
  selector: 'app-login-fields',
  templateUrl: './login-fields.component.html',
  styleUrls: ['./login-fields.component.sass'],
})
export class LoginFieldsComponent {
  public emailPasswordFields = new InputFields(
    {
      email: new InputField({
        required: Validator.required,
        email: Validator.email,
      }),
      password: new InputField({
        required: Validator.required,
        minLength: Validator.minLength(8),
        containsAnInteger: Validator.containsAnInteger,
        containsALowercasedCharacter: Validator.containsALowercasedCharacter,
        containsAnUppercasedCharacter: Validator.containsAnUppercasedCharacter,
      }),
    },
    undefined as LoginErrorCode | 'loading' | undefined,
  );

  public signInWithAppleStatus: LoginErrorCode | 'loading' | 'valid' = 'valid';

  public signInWithGoogleStatus: LoginErrorCode | 'loading' | 'valid' = 'valid';

  @Output() userUnregisteredEmitter = new EventEmitter<void>();

  constructor(
    private authService: WebsiteEditorAuthService,
    private router: Router,
    public darkMode: DarkModeService,
    public deviceType: DeviceTypeService,
  ) {}

  public isLoginErrorCode(value: string): value is LoginErrorCode {
    return LoginErrorCode.isLoginErrorCode(value);
  }

  public loginErrorMessage(errorCode: LoginErrorCode): string {
    return LoginErrorCode.errorMessage(errorCode);
  }

  public async handleSignInWithEmail() {
    this.signInWithAppleStatus = 'valid';
    this.signInWithGoogleStatus = 'valid';
    const validation = this.emailPasswordFields.validationOfAllFields;
    if (validation !== 'valid') return;
    this.emailPasswordFields.setStatus('loading');
    await this.authService
      .login(this.emailPasswordFields.field('email').textValue, this.emailPasswordFields.field('password').textValue)
      .then(registrationState => {
        this.handleRegistrationState(registrationState);
      })
      .catch(error => {
        if ('name' in error && error.name === 'WebsiteEditorAuthServiceLoginError' && 'code' in error)
          this.emailPasswordFields.setStatus(error.code);
        else this.emailPasswordFields.setStatus('unknown');
      });
  }

  public async handleSignInWithApple() {
    this.signInWithAppleStatus = 'loading';
    this.signInWithGoogleStatus = 'valid';
    this.emailPasswordFields.resetAll();
    await this.authService
      .loginWithApple()
      .then(registrationState => {
        this.handleRegistrationState(registrationState);
      })
      .catch(error => {
        if ('name' in error && error.name === 'WebsiteEditorAuthServiceLoginError' && 'code' in error)
          this.signInWithAppleStatus = error.code;
        else this.signInWithAppleStatus = 'unknown';
      });
  }

  public async handleSignInWithGoogle() {
    this.signInWithAppleStatus = 'valid';
    this.signInWithGoogleStatus = 'loading';
    this.emailPasswordFields.resetAll();
    await this.authService
      .loginWithGoogle()
      .then(registrationState => {
        this.handleRegistrationState(registrationState);
      })
      .catch(error => {
        if ('name' in error && error.name === 'WebsiteEditorAuthServiceLoginError' && 'code' in error)
          this.signInWithGoogleStatus = error.code;
        else this.signInWithGoogleStatus = 'unknown';
      });
  }

  private handleRegistrationState(registrationState: 'registered' | 'unregistered'): void {
    this.emailPasswordFields.setStatus('valid');
    this.signInWithAppleStatus = 'valid';
    this.signInWithGoogleStatus = 'valid';
    if (registrationState === 'registered') {
      this.router.navigateByUrl('/bearbeiten');
      return;
    }
    this.userUnregisteredEmitter.emit();
  }
}
