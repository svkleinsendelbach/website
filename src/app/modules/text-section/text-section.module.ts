import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextSectionComponent } from './components/text-section/text-section.component';
import { ListComponent } from './components/list/list.component';
import { SectionComponent } from './components/section/section.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        ContextMenuComponent,
        ListComponent,
        SectionComponent,
        TextSectionComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule
    ],
    exports: [
        ContextMenuComponent,
        ListComponent,
        SectionComponent,
        TextSectionComponent
    ]
})
export class TextSectionModule { }
