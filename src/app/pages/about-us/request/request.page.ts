import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { TextSectionComponent } from 'kleinsendelbach-website-library';

@Component({
    selector: 'request-page',
    standalone: true,
    imports: [TextSectionComponent],
    templateUrl: './request.page.html',
    styleUrl: './request.page.sass'
})
export class RequestPage {

    constructor(
        private readonly titleService: Title
    ) {
        this.titleService.setTitle('Mitgliedsantrag')
    }
}
