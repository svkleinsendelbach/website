import 'src/app/utils';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { REGION } from '@angular/fire/compat/functions';

// ##### Modules #####

import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// ##### Pipes #####

import { PhoneNumberPipe } from './pipes/phone-number.pipe';

// ##### Components #####

// App component
import { AppComponent } from './app.component';

// Header components
import { HeaderComponent as Header_Component } from './components/header/header.component';
import { DesktopHeaderComponent as Header_Desktop_Component } from './components/header/desktop-header/desktop-header.component';
import { HeaderItemComponent as Header_Desktop_Item_Component } from './components/header/desktop-header/header-item/header-item.component';
import { MobileHeaderComponent as Header_Mobile_Component } from './components/header/mobile-header/mobile-header.component';
import { HeaderItemComponent as Header_Mobile_Item_Component } from './components/header/mobile-header/header-item/header-item.component';

// Footer component
import { FooterComponent as Footer_Component } from './components/footer/footer.component';

// Other components
import { EventsComponent as Events_Component } from './components/events/events.component';
import { ContactComponent as Contact_Component } from './components/contact/contact.component';
import { SquadComponent as Team_Squad_Component } from './components/squad/squad.component';
import { PersonComponent as Team_Squad_Person_Component } from './components/squad/person/person.component';
import { TrainingTimeComponent as Team_TrainingTime_Component } from './components/training-time/training-time.component';
import { ResultsComponent as Team_Results_Component } from './components/results/results.component';

// ##### Pages #####

// Home page
import { HomeComponent as Home_Component } from './pages/home/home.component';
import { TopNewsComponent as Home_TopNews_Component } from './pages/home/top-news/top-news.component';
import { NavigationComponent as Home_TopNews_Navigation_Component } from './pages/home/top-news/navigation/navigation.component';
import { BirthdayViewComponent as Home_TopNews_Birthday_Component } from './pages/home/top-news/birthday-view/birthday-view.component';
import { GameViewComponent as Home_TopNews_Game_Component } from './pages/home/top-news/game-view/game-view.component';
import { LinksComponent as Home_Links_Component } from './pages/home/links/links.component';

// About us pages
import { ManagersComponent as AboutUs_Managers_Component } from './pages/about-us/managers/managers.component';
import { SportsHomeComponent as AboutUs_SportsHome_Component } from './pages/about-us/sports-home/sports-home.component';
import { ChronicleComponent as AboutUs_Chronicle_Component } from './pages/about-us/chronicle/chronicle.component';
import { StatuteComponent as AboutUs_Statute_Component } from './pages/about-us/statute/statute.component';
import { PrivacyComponent as AboutUs_Privacy_Component } from './pages/about-us/privacy/privacy.component';
import { RequestComponent as AboutUs_Request_Component } from './pages/about-us/request/request.component';

// Football adults pages
import { GeneralComponent as FootballAdults_General_Component } from './pages/football-adults/general/general.component';
import { FirstTeamComponent as FootballAdults_FirstTeam_Component } from './pages/football-adults/first-team/first-team.component';
import { SecondTeamComponent as FootballAdults_SecondTeam_Component } from './pages/football-adults/second-team/second-team.component';
import { AhTeamComponent as FootballAdults_AhTeam_Component } from './pages/football-adults/ah-team/ah-team.component';

// Football youth pages
import { GeneralComponent as FootballYouth_General_Component } from './pages/football-youth/general/general.component';
import { CYouthComponent as FootballYouth_CYouth_Component } from './pages/football-youth/c-youth/c-youth.component';
import { EYouthComponent as FootballYouth_EYouth_Component } from './pages/football-youth/e-youth/e-youth.component';
import { FYouthComponent as FootballYouth_FYouth_Component } from './pages/football-youth/f-youth/f-youth.component';
import { GYouthComponent as FootballYouth_GYouth_Component } from './pages/football-youth/g-youth/g-youth.component';

// Other pages
import { ImprintComponent as Imprint_Component } from './pages/imprint/imprint.component';
import { PageNotFoundComponent as PageNotFound_Component } from './pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    Header_Component,
    Header_Desktop_Component,
    Header_Desktop_Item_Component,
    Header_Mobile_Component,
    Header_Mobile_Item_Component,
    Footer_Component,
    Events_Component,
    Contact_Component,
    Team_Squad_Component,
    Team_Squad_Person_Component,
    Team_TrainingTime_Component,
    Team_Results_Component,
    Home_Component,
    Home_TopNews_Component,
    Home_TopNews_Navigation_Component,
    Home_TopNews_Birthday_Component,
    Home_TopNews_Game_Component,
    Home_Links_Component,
    AboutUs_Managers_Component,
    AboutUs_SportsHome_Component,
    AboutUs_Chronicle_Component,
    AboutUs_Statute_Component,
    AboutUs_Privacy_Component,
    AboutUs_Request_Component,
    FootballAdults_General_Component,
    FootballAdults_FirstTeam_Component,
    FootballAdults_SecondTeam_Component,
    FootballAdults_AhTeam_Component,
    FootballYouth_General_Component,
    FootballYouth_CYouth_Component,
    FootballYouth_EYouth_Component,
    FootballYouth_FYouth_Component,
    FootballYouth_GYouth_Component,
    Imprint_Component,
    PageNotFound_Component,
    PhoneNumberPipe,
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
