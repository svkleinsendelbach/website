import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieSelectorMessageComponent } from './template/components/cookies/cookie-selector-message/cookie-selector-message.component';
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
import { AngularFirePerformanceModule } from '@angular/fire/compat/performance';
import { NewsListComponent } from './template/components/news-list/news-list.component'

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
    NewsListComponent
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
    AngularFirePerformanceModule
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService,
    { provide: REGION, useValue: 'europe-west1' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
