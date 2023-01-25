import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieSelectorMessageComponent } from './template/components/cookie-selector-message/cookie-selector-message.component';
import { HeaderComponent } from './template/components/header/header.component';
import { DesktopHeaderComponent } from './template/components/header/desktop-header/desktop-header.component';
import { DesktopHeaderItemComponent } from './template/components/header/desktop-header/header-item/header-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MobileHeaderComponent } from './template/components/header/mobile-header/mobile-header.component';
import { MobileHeaderItemComponent } from './template/components/header/mobile-header/header-item/header-item.component';
import { FooterComponent } from './template/components/footer/footer.component';
import { InputFormComponent } from './template/components/input-form/input-form.component';
import { ToggleSwitchComponent } from './template/components/toggle-switch/toggle-switch.component';
import { ContactInfoComponent } from './template/components/contact-info/contact-info.component';
import { TextSectionComponent } from './template/components/text-section/text-section.component';
import { environment } from '../environments/environment';
import { ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { EventsComponent } from './template/components/events/events.component';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireFunctionsModule, REGION } from '@angular/fire/compat/functions'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { AngularFireStorageModule, BUCKET } from '@angular/fire/compat/storage'
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics'
import { AngularFirePerformanceModule, PerformanceMonitoringService } from '@angular/fire/compat/performance';
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
import { MapsComponent } from './template/components/maps/maps.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { BfvWidgetComponent } from './template/components/bfv-widget/bfv-widget.component';
import { SquadComponent } from './template/components/squad/squad.component';
import { SquadPersonComponent } from './template/components/squad/squad-person/squad-person.component';
import { LinksComponent } from './template/components/links/links.component';
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
import { ContactComponent } from './pages/contact/contact.component'
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { InputFieldComponent } from './template/components/input-form/input-field/input-field.component';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/editing/main/main.component';
import { AuthenticationCheckComponent } from './template/components/authentication-check/authentication-check.component';
import { LoginComponent } from './pages/editing/login/login.component';
import { LoginPageComponent } from './pages/editing/login/login-page/login-page.component';
import { LoginAddUserWaitingComponent } from './pages/editing/login/login-add-user-waiting/login-add-user-waiting.component'
import { USE_DEVICE_LANGUAGE, PERSISTENCE } from '@angular/fire/compat/auth';
import { EventsComponent as EventsComponent_1 } from './pages/editing/events/events.component';
import { EditEventComponent } from './pages/editing/events/edit-event/edit-event.component';
import { NewsComponent } from './pages/editing/news/news.component';
import { EditNewsComponent } from './pages/editing/news/edit-news/edit-news.component';
import { AngularEditorModule } from '@kolkov/angular-editor'
import { FormsModule } from '@angular/forms';
import { TextEditorComponent } from './template/components/text-editor/text-editor.component';
import { InputFormModule } from './template/modules/input-form/input-form.module';

@NgModule({
  declarations: [
    AppComponent,
    CookieSelectorMessageComponent,
    HeaderComponent,
    DesktopHeaderComponent,
    DesktopHeaderItemComponent,
    MobileHeaderComponent,
    MobileHeaderItemComponent,
    FooterComponent,
    InputFormComponent,
    ToggleSwitchComponent,
    ContactInfoComponent,
    TextSectionComponent,
    EventsComponent,
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
    MapsComponent,
    BfvWidgetComponent,
    SquadComponent,
    SquadPersonComponent,
    LinksComponent,
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
    InputFieldComponent,
    HomeComponent,
    MainComponent,
    AuthenticationCheckComponent,
    LoginComponent,
    LoginPageComponent,
    LoginAddUserWaitingComponent,
    EventsComponent_1,
    EditEventComponent,
    NewsComponent,
    EditNewsComponent,
    TextEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireFunctionsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAnalyticsModule,
    AngularFirePerformanceModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RecaptchaV3Module,
    AngularEditorModule,
    FormsModule,
    InputFormModule
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService,
    PerformanceMonitoringService,
    { provide: REGION, useValue: 'europe-west1' },
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LdFFLgeAAAAAEzjFiR1X35IK7UHkL2Yx0EQ447i' },
    { provide: USE_DEVICE_LANGUAGE, useValue: true },
    { provide: PERSISTENCE, useValue: 'local' },
    { provide: BUCKET, useValue: 'gs://svkleinsendelbach-website-v2' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
