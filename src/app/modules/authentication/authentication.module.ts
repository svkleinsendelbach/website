import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationCheckComponent } from './components/authentication-check/authentication-check.component';
import { TextSectionModule } from '../text-section/text-section.module';

@NgModule({
    declarations: [
        AuthenticationCheckComponent
    ],
    imports: [
        CommonModule,
        TextSectionModule
    ],
    exports: [
        AuthenticationCheckComponent
    ]
})
export class AuthenticationModule { }
