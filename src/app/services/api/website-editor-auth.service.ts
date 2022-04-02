import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { lastValueFrom } from 'rxjs';
import * as sha512 from 'js-sha512';
import { OAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat/app';

export type LoginErrorCode = 'unknown' | 'invalid-email' | 'user-disabled' | 'wrong-password' | 'popup-blocked' | 'popup-closed';

export namespace LoginErrorCode {
  export function isLoginErrorCode(value: string): value is LoginErrorCode {
    return ['unknown', 'invalid-email', 'user-disabled', 'wrong-password', 'popup-blocked', 'popup-closed'].includes(value);
  }

  export function errorMessage(errorCode: LoginErrorCode): string {
    switch (errorCode) {
      case 'unknown':
        return 'Es ist ein unbekannter Fehler aufgetreten.';
      case 'invalid-email':
        return 'Die angegebene E-Mail Addresse ust ungültig.';
      case 'user-disabled':
        return 'Der Benutzer wurde gesperrt.';
      case 'wrong-password':
        return 'Das angebene Passwort ist falsch.';
      case 'popup-blocked':
        return 'Anmeldefenster wurde von Ihrem Browser blockiert.';
      case 'popup-closed':
        return 'Anmeldefenster wurde vom Benutzer geschlossen.';
    }
  }
}

export class LoginError implements Error {
  public readonly name: string = 'WebsiteEditorAuthServiceLoginError';
  public readonly message: string = 'An error occured while logging in, see error code.';
  public constructor(public readonly code: LoginErrorCode) {}
}

@Injectable({
  providedIn: 'root',
})
export class WebsiteEditorAuthService {
  constructor(private fns: AngularFireFunctions, private auth: AngularFireAuth) {}

  public async login(email: string, passwort: string): Promise<'registered' | 'unregistered'> {
    const credential = await this.auth.signInWithEmailAndPassword(email, passwort).catch(async error => {
      switch (error.code) {
        case 'auth/invalid-email':
          throw new LoginError('invalid-email');
        case 'auth/user-disabled':
          throw new LoginError('user-disabled');
        case 'auth/user-not-found':
          return await this.auth.createUserWithEmailAndPassword(email, passwort).catch(() => {
            throw new LoginError('unknown');
          });
        case 'auth/wrong-password':
          throw new LoginError('wrong-password');
      }
      throw new LoginError('unknown');
    });
    return this.handleLoginCredential(credential);
  }

  public async loginWithApple(): Promise<'registered' | 'unregistered'> {
    const provider = new OAuthProvider('apple.com');
    const credential = await this.auth.signInWithPopup(provider).catch(this.handlePopupError);
    return this.handleLoginCredential(credential);
  }

  public async loginWithGoogle(): Promise<'registered' | 'unregistered'> {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.auth.signInWithPopup(provider).catch(this.handlePopupError);
    return this.handleLoginCredential(credential);
  }

  private handlePopupError(error: any): never {
    switch (error.code) {
      case 'auth/account-exists-with-different-credential':
        throw new LoginError('unknown');
      case 'auth/auth-domain-config-required':
        throw new LoginError('unknown');
      case 'auth/cancelled-popup-request':
        throw new LoginError('popup-blocked');
      case 'auth/operation-not-allowed':
        throw new LoginError('unknown');
      case 'auth/operation-not-supported-in-this-environment':
        throw new LoginError('unknown');
      case 'auth/popup-blocked':
        throw new LoginError('popup-blocked');
      case 'auth/popup-closed-by-user':
        throw new LoginError('popup-closed');
      case 'auth/unauthorized-domain':
        throw new LoginError('unknown');
    }
    throw new LoginError('unknown');
  }

  private async handleLoginCredential(
    credential: firebase.auth.UserCredential,
  ): Promise<'registered' | 'unregistered'> {
    if (credential.user === null)
      throw new LoginError('unknown');
    const authorized = (await this.checkAuthorationAndStoreLocal(credential.user)) === 'authorized';
    return authorized ? 'registered' : 'unregistered';
  }

  private async checkAuthorationAndStoreLocal(
    user: firebase.User | null = null,
  ): Promise<'authorized' | 'unauthorized'> {
    localStorage.removeItem('website_editing_user_id_token');
    localStorage.removeItem('website_editing_user_expires_at');
    if (user === null)
      user = await this.auth.currentUser;
    if (user === null)
      return 'unauthorized';

    const callable = this.fns.httpsCallable<{ userId: string }, { token: string; expiresAt: number }>(
      'checkUserForEditing',
    );
    const jwtPayload = await lastValueFrom(
      callable({
        userId: sha512.sha512(user.uid),
      }),
    ).catch(error => {
      if (error.code === 'functions/permission-denied') {
        return 'unauthorized' as const;
      } else {
        throw new LoginError('unknown');
      }
    });
    if (jwtPayload === 'unauthorized')
      return 'unauthorized';

    if (new Date(jwtPayload.expiresAt) < new Date())
      return 'unauthorized';
    localStorage.setItem('website_editing_user_id_token', jwtPayload.token);
    localStorage.setItem('website_editing_user_expires_at', jwtPayload.expiresAt.toString());
    return 'authorized';
  }

  public async logOut() {
    localStorage.removeItem('website_editing_user_id_token');
    localStorage.removeItem('website_editing_user_expires_at');
    await this.auth.signOut();
  }

  public get isLoggedIn(): Promise<boolean> {
    return new Promise(async resolve => {
      const expiration = localStorage.getItem('website_editing_user_expires_at');
      if (expiration !== null && new Date(Number(expiration)) >= new Date()) {
        return resolve(true);
      }
      const authorized = await this.checkAuthorationAndStoreLocal();
      return resolve(authorized === 'authorized');
    });
  }

  public get isLoggedOut(): Promise<boolean> {
    return new Promise(async resolve => {
      return resolve(!(await this.isLoggedIn));
    });
  }

  public async addUserToWaitingForRegistration(firstName: string, lastName: string) {
    const currentUser = await this.auth.currentUser;
    if (currentUser === null) {
      throw new LoginError('unknown');
    }
    const callable = this.fns.httpsCallable<{ userId: string; firstName: string; lastName: string }, void>('addUserToWaitingForRegistrationForEditing');
    await lastValueFrom(callable({
      userId: sha512.sha512(currentUser.uid),
      firstName,
      lastName
    }));
  }

  public async removeRegisteredUser() {
    await this.logOut();
  }
}
