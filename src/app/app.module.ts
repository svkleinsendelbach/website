import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieSelectorMessageComponent } from './template/components/cookies/cookie-selector-message/cookie-selector-message.component';
import { HeaderComponent } from './template/components/header/header.component';
import { DesktopHeaderComponent } from './template/components/header/desktop-header/desktop-header.component';
import { DesktopHeaderItemComponent } from './template/components/header/desktop-header/header-item/header-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    CookieSelectorMessageComponent,
    HeaderComponent,
    DesktopHeaderComponent,
    DesktopHeaderItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
