import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { environment } from 'src/environments/environment';
import { Crypter } from '../crypter/Crypter';
import { DatabaseType } from '../classes/database-type';
import { lastValueFrom } from 'rxjs';
import { FirebaseFunction } from '../classes/firebase-function';
import { Result } from '../classes/result';
import { DeleteAllDataFunction, EventEditFunction, EventGetFunction, GameInfoGetFunction, NewsDisableFunction, NewsEditFunction, NewsGetFunction, NewsGetSingleFunction, SendMailContactFunction, TeamSquadGetFunction, UserAuthenticationAcceptDeclineFunction, UserAuthenticationAddFunction, UserAuthenticationCheckFunction, UserAuthenticationGetAllUnauthenticatedFunction, VerifyRecaptchaFunction } from './api-functions-types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public constructor(
    private readonly firebaseFunctions: AngularFireFunctions
  ) {}

  public async deleteAllData(parameters: DeleteAllDataFunction.Parameters): Promise<DeleteAllDataFunction.ReturnType> {
    const result = await this.callFunction<DeleteAllDataFunction.Parameters, DeleteAllDataFunction.ReturnType>('deleteAllData', parameters);
    return result.get();
  }

  public async verifyRecaptcha(parameters: VerifyRecaptchaFunction.Parameters): Promise<VerifyRecaptchaFunction.ReturnType> {
    const result = await this.callFunction<VerifyRecaptchaFunction.Parameters, VerifyRecaptchaFunction.ReturnType>('verifyRecaptcha', parameters);
    return result.get();
  }

  public async sendMailContact(parameters: SendMailContactFunction.Parameters): Promise<SendMailContactFunction.ReturnType> {
    const result = await this.callFunction<SendMailContactFunction.Parameters, SendMailContactFunction.ReturnType>('sendMailContact', parameters);
    return result.get();
  }

  public async userAuthenticationAdd(parameters: UserAuthenticationAddFunction.Parameters): Promise<UserAuthenticationAddFunction.ReturnType> {
    const result = await this.callFunction<UserAuthenticationAddFunction.Parameters, UserAuthenticationAddFunction.ReturnType>('userAuthenticationAdd', parameters);
    return result.get();
  }

  public async userAuthenticationAcceptDecline(parameters: UserAuthenticationAcceptDeclineFunction.Parameters): Promise<UserAuthenticationAcceptDeclineFunction.ReturnType> {
    const result = await this.callFunction<UserAuthenticationAcceptDeclineFunction.Parameters, UserAuthenticationAcceptDeclineFunction.ReturnType>('userAuthenticationAcceptDecline', parameters);
    return result.get();
  }

  public async userAuthenticationCheck(parameters: UserAuthenticationCheckFunction.Parameters): Promise<'authorized' | 'unauthorized'> {
    const result = await this.callFunction<UserAuthenticationCheckFunction.Parameters, UserAuthenticationCheckFunction.ReturnType>('userAuthenticationCheck', parameters);
    if (result.state === 'failure' && result.error.code === 'permission-denied') return 'unauthorized';
    result.get();
    return 'authorized';
  }

  public async newsDisable(parameters: NewsDisableFunction.Parameters): Promise<NewsDisableFunction.ReturnType> {
    const result = await this.callFunction<NewsDisableFunction.Parameters, NewsDisableFunction.ReturnType>('newsDisable', parameters);
    return result.get();
  }

  public async eventEdit<GroupId>(parameters: EventEditFunction.Parameters<GroupId>): Promise<EventEditFunction.ReturnType> {
    const result = await this.callFunction<EventEditFunction.Parameters<GroupId>, EventEditFunction.ReturnType>('eventEdit', parameters);
    return result.get();
  }

  public async newsEdit(parameters: NewsEditFunction.Parameters): Promise<NewsEditFunction.ReturnType> {
    const result = await this.callFunction<NewsEditFunction.Parameters, NewsEditFunction.ReturnType>('newsEdit', parameters);
    return result.get();
  }

  public async eventGet<GroupId>(parameters: EventGetFunction.Parameters<GroupId>): Promise<EventGetFunction.ReturnType<GroupId>> {
    const result = await this.callFunction<EventGetFunction.Parameters<GroupId>, EventGetFunction.ReturnType<GroupId>>('eventGet', parameters);
    return result.get();
  }

  public async newsGet(parameters: NewsGetFunction.Parameters): Promise<NewsGetFunction.ReturnType> {
    const result = await this.callFunction<NewsGetFunction.Parameters, NewsGetFunction.ReturnType>('newsGet', parameters);
    return result.get();
  }

  public async newsGetSingle(parameters: NewsGetSingleFunction.Parameters): Promise<NewsGetSingleFunction.ReturnType | null> {
    const result = await this.callFunction<NewsGetSingleFunction.Parameters, NewsGetSingleFunction.ReturnType>('newsGetSingle', parameters);
    if (result.state === 'failure' && result.error.code === 'unavailable') return null;
    if (result.state === 'failure' && result.error.code === 'not-found') return null;
    return result.get();
  }

  public async userAuthenticationGetAllUnauthenticated(parameters: UserAuthenticationGetAllUnauthenticatedFunction.Parameters): Promise<UserAuthenticationGetAllUnauthenticatedFunction.ReturnType> {
    const result = await this.callFunction<UserAuthenticationGetAllUnauthenticatedFunction.Parameters, UserAuthenticationGetAllUnauthenticatedFunction.ReturnType>('userAuthenticationGetAllUnauthenticated', parameters);
    return result.get();
  }

  public async teamSquadGet(parameters: TeamSquadGetFunction.Parameters): Promise<TeamSquadGetFunction.ReturnType> {
    const result = await this.callFunction<TeamSquadGetFunction.Parameters, TeamSquadGetFunction.ReturnType>('teamSquadGet', parameters);
    return result.get();
  }

  public async gameInfoGet(parameters: GameInfoGetFunction.Parameters): Promise<GameInfoGetFunction.ReturnType> {
    const result = await this.callFunction<GameInfoGetFunction.Parameters, GameInfoGetFunction.ReturnType>('gameInfoGet', parameters);
    return result.get();
  }

  private async callFunction<Params, ReturnType>(functionName: string, parameters: Params): Promise<FirebaseFunction.ResultType<ReturnType>> {
    const crypter = new Crypter(environment.cryptionKeys);
    const expiresAtIsoDate = new Date(new Date().getTime() + 60000).toISOString();
    const callableFunction = this.firebaseFunctions.httpsCallable<{
      verbose: ApiService.VerboseType;
      databaseType: DatabaseType.Value;
      callSecret: ApiService.CallSecret.Flatten;
      parameters: string;
    }, string>(functionName);
    const data = await lastValueFrom(callableFunction({
      verbose: environment.verbose,
      databaseType: environment.databaseType.value,
      callSecret: {
        expiresAt: expiresAtIsoDate,
        hashedData: Crypter.sha512(expiresAtIsoDate, environment.callSecretKey)
      },
      parameters: crypter.encodeEncrypt(parameters)
    }));

    const result = crypter.decryptDecode(data) as FirebaseFunction.ResultType<ReturnType>;
    if (result.state === 'success')
      return Result.success(result.value);
    else
      return Result.failure(result.error);
  }

}

export namespace ApiService {
  export type VerboseType = 'none' | 'verbose' | 'colored' | 'coloredVerbose';
  export interface CallSecret {
      expiresAt: Date;
      hashedData: string;
  }

  export namespace CallSecret {
      export interface Flatten {
          expiresAt: string;
          hashedData: string;
      }
    }
}
