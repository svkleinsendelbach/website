import { Component, Input } from '@angular/core';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'section',
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.sass']
})
export class SectionComponent {
    @Input() public title!: string;

    public constructor(
        public readonly styleConfig: StyleConfigService
    ) {}
}
