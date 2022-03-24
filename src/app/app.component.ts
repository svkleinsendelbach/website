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

  constructor(private deviceType: DeviceTypeService, private headerIntransparentService: HeaderIntransparentService) {}

  public get marginTop(): string {
    if (!this.headerIntransparentService.isIntransparent) return '0';
    return this.deviceType.isMobile ? '50px' : '75px';
  }

  public get minContentHeightStyleClass(): 'content-min-height-658' | 'content-min-height-285' | 'content-min-height-708' | 'content-min-height-360' {
    let minHeight: 658 | 285 | 708 | 360;
    if (this.headerIntransparentService.isIntransparent) {
        minHeight = this.deviceType.isMobile ? 708 : 360;
    } else {
        minHeight = this.deviceType.isMobile ? 658 : 285;
    }
    return `content-min-height-${minHeight}`;
  }
}
