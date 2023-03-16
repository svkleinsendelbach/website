import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieSelectorComponent } from './components/selector/selector.component';

@NgModule({
    declarations: [
        CookieSelectorComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CookieSelectorComponent
    ]
})
export class CookieSelectorModule { }
