import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { environment } from './environment/environment';
import { AngularFireModule } from '@angular/fire/compat';

import { REGION } from '@angular/fire/compat/functions';
import { PERSISTENCE } from '@angular/fire/compat/auth';
import { IMAGE_CONFIG } from '@angular/common';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
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
