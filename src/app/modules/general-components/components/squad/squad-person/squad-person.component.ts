import { Component, Input } from '@angular/core';
import { SquadPerson } from '../../../types/squad-person';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'squad-person',
    styleUrls: ['./squad-person.component.sass'],
    templateUrl: './squad-person.component.html'
})
export class SquadPersonComponent {
    @Input() public person!: SquadPerson;

    public constructor(
        public styleConfig: StyleConfigService
    ) {}
}
