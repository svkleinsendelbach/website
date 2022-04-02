import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

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

@Injectable({
  providedIn: 'root',
})
export class SendContactMailService {
  constructor(private fns: AngularFireFunctions) {}

  public async sendMail(request: MailRequest): Promise<'success' | 'failed'> {
    const callable = this.fns.httpsCallable<MailRequest, { success: boolean; message: string }>('sendContactMail');
    const response = await lastValueFrom(callable(request));
    return response.success ? 'success' : 'failed';
  }
}
