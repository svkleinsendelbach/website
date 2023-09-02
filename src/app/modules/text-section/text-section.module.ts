import { CommonModule } from '@angular/common';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListComponent } from './components/list/list.component';
import { NgModule } from '@angular/core';
import { SectionComponent } from './components/section/section.component';
import { TextSectionComponent } from './components/text-section/text-section.component';

@NgModule({
    declarations: [
        ContextMenuComponent,
        ListComponent,
        SectionComponent,
        TextSectionComponent
    ],
    exports: [
        ContextMenuComponent,
        ListComponent,
        SectionComponent,
        TextSectionComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule
    ]
})
export class TextSectionModule { }
