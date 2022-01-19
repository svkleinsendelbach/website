import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from 'src/app/modules/material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DesktopHeaderComponent } from './components/header/desktop-header/desktop-header.component';
import { HeaderItemComponent as DesktopHeaderItemComponent } from './components/header/desktop-header/header-item/header-item.component';
import { TopNewsComponent } from './pages/home/top-news/top-news.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent, DesktopHeaderComponent, DesktopHeaderItemComponent, TopNewsComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
