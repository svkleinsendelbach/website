import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewletterComponent } from './components/newletter/newletter.component';
import { TextSectionModule } from '../text-section/text-section.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
    declarations: [NewletterComponent],
    exports: [NewletterComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        TextSectionModule
    ]
})
export class NewsletterModule { }
