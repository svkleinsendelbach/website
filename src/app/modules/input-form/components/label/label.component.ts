import { Component, Input } from '@angular/core';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'label',
    styleUrls: ['./label.component.sass'],
    templateUrl: './label.component.html'
})
export class LabelComponent {
    @Input() public text!: string;

    public constructor(
        public styleConfig: StyleConfigService
    ) {}
}
