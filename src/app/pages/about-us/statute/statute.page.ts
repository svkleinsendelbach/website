import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { TextSectionComponent } from 'kleinsendelbach-website-library';

@Component({
  selector: 'statute-page',
  standalone: true,
  imports: [TextSectionComponent],
  templateUrl: './statute.page.html',
  styleUrl: './statute.page.sass'
})
export class StatutePage {

    constructor(
        private readonly titleService: Title
    ) {
        this.titleService.setTitle('Satzung')
    }
}
