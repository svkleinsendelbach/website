import { PERSISTENCE } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { REGION } from '@angular/fire/compat/functions';
import { IMAGE_CONFIG } from '@angular/common';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from '../../../../src/app/environment/environment';

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(
            CalendarModule.forRoot({
                provide: DateAdapter,
                useFactory: adapterFactory
            }),
            AngularFireModule.initializeApp(environment.firebase),
            RecaptchaV3Module
        ),
        { provide: REGION, useValue: 'europe-west1' },
        { provide: PERSISTENCE, useValue: 'local' },
        { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptchaApiKey },
        {
            provide: IMAGE_CONFIG,
            useValue: {
                disableImageSizeWarning: true,
                disableImageLazyLoadWarning: true
            }
        }
    ]
};
