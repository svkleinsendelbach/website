import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from 'src/app/modules/material/material.module';
/*
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
*/
import { environment } from '../environments/environment.prod';
import { AngularFireModule } from '@angular/fire/compat';
import { REGION, AngularFireFunctionsModule } from '@angular/fire/compat/functions';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    /*provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),*/
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireFunctionsModule,
    AngularFireStorageModule,
    FontAwesomeModule,
  ],
  providers: [{ provide: REGION, useValue: 'europe-west1' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
