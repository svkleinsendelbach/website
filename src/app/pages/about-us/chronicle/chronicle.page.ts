import { Component } from '@angular/core';
import { TextSectionComponent } from 'kleinsendelbach-website-library';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'chronicle-page',
    standalone: true,
    imports: [TextSectionComponent],
    templateUrl: './chronicle.page.html',
    styleUrl: './chronicle.page.sass'
})
export class ChroniclePage {

    constructor(
        private readonly titleService: Title
    ) {
        this.titleService.setTitle('Chronik')
    }
}
