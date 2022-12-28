import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifyRecaptchaService {
  constructor(
    private readonly firebaseFunctions: AngularFireFunctions
  ) {}

  public async fetch(actionType: 'contactForm', token: string): Promise<VerifyRecaptchaService.VerifyResponse> {
    const callable = this.firebaseFunctions.httpsCallable('verifyRecaptcha')
    return lastValueFrom(callable({
      actionType,
      token
    }))
  }
}

export namespace VerifyRecaptchaService {
  export interface VerifyResponse {
    success: boolean;
    challenge_ts: string;
    hostname: string;
    errorCodes?: string[];
  }
}
