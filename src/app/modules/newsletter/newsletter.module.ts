import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { TextSectionModule } from '../text-section/text-section.module';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';
import { AppNewsletterComponent } from './app.newsletter.component';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';


@NgModule({
    bootstrap: [AppNewsletterComponent],
    declarations: [
        AppNewsletterComponent,
        NewsletterComponent
    ],
    exports: [NewsletterComponent],
    imports: [
        BrowserModule,
        CommonModule,
        FontAwesomeModule,
        TextSectionModule
    ]
})
export class NewsletterModule {
    public constructor(
        faIconLibrary: FaIconLibrary
    ) {
        faIconLibrary.addIconPacks(fas, far, fab);
    }
}
