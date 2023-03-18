import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment } from '../environments/environment';
import { ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/compat/storage';
import { AngularFireAnalyticsModule, COLLECTION_ENABLED, CONFIG } from '@angular/fire/compat/analytics';
import { AngularFirePerformanceModule, DATA_COLLECTION_ENABLED, INSTRUMENTATION_ENABLED, PerformanceMonitoringService } from '@angular/fire/compat/performance';
import { NewsListComponent } from './template/components/news-list/news-list.component';
import { HomeLinksComponent } from './template/components/home-links/home-links.component';
import { SocialMediaLinksComponent } from './template/components/social-media-links/social-media-links.component';
import { HomeBannerComponent } from './template/components/home-banner/home-banner.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ImprintComponent } from './pages/imprint/imprint.component';
import { PrivacyComponent } from './pages/about-us/privacy/privacy.component';
import { RequestComponent } from './pages/about-us/request/request.component';
import { StatuteComponent } from './pages/about-us/statute/statute.component';
import { ChronicleComponent } from './pages/about-us/chronicle/chronicle.component';
import { SportshomeComponent } from './pages/about-us/sportshome/sportshome.component';
import { ManagersComponent } from './pages/about-us/managers/managers.component';
import { GeneralComponent as FootballAdultsGeneralComponent } from './pages/football-adults/general/general.component';
import { FirstTeamComponent } from './pages/football-adults/first-team/first-team.component';
import { SecondTeamComponent } from './pages/football-adults/second-team/second-team.component';
import { AhTeamComponent } from './pages/football-adults/ah-team/ah-team.component';
import { GeneralComponent as FootballYouthGeneralComponent } from './pages/football-youth/general/general.component';
import { CYouthComponent } from './pages/football-youth/c-youth/c-youth.component';
import { EYouthComponent } from './pages/football-youth/e-youth/e-youth.component';
import { FYouthComponent } from './pages/football-youth/f-youth/f-youth.component';
import { GYouthComponent } from './pages/football-youth/g-youth/g-youth.component';
import { GymnasticsComponent } from './pages/gymnastics/gymnastics.component';
import { DancingComponent } from './pages/dancing/dancing.component';
import { DriveComponent } from './pages/drive/drive.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/editing/main/main.component';
import { LoginComponent } from './pages/editing/login/login.component';
import { LoginPageComponent } from './pages/editing/login/login-page/login-page.component';
import { LoginAddUserWaitingComponent } from './pages/editing/login/login-add-user-waiting/login-add-user-waiting.component';
import { USE_DEVICE_LANGUAGE, PERSISTENCE } from '@angular/fire/compat/auth';
import { EventsComponent } from './pages/editing/events/events.component';
import { EditEventComponent } from './pages/editing/events/edit-event/edit-event.component';
import { NewsComponent } from './pages/editing/news/news.component';
import { EditNewsComponent } from './pages/editing/news/edit-news/edit-news.component';
import { InputFormModule } from './modules/input-form/input-form.module';
import { CookieSelectorModule } from './modules/cookie-selector/cookie-selector.module';
import { AllNewsComponent } from './pages/news/all-news/all-news.component';
import { NewsDetailComponent } from './pages/news/news-detail/news-detail.component';
import { GameDetailComponent } from './pages/game-detail/game-detail.component';
import { HeaderModule } from './modules/header/header.module';
import { FooterModule } from './modules/footer/footer.module';
import { FirebaseApiModule } from './modules/firebase-api/firebase-api.module';
import { TextSectionModule } from './modules/text-section/text-section.module';
import { EventsModule } from './modules/events/events.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { GeneralComponentsModule } from './modules/general-components/general-components.module';

@NgModule({
    declarations: [
        AppComponent,
        NewsListComponent,
        HomeLinksComponent,
        SocialMediaLinksComponent,
        HomeBannerComponent,
        PageNotFoundComponent,
        ImprintComponent,
        PrivacyComponent,
        RequestComponent,
        StatuteComponent,
        ChronicleComponent,
        SportshomeComponent,
        ManagersComponent,
        FootballAdultsGeneralComponent,
        FirstTeamComponent,
        SecondTeamComponent,
        AhTeamComponent,
        FootballYouthGeneralComponent,
        CYouthComponent,
        EYouthComponent,
        FYouthComponent,
        GYouthComponent,
        GymnasticsComponent,
        DancingComponent,
        DriveComponent,
        ContactComponent,
        HomeComponent,
        MainComponent,
        LoginComponent,
        LoginPageComponent,
        LoginAddUserWaitingComponent,
        EventsComponent,
        EditEventComponent,
        NewsComponent,
        EditNewsComponent,
        AllNewsComponent,
        NewsDetailComponent,
        GameDetailComponent
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
        GeneralComponentsModule
    ],
    providers: [
        ScreenTrackingService,
        UserTrackingService,
        PerformanceMonitoringService,
        { provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LdFFLgeAAAAAEzjFiR1X35IK7UHkL2Yx0EQ447i' },
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
