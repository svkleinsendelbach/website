import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextSectionComponent } from './components/text-section/text-section.component';

@NgModule({
    declarations: [
        TextSectionComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        TextSectionComponent
    ]
})
export class TextSectionModule { }
