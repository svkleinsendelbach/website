import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LinkDirective, TextSectionComponent } from 'kleinsendelbach-website-library';

@Component({
  selector: 'page-not-found-page',
  standalone: true,
  imports: [TextSectionComponent, LinkDirective],
  templateUrl: './page-not-found.page.html',
  styleUrl: './page-not-found.page.sass'
})
export class PageNotFoundPage {

    constructor(
        public readonly titleService: Title
    ) {
        this.titleService.setTitle('Seite nicht gefunden');
    }
}
