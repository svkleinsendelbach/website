import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { TextSectionComponent } from 'kleinsendelbach-website-library';

@Component({
    selector: 'privacy-page',
    standalone: true,
    imports: [TextSectionComponent],
    templateUrl: './privacy.page.html',
    styleUrl: './privacy.page.sass'
})
export class PrivacyPage {

    constructor(
        private readonly titleService: Title
    ) {
        this.titleService.setTitle('Datenschutzerklärung')
    }
}
