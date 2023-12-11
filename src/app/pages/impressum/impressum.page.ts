import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { LinkDirective, TextSectionComponent } from 'kleinsendelbach-website-library';

@Component({
    selector: 'impressum-page',
    standalone: true,
    imports: [TextSectionComponent, LinkDirective, FontAwesomeModule],
    templateUrl: './impressum.page.html',
    styleUrl: './impressum.page.sass'
})
export class ImpressumPage {

    constructor(
        public readonly titleService: Title,
        private readonly faIconLibrary: FaIconLibrary
    ) {
        this.faIconLibrary.addIconPacks(fas, far, fab);
        this.titleService.setTitle('Impressum und Datenschutz');
    }
}
