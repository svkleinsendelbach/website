import { Component, Input } from '@angular/core';
import { StyleConfigService } from 'src/app/template/services/style-config.service';

@Component({
    selector: 'label',
    templateUrl: './label.component.html',
    styleUrls: ['./label.component.sass']
})
export class LabelComponent {
  @Input() public text!: string;

  public constructor(
    public styleConfig: StyleConfigService
  ) {}
}
