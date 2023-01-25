import { Component, Input } from '@angular/core';
import { StyleConfigService } from 'src/app/template/services/style-config.service';
import { Error } from '../../classes/error';
import { ErrorLevel } from '../../classes/error-level';

@Component({
  selector: 'error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.sass']
})
export class ErrorMessageComponent {
  @Input() public error!: Error | undefined;

  public constructor(
    public styleConfig: StyleConfigService
  ) {}

  public get messageColor(): string {
    if (this.error === undefined)
      return '';
    switch (this.error.level) {
      case ErrorLevel.Error: return this.styleConfig.css('formErrorStatusColor');
      case ErrorLevel.Info: return this.styleConfig.css('formInfoStatusColor');
      case ErrorLevel.Success: return this.styleConfig.css('formSuccessStatusColor');
    }
  }
}
