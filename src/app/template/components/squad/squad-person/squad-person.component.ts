import { Component, Input } from '@angular/core';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { SquadComponent } from '../squad.component';

@Component({
  selector: 'app-squad-person',
  templateUrl: './squad-person.component.html',
  styleUrls: ['./squad-person.component.sass']
})
export class SquadPersonComponent {
  @Input() public person!: SquadComponent.SquadPersonInfo;

  public constructor(
    public styleConfig: StyleConfigService
  ) {}
}
