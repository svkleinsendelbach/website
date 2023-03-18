import { Component, Input } from '@angular/core';
import { StyleConfigService } from '../../../../services/style-config.service';

@Component({
    selector: 'text-section',
    templateUrl: './text-section.component.html',
    styleUrls: ['./text-section.component.sass']
})
export class TextSectionComponent {
    @Input() title?: string;

    public constructor(
        public readonly styleConfig: StyleConfigService
    ) {}
}
