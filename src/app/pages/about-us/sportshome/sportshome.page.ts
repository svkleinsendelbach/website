import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { OpeningHoursComponent, TextSectionComponent } from 'kleinsendelbach-website-library';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome'
import { openingHoursConfig } from '../../../config/opening-hours.config';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: 'sportshome-page',
    standalone: true,
    imports: [TextSectionComponent, OpeningHoursComponent, FontAwesomeModule],
    templateUrl: './sportshome.page.html',
    styleUrl: './sportshome.page.sass'
})
export class SportshomePage {

    public openingHoursData = openingHoursConfig;

    constructor(
        private readonly titleService: Title,
        private readonly faIconLibrary: FaIconLibrary
    ) {
        this.faIconLibrary.addIconPacks(fas, far, fab);
        this.titleService.setTitle('Sportheim')
    }
}
