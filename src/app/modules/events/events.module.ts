import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './components/events/events.component';
import { TextSectionModule } from '../text-section/text-section.module';

@NgModule({
    declarations: [
        EventsComponent
    ],
    imports: [
        CommonModule,
        TextSectionModule
    ],
    exports: [
        EventsComponent
    ]
})
export class EventsModule { }
