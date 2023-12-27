import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { BoxSplittedComponent, LinkDirective, SponsorsComponent, TextSectionComponent } from 'kleinsendelbach-website-library';
import { sponsorsConfig } from '../../../config/sponsors.config';

@Component({
    selector: 'sponsors-page',
    standalone: true,
    imports: [CommonModule, TextSectionComponent, SponsorsComponent, BoxSplittedComponent, LinkDirective],
    templateUrl: './sponsors.page.html',
    styleUrl: './sponsors.page.sass'
})
export class SponsorsPage {

    public sponsorsData = sponsorsConfig;

    constructor(
        private readonly titleService: Title
    ) {
        this.titleService.setTitle('Unsere Sponsoren');
    }
}
