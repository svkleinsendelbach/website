import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TextSectionComponent } from 'kleinsendelbach-website-library';

@Component({
    selector: 'dancing-page',
    standalone: true,
    imports: [TextSectionComponent],
    templateUrl: './dancing.page.html',
    styleUrl: './dancing.page.sass'
})
export class DancingPage {

    constructor(
        private readonly titleService: Title
    ) {
        this.titleService.setTitle('Tanzen')
    }
}
