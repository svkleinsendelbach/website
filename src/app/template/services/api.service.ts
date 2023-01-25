import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { environment } from 'src/environments/environment';
import { Crypter } from '../crypter/Crypter';
import { guid } from '../classes/guid';
import { DatabaseType } from '../classes/database-type';
import { lastValueFrom } from 'rxjs';
import { FirebaseFunction } from '../classes/firebase-function';
import { Result } from '../classes/result';
import { VerifyRecaptchaFunction, SendContactMailFunction, AddUserForWaitingFunction, AcceptDeclineWaitingUserFunction, CheckUserAuthenticationFunction, EditEventFunction, EditNewsFunction, GetEventsFunction, GetNewsFunction, GetSingleNewsFunction, GetUnauthenticatedUsersFunction, GetTeamSquadFunction, DeleteAllDataFunction } from './api-functions-types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public constructor(
    private readonly firebaseFunctions: AngularFireFunctions
  ) {}

  public async verifyRecaptcha(parameters: VerifyRecaptchaFunction.Parameters): Promise<VerifyRecaptchaFunction.ReturnType> {
    const result = await this.callFunction<VerifyRecaptchaFunction.Parameters, VerifyRecaptchaFunction.ReturnType>('v2_verifyRecaptcha', parameters);
    return result.get();
  }

  public async sendContactMail(parameters: SendContactMailFunction.Parameters): Promise<SendContactMailFunction.ReturnType> {
    const result = await this.callFunction<SendContactMailFunction.Parameters, SendContactMailFunction.ReturnType>('v2_sendContactMail', parameters);
    return result.get();
  }

  public async addUserForWaiting(parameters: AddUserForWaitingFunction.Parameters): Promise<AddUserForWaitingFunction.ReturnType> {
    const result = await this.callFunction<AddUserForWaitingFunction.Parameters, AddUserForWaitingFunction.ReturnType>('v2_addUserForWaiting', parameters);
    return result.get();
  }

  public async acceptDeclineWaitingUser(parameters: AcceptDeclineWaitingUserFunction.Parameters): Promise<AcceptDeclineWaitingUserFunction.ReturnType> {
    const result = await this.callFunction<AcceptDeclineWaitingUserFunction.Parameters, AcceptDeclineWaitingUserFunction.ReturnType>('v2_acceptDeclineWaitingUser', parameters);
    return result.get();
  }

  public async checkUserAuthentication(parameters: CheckUserAuthenticationFunction.Parameters): Promise<'authorized' | 'unauthorized'> {
    const result = await this.callFunction<CheckUserAuthenticationFunction.Parameters, CheckUserAuthenticationFunction.ReturnType>('v2_checkUserAuthentication', parameters);
    if (result.state === 'failure' && result.error.code === 'permission-denied') return 'unauthorized';
    result.get();
    return 'authorized';
  }

  public async editEvent<GroupId>(parameters: EditEventFunction.Parameters<GroupId>): Promise<EditEventFunction.ReturnType> {
    const result = await this.callFunction<EditEventFunction.Parameters<GroupId>, EditEventFunction.ReturnType>('v2_editEvent', parameters);
    return result.get();
  }

  public async editNews(parameters: EditNewsFunction.Parameters): Promise<EditNewsFunction.ReturnType> {
    const result = await this.callFunction<EditNewsFunction.Parameters, EditNewsFunction.ReturnType>('v2_editNews', parameters);
    return result.get();
  }

  public async getEvents<GroupId>(parameters: GetEventsFunction.Parameters<GroupId>): Promise<GetEventsFunction.ReturnType<GroupId>> {
    const result = await this.callFunction<GetEventsFunction.Parameters<GroupId>, GetEventsFunction.ReturnType<GroupId>>('v2_getEvents', parameters);
    return result.get();
  }

  public async getNews(parameters: GetNewsFunction.Parameters): Promise<GetNewsFunction.ReturnType> {
    const result = await this.callFunction<GetNewsFunction.Parameters, GetNewsFunction.ReturnType>('v2_getNews', parameters);
    return result.get();
  }

  public async getSingleNews(parameters: GetSingleNewsFunction.Parameters): Promise<GetSingleNewsFunction.ReturnType | null> {
    const result = await this.callFunction<GetSingleNewsFunction.Parameters, GetSingleNewsFunction.ReturnType>('v2_getSingleNews', parameters);
    if (result.state === 'failure' && result.error.code === 'unavailable') return null;
    if (result.state === 'failure' && result.error.code === 'not-found') return null;
    return result.get();
  }

  public async getUnauthenticatedUsers(parameters: GetUnauthenticatedUsersFunction.Parameters): Promise<GetUnauthenticatedUsersFunction.ReturnType> {
    const result = await this.callFunction<GetUnauthenticatedUsersFunction.Parameters, GetUnauthenticatedUsersFunction.ReturnType>('v2_getUnauthenticatedUsers', parameters);
    return result.get();
  }

  public async getTeamSquad(parameters: GetTeamSquadFunction.Parameters): Promise<GetTeamSquadFunction.ReturnType> {
    const result = await this.callFunction<GetTeamSquadFunction.Parameters, GetTeamSquadFunction.ReturnType>('v2_getTeamSquad', parameters);
    return result.get();
  }
  public async deleteAllData(parameters: DeleteAllDataFunction.Parameters): Promise<DeleteAllDataFunction.ReturnType> {
    const result = await this.callFunction<DeleteAllDataFunction.Parameters, DeleteAllDataFunction.ReturnType>('v2_deleteAllData', parameters);
    return result.get();
  }

  private async callFunction<Params, ReturnType>(functionName: string, parameters: Params): Promise<FirebaseFunction.ResultType<ReturnType>> {
    const crypter = new Crypter(environment.cryptionKeys);
    const fiatShamirParametersResult = await this.getFiatShamirParameters();
    if (fiatShamirParametersResult.state === 'failure')
      throw fiatShamirParametersResult.error;
    const callableFunction = this.firebaseFunctions.httpsCallable<{
    verbose: ApiService.VerboseType,
    databaseType: DatabaseType.Value,
    parameters: string
    }, string>(functionName);
    const data = await lastValueFrom(callableFunction({
      verbose: environment.verbose,
      databaseType: environment.databaseType.value,
      parameters: crypter.encodeEncrypt({
        ...parameters,
        fiatShamirParameters: fiatShamirParametersResult.value,
        databaseType: environment.databaseType.value
      })
    }));
    const result = crypter.decryptDecode(data) as FirebaseFunction.ResultType<ReturnType>;
    if (result.state === 'success')
      return Result.success(result.value);
    else
      return Result.failure(result.error);
  }

  private async getFiatShamirParameters(): Promise<FirebaseFunction.ResultType<{
    identifier: guid,
    cs: bigint[]
}>> {
    const identifier = guid.newGuid();
    const asAndChallengesResult = await this.callFiatShamirChallengeGeneratorFunction(identifier);
    if (asAndChallengesResult.state === 'failure')
      return asAndChallengesResult;
    const cs: bigint[] = [];
    for (let i = 0; i < 32; i++)
      cs.push(((asAndChallengesResult.value.challenges[i] === 0 ? 1n : environment.fiatShamirKeys.e) * asAndChallengesResult.value.as[i]) % environment.fiatShamirKeys.N);
    return Result.success({
      identifier: identifier,
      cs: cs
    });
  }

  private async callFiatShamirChallengeGeneratorFunction(identifier: guid): Promise<FirebaseFunction.ResultType<{ as: bigint[], challenges: (0 | 1)[] }>> {
    const crypter = new Crypter(environment.cryptionKeys);
    const asAndBs = this.generateAsAndBs();
    const callableFunction = this.firebaseFunctions.httpsCallable<{
      verbose: ApiService.VerboseType,
      databaseType: DatabaseType.Value,
      parameters: string
    }, string>('v2_fiatShamirChallengeGenerator');
    const data = await lastValueFrom(callableFunction({
      verbose: environment.verbose,
      databaseType: environment.databaseType.value,
      parameters: crypter.encodeEncrypt({
        databaseType: environment.databaseType.value,
        identifier: identifier.guidString,
        bs: asAndBs.bs
      })
    }));
    const functionResult = crypter.decryptDecode(data) as FirebaseFunction.ResultType<(0 | 1)[]>;
    if (functionResult.state === 'failure')
      return Result.failure(functionResult.error);
    return Result.success({
      as: asAndBs.as,
      challenges: functionResult.value
    });
  }

  private randomBigint(): bigint {
    const bytes = new Uint8Array(128);
    window.crypto.getRandomValues(bytes);
    let result = 0n;
    for (const byte of bytes)
        result = (result << 8n) + BigInt(byte);
    return result;
  }

  private generateAsAndBs(): { as: bigint[], bs: bigint[] } {
    const as: bigint[] = [];
    const bs: bigint[] = [];
    for (let i = 0; i < 32; i++) {
      const a = this.randomBigint() % environment.fiatShamirKeys.N;
      const b = this.modularPower(a, 2n, environment.fiatShamirKeys.N);
      as.push(a);
      bs.push(b);
    }
    return {
      as: as,
      bs: bs
    };
  }

  private modularPower(base: bigint, exponent: bigint, modulus: bigint) {
    if (modulus === 1n)
      return 0n;
    base %= modulus;
    let result = 1n;
    while (exponent > 0n) {
      if (exponent % 2n === 1n)
        result = (result * base) % modulus;
      exponent >>= 1n;
      base = (base ** 2n) % modulus;
    }
    return result;
  }
}

export namespace ApiService {
  export type VerboseType = 'none' | 'verbose' | 'colored' | 'coloredVerbose';
}
