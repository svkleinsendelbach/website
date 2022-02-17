import { Component, HostListener } from '@angular/core';
import { DeviceTypeService } from 'src/app/services/device-type.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass'],
})
export class FooterComponent {
  constructor(public deviceType: DeviceTypeService) {}

  @HostListener('window:resize')
  onResize() {
    this.deviceType.windowResized();
  }
}
