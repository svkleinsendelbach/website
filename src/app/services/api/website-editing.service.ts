import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { lastValueFrom } from 'rxjs';
import { EventGroupId } from './events-fetcher.service';
import { StorageFilesManagerService } from './storage-files-manager.service';

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
  constructor(private fns: AngularFireFunctions, private storageFilesManager: StorageFilesManagerService) {}

  public async getUsersWaitingForEditing(): Promise<WebsiteEditingService.WebsiteEditor[]> {
    return await this.executeFirebaseFunction<{ jsonWebToken: string }, WebsiteEditingService.WebsiteEditor[]>(
      'getUsersToWaitingForRegistrationForEditing',
      {
        jsonWebToken: this.jsonWebToken,
      }
    );
  }

  public async acceptDeclineUserWaitingForEditing(acceptDecline: 'accept' | 'decline', userId: string) {
    return await this.executeFirebaseFunction<{ userId: string; acceptDecline: 'accept' | 'decline'; jsonWebToken: string }>(
      'acceptDeclineUserWaitingForRegistrationForEditing',
      {
        userId,
        acceptDecline,
        jsonWebToken: this.jsonWebToken,
      }
    );
  }

  public async editEvent(params: WebsiteEditingService.EditEventParams) {
    return await this.executeFirebaseFunction<WebsiteEditingService.EditEventParams & { jsonWebToken: string }>(
      'editEvents',
      {
        ...params,
        jsonWebToken: this.jsonWebToken,
      },
    );
  }

  public async editNews(params: Omit<WebsiteEditingService.EditNewsParams, 'newsUrl'>, messageParams: { fileName: string, message: string }) {
    await this.storageFilesManager.uploadString(messageParams.message, `news/${messageParams.fileName}`);
    const newsUrl = await this.storageFilesManager.getDownloadUrl(`news/${messageParams.fileName}`);
    return await this.executeFirebaseFunction<WebsiteEditingService.EditNewsParams & { jsonWebToken: string }>(
      'editNews',
      {
        ...params,
        newsUrl: newsUrl,
        jsonWebToken: this.jsonWebToken,
      },
    )
  }

  private get jsonWebToken(): string {
    const expiration = localStorage.getItem('website_editing_user_expires_at');
    if (expiration === null || new Date(Number(expiration)) < new Date())
      throw new WebsiteEditingError('permission-denied');
    const token = localStorage.getItem('website_editing_user_id_token');
    if (token === null) throw new WebsiteEditingError('permission-denied');
    return token;
  }

  private async executeFirebaseFunction<Params, Result = void>(name: string, params: Params): Promise<Result> {
    const callable = this.fns.httpsCallable<Params, Result>(name);
    return await lastValueFrom(callable(params)).catch(error => {
      if (error.code === 'functions/permission-denied')
        throw new WebsiteEditingError('permission-denied');
      console.error(error);
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

  export type EditEventParams = AddUpdateEventParams | RemoveEventParams;

  export interface AddUpdateEventParams {
    editType: 'add' | 'update';
    groupId: EventGroupId;
    eventId: string;
    eventDate: string;
    eventTitle: string;
    eventSubtitle?: string;
    eventLink?: string;
  }

  export interface RemoveEventParams {
    editType: 'remove';
    groupId: EventGroupId;
    eventId: string;
  }

  export interface EditNewsParams {
    editType: 'add' | 'update';
    newsId?: string;
    title: string;
    subtitle?: string;
    date: string;
    shortDescription?: string;
    newsUrl: string;
    disabled: boolean;
    thumbnailUrl: string;
  }

}
