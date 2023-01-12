import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { lastValueFrom } from 'rxjs';
import { allInternalLinks } from 'src/app/app.component';
import { InputField, InputFields } from 'src/app/template/classes/input-fields';
import { Validator } from 'src/app/template/classes/validator';
import { InputFieldComponent } from 'src/app/template/components/input-form/input-field/input-field.component';
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
  public FieldType = InputFieldComponent.FieldType
  public Appearance = AppearanceService.Appearance

  @Output() private userUnregisteredEmitter = new EventEmitter<void>();

  public signInWithAppleStatus: AuthService.LoginError.Code | 'loading' | 'valid' = 'valid';

  public signInWithGoogleStatus: AuthService.LoginError.Code | 'loading' | 'valid' = 'valid';

  public inputFields = new InputFields(
    {
      email: new InputField({
        required: {
          validator: Validator.required,
          errorMessage: 'Die E-Mail Addresse ist erforderlich.'
        },
        email: {
          validator: Validator.email,
          errorMessage: 'Das ist keine gültige E-Mail Addresse.'
        }
      }),
      password: new InputField({
        required: {
          validator: Validator.required,
          errorMessage: 'Das Passwort ist erforderlich.'
        },
        minLength: {
          validator: Validator.minLength(8),
          errorMessage: 'Das Passwort muss mindestens 8 Zeichen lang sein.'
        },
        containsAnInteger: {
          validator: Validator.containsAnInteger,
          errorMessage: 'Das Passwort muss eine Zahl enthalten.'
        },
        containsALowercasedCharacter: {
          validator: Validator.containsALowercasedCharacter,
          errorMessage: 'Das Passwort muss einen Kleinbuchstaben enthalten.'
        },
        containsAnUppercaseCharacter: {
          validator: Validator.containsAnUppercasedCharacter,
          errorMessage: 'Das Passwort muss einen Großbuchstaben enthalten.'
        }
      })
    },
    {
      invalidInput: {
        message: 'Nicht alle Eingaben sind gültig.',
        level: InputFields.StatusLevel.Error
      },
      loading: {
        message: 'Anmeldung wird geprüft.',
        level: InputFields.StatusLevel.Info
      },
      recaptchaFailed: {
        message: 'reCAPTCHA ungültig.',
        level: InputFields.StatusLevel.Error
      },
      ...AuthService.LoginError.Code.statusMessages
    }
  )

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
    if (this.inputFields.status !== 'valid') { return }
    const validation = this.inputFields.validationOfAllFields
    if (validation !== 'valid') { return }
    this.loginWithEmail();
  }

  public async loginWithEmail() {
    this.signInWithAppleStatus = 'valid';
    this.signInWithGoogleStatus = 'valid';
    this.inputFields.setStatus('loading');
    const token = await lastValueFrom(this.recaptchaService.execute('websiteEditingLoginForm'));
    const verifyResponse = await this.apiService.verifyRecaptcha({
      token: token
    })
    if (verifyResponse.action !== 'websiteEditingLoginForm' || !verifyResponse.success) {
      this.inputFields.setStatus('recaptchaFailed')
      return
    }
    const registrationStatus = await this.authService
      .loginWithEmail('websiteEditing', this.inputFields.field('email').textValue, this.inputFields.field('password').textValue)
      .catch(reason => this.handleLoginError(reason, 'inputFields'));
    if (registrationStatus === 'error') return;
    await this.handleRegistrationStatus(registrationStatus);
  }

  public async loginWithApple() {
    this.signInWithAppleStatus = 'loading';
    this.signInWithGoogleStatus = 'valid';
    this.inputFields.setStatus('valid');
    this.inputFields.resetAll();
    const registrationStatus = await this.authService
      .loginWithApple('websiteEditing')
      .catch(reason => this.handleLoginError(reason, 'apple'));
    if (registrationStatus === 'error') return;
    await this.handleRegistrationStatus(registrationStatus);
  }

  public async loginWithGoogle() {
    this.signInWithAppleStatus = 'valid';
    this.signInWithGoogleStatus = 'loading';
    this.inputFields.setStatus('valid');
    this.inputFields.resetAll();
    const registrationStatus = await this.authService
      .loginWithGoogle('websiteEditing')
      .catch(reason => this.handleLoginError(reason, 'google'));
    if (registrationStatus === 'error') return;
    await this.handleRegistrationStatus(registrationStatus);
  }

  private handleLoginError(reason: unknown, type: 'inputFields' | 'apple' | 'google'): 'error' {
    if (typeof reason !== 'object' || reason === null)
      return this.setStatus(type, 'unknown');
    if (!('name' in reason) || (reason as Record<'name', unknown>).name !== 'WebsiteEditorAuthServiceLoginError')
      return this.setStatus(type, 'unknown');
    if (!('code' in reason) || typeof (reason as Record<'code', unknown>).code !== 'string' || !AuthService.LoginError.Code.isLoginErrorCode((reason as Record<'code', string>).code))
      return this.setStatus(type, 'unknown');
    return this.setStatus(type, (reason as Record<'code', AuthService.LoginError.Code>).code);
  }

  private setStatus(type: 'inputFields' | 'apple' | 'google', status: AuthService.LoginError.Code): 'error' {
    switch(type) {
      case 'inputFields':
        this.inputFields.setStatus(status);
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
    this.inputFields.setStatus('valid');
    this.inputFields.resetAll();
    if (registrationStatus === 'registered') {
      await this.router.navigateByUrl(allInternalLinks.bearbeiten.link);
    } else {
      this.userUnregisteredEmitter.emit();
    }
  }

  public loginErrorMessage(code: AuthService.LoginError.Code): string {
    return AuthService.LoginError.Code.statusMessages[code].message
  }
}
