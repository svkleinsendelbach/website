import { AuthenticationCheckComponent } from './components/authentication-check/authentication-check.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TextSectionModule } from '../text-section/text-section.module';
import { AppModule } from 'src/app/app.module';

@NgModule({
    declarations: [AuthenticationCheckComponent],
    exports: [AuthenticationCheckComponent],
    imports: [
        CommonModule,
        TextSectionModule
    ]
})
export class AuthenticationModule { }
