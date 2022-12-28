import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendContactMailService {
  constructor(
    private readonly firebaseFunctions: AngularFireFunctions
  ) {}

  public async sendMail(request: SendContactMailService.MailRequest): Promise<'success' | 'failure'> {
    const callable = this.firebaseFunctions.httpsCallable('sendContactMail')
    const response = await lastValueFrom(callable(request))
    return response.success ? 'success' : 'failure'
  }
}

export namespace SendContactMailService {
  export interface MailRequest {
    sender: {
      name: string;
      address: string;
    };
    receiver: {
      name: string;
      address: string;
    };
    message: string;
  }
}
