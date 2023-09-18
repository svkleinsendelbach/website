/* eslint-disable no-duplicate-imports */
/* eslint-disable sort-imports */

import { ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { environment } from '../environments/environment';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { PERSISTENCE, USE_DEVICE_LANGUAGE } from '@angular/fire/compat/auth';
import { registerLocaleData } from '@angular/common';
import * as de from '@angular/common/locales/de';

// Imported Modules
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/compat/storage';
import { AngularFireAnalyticsModule, COLLECTION_ENABLED, CONFIG } from '@angular/fire/compat/analytics';
import { AngularFirePerformanceModule, DATA_COLLECTION_ENABLED, INSTRUMENTATION_ENABLED, PerformanceMonitoringService } from '@angular/fire/compat/performance';

// Internal Modules
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { CookieSelectorModule } from './modules/cookie-selector/cookie-selector.module';
import { EventsModule } from './modules/events/events.module';
import { FirebaseApiModule } from './modules/firebase-api/firebase-api.module';
import { FooterModule } from './modules/footer/footer.module';
import { GeneralComponentsModule } from './modules/general-components/general-components.module';
import { HeaderModule } from './modules/header/header.module';
import { InputFormModule } from './modules/input-form/input-form.module';
import { ReportsModule } from './modules/reports/reports.module';
import { TextSectionModule } from './modules/text-section/text-section.module';

// Components
import { AppComponent } from './app.component';
import { HomeBannerComponent } from './pages/home/home-banner/home-banner.component';
import { HomeLinksComponent } from './pages/home/home-links/home-links.component';
import { SocialMediaLinksComponent } from './pages/home/social-media-links/social-media-links.component';
import { LoginAddUserWaitingComponent } from './pages/editing/login/login-add-user-waiting/login-add-user-waiting.component';
import { LoginPageComponent } from './pages/editing/login/login-page/login-page.component';

// Pages
import { PageNotFoundPage } from './pages/page-not-found/page-not-found.page';
import { HomePage } from './pages/home/home.page';
import { ManagersPage } from './pages/about-us/managers/managers.page';
import { SportshomePage } from './pages/about-us/sportshome/sportshome.page';
import { ChroniclePage } from './pages/about-us/chronicle/chronicle.page';
import { StatutePage } from './pages/about-us/statute/statute.page';
import { PrivacyPage } from './pages/about-us/privacy/privacy.page';
import { RequestPage } from './pages/about-us/request/request.page';
import { FootballAdultsGeneralPage } from './pages/football-adults/general/football-adults-general.page';
import { FirstTeamPage } from './pages/football-adults/first-team/first-team.page';
import { SecondTeamPage } from './pages/football-adults/second-team/second-team.page';
import { AhTeamPage } from './pages/football-adults/ah-team/ah-team.page';
import { FootballYouthGeneralPage } from './pages/football-youth/general/football-youth-general.page';
import { CYouthPage } from './pages/football-youth/c-youth/c-youth.page';
import { EYouthPage } from './pages/football-youth/e-youth/e-youth.page';
import { FYouthPage } from './pages/football-youth/f-youth/f-youth.page';
import { GYouthPage } from './pages/football-youth/g-youth/g-youth.page';
import { GymnasticsPage } from './pages/gymnastics/gymnastics.page';
import { DancingPage } from './pages/dancing/dancing.page';
import { DrivePage } from './pages/drive/drive.page';
import { ContactPage } from './pages/contact/contact.page';
import { ImprintPage } from './pages/imprint/imprint.page';
import { AllReportsPage } from './pages/reports/all-reports/all-reports.page';
import { EditingMainPage } from './pages/editing/main/editing-main.page';
import { LoginPage } from './pages/editing/login/login.page';
import { EditingEventsPage } from './pages/editing/events/editing-events.page';
import { EditEventPage } from './pages/editing/events/edit-event/edit-event.page';
import { EditingReportsPage } from './pages/editing/reports/editing-reports.page';
import { EditReportPage } from './pages/editing/reports/edit-report/edit-report.page';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { NavigationBarComponent as EditingNavigationBarComponent } from './pages/editing/main/navigation-bar/navigation-bar.component';
import { CriticismSuggestionPage } from './pages/criticism-suggestion/criticism-suggestion.page';
import { EditingUserRolesPage } from './pages/editing/user-roles/editing-user-roles.page';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EditingOccupancyPage } from './pages/editing/occupancy/editing-occupancy.page';
import { LocationCalendarDayViewComponent } from './pages/editing/occupancy/location-calendar-day-view/location-calendar-day-view.component';
import { EditOccupancyPage } from './pages/editing/occupancy/edit-occupancy/edit-occupancy.page';
import { EditingCriticismSuggestionPage } from './pages/editing/criticism-suggestion/editing-criticism-suggestion.page';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AhTeamPage,
        AllReportsPage,
        AppComponent,
        ChroniclePage,
        ContactPage,
        CriticismSuggestionPage,
        CYouthPage,
        DancingPage,
        DrivePage,
        EditEventPage,
        EditingCriticismSuggestionPage,
        EditingEventsPage,
        EditingMainPage,
        EditingNavigationBarComponent,
        EditingOccupancyPage,
        EditingReportsPage,
        EditingUserRolesPage,
        EditOccupancyPage,
        EditReportPage,
        EYouthPage,
        FirstTeamPage,
        FootballAdultsGeneralPage,
        FootballYouthGeneralPage,
        FYouthPage,
        GymnasticsPage,
        GYouthPage,
        HomeBannerComponent,
        HomeLinksComponent,
        HomePage,
        ImprintPage,
        LocationCalendarDayViewComponent,
        LoginAddUserWaitingComponent,
        LoginPage,
        LoginPageComponent,
        ManagersPage,
        PageNotFoundPage,
        PrivacyPage,
        RequestPage,
        SecondTeamPage,
        SocialMediaLinksComponent,
        SportshomePage,
        StatutePage
    ],
    imports: [
        AngularFireAnalyticsModule,
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirePerformanceModule,
        AngularFireStorageModule,
        AppRoutingModule,
        AuthenticationModule,
        BrowserAnimationsModule,
        BrowserModule,
        CookieSelectorModule,
        EventsModule,
        FirebaseApiModule,
        FontAwesomeModule,
        FooterModule,
        GeneralComponentsModule,
        HeaderModule,
        HttpClientJsonpModule,
        HttpClientModule,
        InputFormModule,
        RecaptchaV3Module,
        ReportsModule,
        TextSectionModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        })
    ],
    providers: [
        PerformanceMonitoringService,
        ScreenTrackingService,
        UserTrackingService,
        { provide: RECAPTCHA_V3_SITE_KEY,
            useValue: environment.recaptchaApiKey },
        { provide: USE_DEVICE_LANGUAGE,
            useValue: true },
        { provide: PERSISTENCE,
            useValue: 'local' },
        { provide: BUCKET,
            useValue: 'gs://svkleinsendelbach-website-v2' },
        { provide: CONFIG,
            useValue: {
                // eslint-disable-next-line camelcase
                anonymize_ip: true,
                // eslint-disable-next-line camelcase
                send_page_view: false
            } },
        { provide: COLLECTION_ENABLED,
            useValue: false },
        { provide: INSTRUMENTATION_ENABLED,
            useValue: false },
        { provide: DATA_COLLECTION_ENABLED,
            useValue: false }
    ]
})
export class AppModule {
    public constructor() {
        registerLocaleData(de.default);
    }
}
