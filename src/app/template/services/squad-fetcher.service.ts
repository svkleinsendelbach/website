import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SquadFetcherService {
  public constructor(
    private readonly firebaseFunctions: AngularFireFunctions
  ) {}

  public async fetchSquad(parametersPath: string): Promise<SquadFetcherService.Squad> {
    const callable = this.firebaseFunctions.httpsCallable('getAnpfiffInfoData')
    return (await lastValueFrom(callable({
      website: 'team/kader',
      parameters: parametersPath
    }))).value
  }
}

export namespace SquadFetcherService {
  export interface Squad {
    kader?: {
      torwart?: SquadPerson[];
      abwehr?: SquadPerson[];
      mittelfeld?: SquadPerson[];
      sturm?: SquadPerson[];
      ohneAngabe?: SquadPerson[];
    };
    coach?: Coach,
    stab?: StaffPerson[];
  }

  export interface SquadPerson {
    imageId?: number;
    firstName?: string;
    lastName?: string;
    personParameters?: PersonParameters;
    age?: number;
    inSquad?: number;
    goals?: number;
    assists?: number;
  }

  export interface Coach {
    imageId?: number,
    name?: string,
    personParameters?: PersonParameters,
    age?: number
  }

  export interface StaffPerson {
    imageId?: number,
    function?: string,
    name?: string,
    personParameters?: PersonParameters
  }

  export interface PersonParameters {
    spielkreis: number;
    personId: number;
  }
}
