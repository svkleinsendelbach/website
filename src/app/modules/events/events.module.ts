import { CommonModule } from '@angular/common';
import { EventsComponent } from './components/events/events.component';
import { NgModule } from '@angular/core';
import { TextSectionModule } from '../text-section/text-section.module';

@NgModule({
    declarations: [EventsComponent],
    exports: [EventsComponent],
    imports: [
        CommonModule,
        TextSectionModule
    ]
})
export class EventsModule { }
