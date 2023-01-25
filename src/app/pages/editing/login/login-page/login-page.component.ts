import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { lastValueFrom } from 'rxjs';
import { InternalLink } from 'src/app/classes/InternalPath';
import { ErrorLevel } from 'src/app/template/modules/input-form/classes/error-level';
import { InputError } from 'src/app/template/modules/input-form/classes/input-error';
import { InputField } from 'src/app/template/modules/input-form/classes/input-field';
import { InputForm } from 'src/app/template/modules/input-form/classes/input-form';
import { ValidationResult } from 'src/app/template/modules/input-form/classes/validation-result';
import { Validator } from 'src/app/template/modules/input-form/classes/validator';
import { ApiService } from 'src/app/template/services/api.service';
import { AppearanceService } from 'src/app/template/services/appearance.service';
import { AuthService } from 'src/app/template/services/auth.service';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent {
  public Appearance = AppearanceService.Appearance;

  @Output() private userUnregisteredEmitter = new EventEmitter<void>();

  public signInWithAppleStatus: AuthService.LoginError.Code | 'loading' | 'valid' = 'valid';

  public signInWithGoogleStatus: AuthService.LoginError.Code | 'loading' | 'valid' = 'valid';

  public inputForm = new InputForm(
    {
      email: new InputField<string>('', [
        Validator.required('Die E-Mail Addresse ist erforderlich.'),
        Validator.email('Das ist keine gültige E-Mail Addresse.'),
      ]),
      password: new InputField<string>('', [
        Validator.required('Das Passwort ist erforderlich.'),
        Validator.minLength(8, 'Das Passwort muss mindestens 8 Zeichen lang sein.'),
        Validator.containsAnInteger('Das Passwort muss eine Zahl enthalten.'),
        Validator.containsALowercasedCharacter('Das Passwort muss einen Kleinbuchstaben enthalten.'),
        Validator.containsAnUppercasedCharacter('Das Passwort muss einen Großbuchstaben enthalten.')
      ])
    },
    {
      invalidInput: new InputError('Nicht alle Eingaben sind gültig.'),
      loading: new InputError('Anmeldung wird geprüft.', ErrorLevel.Info),
      recaptchaFailed: new InputError('reCAPTCHA ungültig.'),
      ...AuthService.LoginError.Code.statusMessages
    }
  );

  public constructor(
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService,
    public readonly appearance: AppearanceService,
    private readonly authService: AuthService,
    private readonly apiService: ApiService,
    private recaptchaService: ReCaptchaV3Service,
    private router: Router
  ) {}

  public onSubmit() {
    if (this.inputForm.status !== 'valid')
      return;
    const validation = this.inputForm.evaluate();
    if (validation === ValidationResult.Invalid)
      return;
    this.loginWithEmail();
  }

  public async loginWithEmail() {
    this.signInWithAppleStatus = 'valid';
    this.signInWithGoogleStatus = 'valid';
    this.inputForm.status = 'loading';
    const token = await lastValueFrom(this.recaptchaService.execute('websiteEditingLoginForm'));
    const verifyResponse = await this.apiService.verifyRecaptcha({
      token: token
    });
    if (verifyResponse.action !== 'websiteEditingLoginForm' || !verifyResponse.success) {
      this.inputForm.status = 'recaptchaFailed';
      return;
    }
    const registrationStatus = await this.authService
      .loginWithEmail('websiteEditing', this.inputForm.field('email').value, this.inputForm.field('password').value)
      .catch(reason => this.handleLoginError(reason, 'inputForm'));
    if (registrationStatus === 'error') return;
    await this.handleRegistrationStatus(registrationStatus);
  }

  public async loginWithApple() {
    this.signInWithAppleStatus = 'loading';
    this.signInWithGoogleStatus = 'valid';
    this.inputForm.status = 'valid';
    this.inputForm.reset();
    const registrationStatus = await this.authService
      .loginWithApple('websiteEditing')
      .catch(reason => this.handleLoginError(reason, 'apple'));
    if (registrationStatus === 'error') return;
    await this.handleRegistrationStatus(registrationStatus);
  }

  public async loginWithGoogle() {
    this.signInWithAppleStatus = 'valid';
    this.signInWithGoogleStatus = 'loading';
    this.inputForm.status = 'valid';
    this.inputForm.reset();
    const registrationStatus = await this.authService
      .loginWithGoogle('websiteEditing')
      .catch(reason => this.handleLoginError(reason, 'google'));
    if (registrationStatus === 'error') return;
    await this.handleRegistrationStatus(registrationStatus);
  }

  private handleLoginError(reason: unknown, type: 'inputForm' | 'apple' | 'google'): 'error' {
    if (typeof reason !== 'object' || reason === null)
      return this.setStatus(type, 'unknown');
    if (!('name' in reason) || (reason as Record<'name', unknown>).name !== 'WebsiteEditorAuthServiceLoginError')
      return this.setStatus(type, 'unknown');
    if (!('code' in reason) || typeof (reason as Record<'code', unknown>).code !== 'string' || !AuthService.LoginError.Code.isLoginErrorCode((reason as Record<'code', string>).code))
      return this.setStatus(type, 'unknown');
    return this.setStatus(type, (reason as Record<'code', AuthService.LoginError.Code>).code);
  }

  private setStatus(type: 'inputForm' | 'apple' | 'google', status: AuthService.LoginError.Code): 'error' {
    switch(type) {
      case 'inputForm':
        this.inputForm.status = status;
        break;
      case 'apple':
        this.signInWithAppleStatus = status;
        break;
      case 'google':
        this.signInWithGoogleStatus = status;
        break;
    }
    return 'error';
  }

  private async handleRegistrationStatus(registrationStatus: AuthService.RegistrationStatus) {
    this.signInWithAppleStatus = 'valid';
    this.signInWithGoogleStatus = 'valid';
    this.inputForm.status = 'valid';
    this.inputForm.reset();
    if (registrationStatus === 'registered') {
      await this.router.navigateByUrl(InternalLink.all.bearbeiten.link);
    } else {
      this.userUnregisteredEmitter.emit();
    }
  }

  public loginErrorMessage(code: AuthService.LoginError.Code): string {
    return AuthService.LoginError.Code.statusMessages[code].message;
  }
}
