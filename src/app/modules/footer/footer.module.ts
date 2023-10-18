import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';
import { GeneralComponentsModule } from '../general-components/general-components.module';
import { NgModule } from '@angular/core';
import { TextSectionModule } from '../text-section/text-section.module';

@NgModule({
    declarations: [FooterComponent],
    exports: [FooterComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        GeneralComponentsModule,
        TextSectionModule
    ]
})
export class FooterModule { }
