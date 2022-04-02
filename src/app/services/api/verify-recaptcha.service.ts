import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { lastValueFrom } from 'rxjs';

interface VerifyResponse {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  errorCodes?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class VerifyRecaptchaService {
  constructor(private fns: AngularFireFunctions) {}

  public async fetch(actionType: 'contactForm', token: string): Promise<VerifyResponse> {
    const callable = this.fns.httpsCallable('verifyRecaptcha');
    return await lastValueFrom(
      callable({
        actionType,
        token,
      }),
    );
  }
}
