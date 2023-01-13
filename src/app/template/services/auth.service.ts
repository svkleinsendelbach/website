import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ApiService } from './api.service';
import firebase from 'firebase/compat/app';
import { OAuthProvider } from '@angular/fire/auth';
import { UserAuthenticationType } from './api-functions-types';
import { InputFields } from '../classes/input-fields';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticationExpirationTime: {
    [Key in UserAuthenticationType]?: Date
  } = {};

  constructor(
    private readonly firebaseAuth: AngularFireAuth,
    private readonly apiService: ApiService
  ) {}

  public async loginWithEmail(authenticationType: UserAuthenticationType, email: string, password: string): Promise<AuthService.RegistrationStatus> {
    this.authenticationExpirationTime[authenticationType] = undefined;
    const credential = await this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .catch(async reason => {
        this.handleEmailError(reason);
        return await this.firebaseAuth
        .createUserWithEmailAndPassword(email, password)
        .catch(() => {
          throw new AuthService.LoginError('unknown');
        });
      });
    return this.handleLoginCredential(authenticationType, credential);
  }

  public async loginWithApple(authenticationType: UserAuthenticationType): Promise<AuthService.RegistrationStatus> {
    this.authenticationExpirationTime[authenticationType] = undefined;
    const provider = new OAuthProvider('apple.com');
    const credential = await this.firebaseAuth
      .signInWithPopup(provider)
      .catch(this.handlePopupError);
    return this.handleLoginCredential(authenticationType, credential);
  }

  public async loginWithGoogle(authenticationType: UserAuthenticationType): Promise<AuthService.RegistrationStatus> {
    this.authenticationExpirationTime[authenticationType] = undefined;
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.firebaseAuth
      .signInWithPopup(provider)
      .catch(this.handlePopupError);
    return this.handleLoginCredential(authenticationType, credential);
  }

  private async handleEmailError(error: unknown) {
    if (typeof error !== 'object' || error === null || !('code' in error))
      throw new AuthService.LoginError('unknown');
      switch ((error as Record<'code', unknown>).code) {
        case 'auth/invalid-email':
          throw new AuthService.LoginError('invalid-email');
        case 'auth/user-disabled':
          throw new AuthService.LoginError('user-disabled');
        case 'auth/wrong-password':
          throw new AuthService.LoginError('wrong-password');
        case 'auth/user-not-found': return;
      }
      throw new AuthService.LoginError('unknown');
  }

  private handlePopupError(error: unknown): never {
    if (typeof error !== 'object' || error === null || !('code' in error))
      throw new AuthService.LoginError('unknown');
    switch ((error as Record<'code', unknown>).code) {
      case 'auth/account-exists-with-different-credential':
        throw new AuthService.LoginError('unknown');
      case 'auth/auth-domain-config-required':
        throw new AuthService.LoginError('unknown');
      case 'auth/cancelled-popup-request':
        throw new AuthService.LoginError('popup-blocked');
      case 'auth/operation-not-allowed':
        throw new AuthService.LoginError('unknown');
      case 'auth/operation-not-supported-in-this-environment':
        throw new AuthService.LoginError('unknown');
      case 'auth/popup-blocked':
        throw new AuthService.LoginError('popup-blocked');
      case 'auth/popup-closed-by-user':
        throw new AuthService.LoginError('popup-closed');
      case 'auth/unauthorized-domain':
        throw new AuthService.LoginError('unknown');
    }
    throw new AuthService.LoginError('unknown');
  }

  private async handleLoginCredential(authenticationType: UserAuthenticationType, credential: firebase.auth.UserCredential): Promise<AuthService.RegistrationStatus> {
    if (credential.user === null)
      throw new AuthService.LoginError('unknown');
    const authorized = await this.checkAuthenticationAndStoreLocal(authenticationType, credential.user);
    if (authorized === 'authorized')
      this.authenticationExpirationTime[authenticationType] = new Date(new Date().getTime() + 300000) // 5 minutes
    return authorized === 'authorized' ? 'registered' : 'unregistered';
  }

  private async checkAuthenticationAndStoreLocal(authenticationType: UserAuthenticationType, user: firebase.User | null = null): Promise<'authorized' | 'unauthorized'> {
    if (user === null) {
      user = await new Promise<firebase.User | null>(async resolve => {
        const unsubscribe = await this.firebaseAuth.onAuthStateChanged(user => {
          unsubscribe();
          resolve(user);
        });
      })
    }
    if (user === null)
      return 'unauthorized';
    const expirationTime = this.authenticationExpirationTime[authenticationType];
    if (expirationTime !== undefined && expirationTime >= new Date())
      return 'authorized'
    this.authenticationExpirationTime[authenticationType] = undefined;
    return await this.apiService.checkUserAuthentication({
      type: authenticationType
    });
  }

  public async logOut() {
    this.authenticationExpirationTime = {};
    await this.firebaseAuth.signOut();
  }

  public async isLoggedIn(authenticationType: UserAuthenticationType): Promise<boolean> {
    const authorized = await this.checkAuthenticationAndStoreLocal(authenticationType);
    return authorized === 'authorized';
  }

  public async isLoggedOut(authenticationType: UserAuthenticationType): Promise<boolean> {
    return !(await this.isLoggedIn(authenticationType));
  }

  public async addUserForWaiting(authenticationType: UserAuthenticationType, firstName: string, lastName: string) {
    const user = await this.firebaseAuth.currentUser;
    if (user === null)
      throw new AuthService.LoginError('unknown');
    this.apiService.addUserForWaiting({
      type: authenticationType,
      firstName: firstName,
      lastName: lastName
    });
  }

  public async removeRegistration() {
    await this.logOut();
  }
}

export namespace AuthService {
  export type RegistrationStatus = 'registered' | 'unregistered';

  export class LoginError implements Error {
    public readonly name: string = 'WebsiteEditorAuthServiceLoginError';

    public readonly message: string = 'An error occured while logging in, see error code.';

    public constructor(
      public readonly code: LoginError.Code
    ) {}
  }

  export namespace LoginError {
    export type Code = 'unknown' | 'invalid-email' | 'user-disabled' | 'wrong-password' | 'popup-blocked' | 'popup-closed';

    export namespace Code {
      export function isLoginErrorCode(value: string): value is LoginError.Code {
        return [
          'unknown', 'invalid-email', 'user-disabled', 'wrong-password', 'popup-blocked', 'popup-closed'
        ].includes(value);
      }

      export const statusMessages: {
        [key in LoginError.Code]: {
          message: string,
          level: InputFields.StatusLevel
        }
      } = {
        'unknown': {
          message: 'Es ist ein unbekannter Fehler aufgetreten.',
          level: InputFields.StatusLevel.Error
        },
        'invalid-email': {
          message: 'Die angegebene E-Mail Addresse ust ungültig.',
          level: InputFields.StatusLevel.Error
        },
        'user-disabled': {
          message: 'Der Benutzer wurde gesperrt.',
          level: InputFields.StatusLevel.Error
        },
        'wrong-password': {
          message: 'Das angebene Passwort ist falsch.',
          level: InputFields.StatusLevel.Error
        },
        'popup-blocked': {
          message: 'Anmeldefenster wurde von Ihrem Browser blockiert.',
          level: InputFields.StatusLevel.Error
        },
        'popup-closed': {
          message: 'Anmeldefenster wurde vom Benutzer geschlossen.',
          level: InputFields.StatusLevel.Error
        }
      }
    }
  }
}
