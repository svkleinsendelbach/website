import { Component, Input } from '@angular/core';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { SquadPerson } from '../../../types/squad-person';

@Component({
    selector: 'squad-person',
    templateUrl: './squad-person.component.html',
    styleUrls: ['./squad-person.component.sass']
})
export class SquadPersonComponent {
    @Input() public person!: SquadPerson;

    public constructor(
        public styleConfig: StyleConfigService
    ) {}
}
