import { CommonModule } from '@angular/common';
import { CookieSelectorComponent } from './components/selector/selector.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [CookieSelectorComponent],
    exports: [CookieSelectorComponent],
    imports: [CommonModule]
})
export class CookieSelectorModule { }
