import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [FooterComponent],
    exports: [FooterComponent],
    imports: [
        CommonModule,
        FontAwesomeModule
    ]
})
export class FooterModule { }
