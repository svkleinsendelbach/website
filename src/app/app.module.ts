import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from 'src/app/modules/material/material.module';

import 'src/app/utils';

import { environment } from '../environments/environment.prod';
import { AngularFireModule } from '@angular/fire/compat';
import { REGION, AngularFireFunctionsModule } from '@angular/fire/compat/functions';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GoogleMapsModule } from '@angular/google-maps';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DesktopHeaderComponent } from './components/header/desktop-header/desktop-header.component';
import { HeaderItemComponent as DesktopHeaderItemComponent } from './components/header/desktop-header/header-item/header-item.component';
import { TopNewsComponent } from './pages/home/top-news/top-news.component';
import { MobileHeaderComponent } from './components/header/mobile-header/mobile-header.component';
import { HeaderItemComponent } from './components/header/mobile-header/header-item/header-item.component';
import { BirthdayViewComponent } from './pages/home/top-news/birthday-view/birthday-view.component';
import { HttpClientModule } from '@angular/common/http';
import { GameViewComponent } from './pages/home/top-news/game-view/game-view.component';
import { NavigationComponent } from './pages/home/top-news/navigation/navigation.component';
import { LinksComponent } from './pages/home/links/links.component';
import { FooterComponent } from './components/footer/footer.component';
import { ManagersComponent } from './pages/about-us/managers/managers.component';
import { SportsHomeComponent } from './pages/about-us/sports-home/sports-home.component';
import { ChronicleComponent } from './pages/about-us/chronicle/chronicle.component';
import { StatuteComponent } from './pages/about-us/statute/statute.component';
import { PrivacyComponent } from './pages/about-us/privacy/privacy.component';
import { RequestComponent } from './pages/about-us/request/request.component';
import { ImprintComponent } from './pages/imprint/imprint.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { GeneralComponent } from './pages/football-adults/general/general.component';
import { FirstTeamComponent } from './pages/football-adults/first-team/first-team.component';
import { EventsComponent } from './components/events/events.component';
import { SquadComponent } from './components/squad/squad.component';
import { PersonComponent } from './components/squad/person/person.component';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';
import { ContactComponent } from './components/contact/contact.component';
import { TrainingTimeComponent } from './components/training-time/training-time.component';
import { ResultsComponent } from './components/results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    DesktopHeaderComponent,
    DesktopHeaderItemComponent,
    TopNewsComponent,
    MobileHeaderComponent,
    HeaderItemComponent,
    BirthdayViewComponent,
    GameViewComponent,
    NavigationComponent,
    LinksComponent,
    FooterComponent,
    ManagersComponent,
    SportsHomeComponent,
    ChronicleComponent,
    StatuteComponent,
    PrivacyComponent,
    RequestComponent,
    ImprintComponent,
    PageNotFoundComponent,
    GeneralComponent,
    FirstTeamComponent,
    EventsComponent,
    SquadComponent,
    PersonComponent,
    PhoneNumberPipe,
    ContactComponent,
    TrainingTimeComponent,
    ResultsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireFunctionsModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FontAwesomeModule,
    GoogleMapsModule,
  ],
  providers: [{ provide: REGION, useValue: 'europe-west1' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
