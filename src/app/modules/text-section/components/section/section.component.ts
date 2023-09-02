import { Component, Input } from '@angular/core';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'section',
    styleUrls: ['./section.component.sass'],
    templateUrl: './section.component.html'
})
export class SectionComponent {
    @Input() public title!: string;

    public constructor(
        public readonly styleConfig: StyleConfigService
    ) {}
}
