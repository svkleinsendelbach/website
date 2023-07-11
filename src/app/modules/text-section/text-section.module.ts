import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextSectionComponent } from './components/text-section/text-section.component';
import { ListComponent } from './components/list/list.component';
import { SectionComponent } from './components/section/section.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        TextSectionComponent,
        ListComponent,
        SectionComponent,
        ContextMenuComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule
    ],
    exports: [
        TextSectionComponent,
        ListComponent,
        SectionComponent,
        ContextMenuComponent
    ]
})
export class TextSectionModule { }
