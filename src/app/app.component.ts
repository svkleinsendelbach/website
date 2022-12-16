import { Component, HostListener } from '@angular/core';
import { Style } from './template/classes/style';
import { CookieSelectorMessageComponent } from './template/cookies/cookie-selector-message/cookie-selector-message.component';
import { DeviceTypeService } from './template/services/device-type.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  public title = 'svkleinsendelbach-website';

  public cookieSelectorMessageStyleConfig: CookieSelectorMessageComponent.StyleConfig = {
    backgroundColor: new Style.AppearanceColor(Style.Color.hex('#FFFFFF'), Style.Color.hex('#000000')),
    primaryColor: new Style.AppearanceColor(Style.Color.hex('#C90024')),
    textColor: new Style.AppearanceColor(Style.Color.hex('#333333'), Style.Color.hex('#CCCCCC'))
  }

  public constructor(
    private readonly deviceType: DeviceTypeService
  ) {}

  @HostListener('window:resize') onResize() {
    this.deviceType.windowResized()
  }
}
