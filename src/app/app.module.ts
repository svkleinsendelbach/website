import { ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { environment } from '../environments/environment';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { USE_DEVICE_LANGUAGE, PERSISTENCE } from '@angular/fire/compat/auth';

// Imported Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
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
import { NewsModule } from './modules/news/news.module';
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
import { NewsDetailPage } from './pages/news/news-detail/news-detail.page';
import { AllNewsPage } from './pages/news/all-news/all-news.page';
import { AllReportsPage } from './pages/reports/all-reports/all-reports.page';
import { GameDetailPage } from './pages/game-detail/game-detail.page';
import { EditingMainPage } from './pages/editing/main/editing-main.page';
import { LoginPage } from './pages/editing/login/login.page';
import { EditingEventsPage } from './pages/editing/events/editing-events.page';
import { EditEventPage } from './pages/editing/events/edit-event/edit-event.page';
import { EditingNewsPage } from './pages/editing/news/editing-news.page';
import { EditNewsPage } from './pages/editing/news/edit-news/edit-news.page';
import { EditingReportsPage } from './pages/editing/reports/editing-reports.page';
import { EditReportPage } from './pages/editing/reports/edit-report/edit-report.page';

@NgModule({
    declarations: [
        AppComponent,
        HomeBannerComponent,
        HomeLinksComponent,
        SocialMediaLinksComponent,
        LoginAddUserWaitingComponent,
        LoginPageComponent,
        PageNotFoundPage,
        HomePage,
        ManagersPage,
        SportshomePage,
        ChroniclePage,
        StatutePage,
        PrivacyPage,
        RequestPage,
        FootballAdultsGeneralPage,
        FirstTeamPage,
        SecondTeamPage,
        AhTeamPage,
        FootballYouthGeneralPage,
        CYouthPage,
        EYouthPage,
        FYouthPage,
        GYouthPage,
        GymnasticsPage,
        DancingPage,
        DrivePage,
        ContactPage,
        ImprintPage,
        NewsDetailPage,
        AllNewsPage,
        AllReportsPage,
        GameDetailPage,
        EditingMainPage,
        LoginPage,
        EditingEventsPage,
        EditEventPage,
        EditingNewsPage,
        EditNewsPage,
        EditingReportsPage,
        EditReportPage
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFireStorageModule,
        AngularFireAnalyticsModule,
        AngularFirePerformanceModule,
        HttpClientModule,
        HttpClientJsonpModule,
        RecaptchaV3Module,
        InputFormModule,
        CookieSelectorModule,
        HeaderModule,
        FooterModule,
        FirebaseApiModule,
        TextSectionModule,
        EventsModule,
        AuthenticationModule,
        GeneralComponentsModule,
        NewsModule,
        ReportsModule
    ],
    providers: [
        ScreenTrackingService,
        UserTrackingService,
        PerformanceMonitoringService,
        { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptchaApiKey },
        { provide: USE_DEVICE_LANGUAGE, useValue: true },
        { provide: PERSISTENCE, useValue: 'local' },
        { provide: BUCKET, useValue: 'gs://svkleinsendelbach-website-v2' },
        { provide: CONFIG, useValue: {
            send_page_view: false,
            anonymize_ip: true
        }},
        { provide: COLLECTION_ENABLED, useValue: false },
        { provide: INSTRUMENTATION_ENABLED, useValue: false },
        { provide: DATA_COLLECTION_ENABLED, useValue: false }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
