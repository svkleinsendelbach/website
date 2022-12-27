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
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
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
import { GeneralComponent } from './pages/football-adults/general/general.component';
import { MapsComponent } from './template/components/maps/maps.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { BfvWidgetComponent } from './template/components/bfv-widget/bfv-widget.component';
import { SquadComponent } from './template/components/squad/squad.component';
import { SquadPersonComponent } from './template/components/squad/squad-person/squad-person.component';

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
    GeneralComponent,
    MapsComponent,
    BfvWidgetComponent,
    SquadComponent,
    SquadPersonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireFunctionsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
 //    AngularFirestoreModule,
    AngularFireAnalyticsModule,
    AngularFirePerformanceModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService,
    PerformanceMonitoringService,
    { provide: REGION, useValue: 'europe-west1' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
