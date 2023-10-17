import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { AppearanceSelectorComponent } from './components/appearance-selector/appearance-selector.component';
import { BfvWidgetComponent } from './components/bfv-widget/bfv-widget.component';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './components/contact/contact.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GoogleMapsModule } from '@angular/google-maps';
import { LinksComponent } from './components/links/links.component';
import { MapsComponent } from './components/maps/maps.component';
import { NgModule } from '@angular/core';
import { SquadComponent } from './components/squad/squad.component';
import { SquadPersonComponent } from './components/squad/squad-person/squad-person.component';
import { TextSectionModule } from '../text-section/text-section.module';
import { SponsorsRowComponent } from './components/sponsors-row/sponsors-row.component';
import { SponsorsComponent } from './components/sponsors-row/sponsor/sponsors.component';

@NgModule({
    declarations: [
        AppearanceSelectorComponent,
        BfvWidgetComponent,
        ContactComponent,
        LinksComponent,
        MapsComponent,
        SponsorsComponent,
        SponsorsRowComponent,
        SquadComponent,
        SquadPersonComponent
    ],
    exports: [
        AppearanceSelectorComponent,
        BfvWidgetComponent,
        ContactComponent,
        LinksComponent,
        MapsComponent,
        SponsorsRowComponent,
        SquadComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        GoogleMapsModule,
        HttpClientJsonpModule,
        HttpClientModule,
        TextSectionModule
    ]
})
export class GeneralComponentsModule { }
