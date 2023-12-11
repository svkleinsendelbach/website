import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TextSectionComponent } from 'kleinsendelbach-website-library';

@Component({
    selector: 'gymnastics-page',
    standalone: true,
    imports: [TextSectionComponent],
    templateUrl: './gymnastics.page.html',
    styleUrl: './gymnastics.page.sass'
})
export class GymnasticsPage {

    constructor(
        private readonly titleService: Title
    ) {
        this.titleService.setTitle('Gymnastik')
    }
}
