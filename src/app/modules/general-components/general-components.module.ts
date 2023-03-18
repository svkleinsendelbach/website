import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BfvWidgetComponent } from './components/bfv-widget/bfv-widget.component';
import { MapsComponent } from './components/maps/maps.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { ContactComponent } from './components/contact/contact.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TextSectionModule } from '../text-section/text-section.module';
import { SquadPersonComponent } from './components/squad/squad-person/squad-person.component';
import { SquadComponent } from './components/squad/squad.component';
import { LinksComponent } from './components/links/links.component';
import { GameInfoComponent } from './components/game-info/game-info.component';
import { LivetickerComponent } from './components/game-info/liveticker/liveticker.component';
import { LivetickerResultComponent } from './components/game-info/liveticker-result/liveticker-result.component';

@NgModule({
    declarations: [
        BfvWidgetComponent,
        MapsComponent,
        ContactComponent,
        SquadPersonComponent,
        SquadComponent,
        LinksComponent,
        LivetickerResultComponent,
        LivetickerComponent,
        GameInfoComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        HttpClientJsonpModule,
        GoogleMapsModule,
        FontAwesomeModule,
        TextSectionModule
    ],
    exports: [
        BfvWidgetComponent,
        MapsComponent,
        ContactComponent,
        SquadComponent,
        LinksComponent,
        GameInfoComponent
    ]
})
export class GeneralComponentsModule { }