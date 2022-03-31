import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { lastValueFrom } from 'rxjs';

export type WebsiteEditingErrorCode = 'unknown' | 'permission-denied';

export namespace WebsiteEditingErrorCode {
  export function isLoginErrorCode(value: string): value is WebsiteEditingErrorCode {
    return ['unknown', 'permission-denied'].includes(value);
  }

  export function errorMessage(errorCode: WebsiteEditingErrorCode): string {
    switch (errorCode) {
      case 'unknown':
        return 'Es ist ein unbekannter Fehler aufgetreten.';
      case 'permission-denied':
        return 'Zugriff wurde verweigert.';
    }
  }
}

export class WebsiteEditingError implements Error {
  public readonly name: string = 'WebsiteEditingServiceError';
  public readonly message: string = 'An error occured while editing website, see error code.';
  public constructor(public readonly code: WebsiteEditingErrorCode) {}
}

@Injectable({
  providedIn: 'root',
})
export class WebsiteEditingService {
  constructor(private fns: AngularFireFunctions) {}

  public async getUsersWaitingForEditing(): Promise<WebsiteEditingService.WebsiteEditor[]> {
    const callable = this.fns.httpsCallable<{ jsonWebToken: string }, WebsiteEditingService.WebsiteEditor[]>(
      'getUsersToWaitingForRegistrationForEditing',
    );
    const token = localStorage.getItem('website_editing_user_id_token');
    if (token === null) throw new WebsiteEditingError('permission-denied');
    return await lastValueFrom(
      callable({
        jsonWebToken: token,
      }),
    ).catch(error => {
      if (error.code === 'functions/permission-denied')
        throw new WebsiteEditingError('permission-denied');
      throw new WebsiteEditingError('unknown');
    });
  }

  public async acceptDeclineUserWaitingForEditing(acceptDecline: 'accept' | 'decline', userId: string) {
    const callable = this.fns.httpsCallable<{ userId: string; acceptDecline: 'accept' | 'decline'; jsonWebToken: string }, void>(
      'acceptDeclineUserWaitingForRegistrationForEditing'
    );
    const token = localStorage.getItem('website_editing_user_id_token');
    if (token === null) throw new WebsiteEditingError('permission-denied');
    return await lastValueFrom(callable({
      userId, acceptDecline, jsonWebToken: token,
    })).catch(error => {
      if (error.code === 'functions/permission-denied') throw new WebsiteEditingError('permission-denied');
      throw new WebsiteEditingError('unknown');
    });
  }
}

export namespace WebsiteEditingService {
  export interface WebsiteEditor {
    id: string;
    name: {
      first: string;
      last: string
    };
  }
}
