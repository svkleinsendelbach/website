import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';
import { GeneralComponentsModule } from '../general-components/general-components.module';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [FooterComponent],
    exports: [FooterComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        GeneralComponentsModule
    ]
})
export class FooterModule { }
