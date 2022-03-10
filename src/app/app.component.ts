import { Component } from '@angular/core';
import { DeviceTypeService } from './services/device-type.service';
import { HeaderIntransparentService } from './services/header-intransparent.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'svkleinsendelbach-website';

  constructor(private deviceType: DeviceTypeService, private headerIntransparentService: HeaderIntransparentService) { }

  public get marginTop(): string {
    if (!this.headerIntransparentService.isIntransparent) {
      return '0';
    }
    return this.deviceType.isMobile ? '50px' : '75px';
  }
}
