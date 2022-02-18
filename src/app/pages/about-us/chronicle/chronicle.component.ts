import { Component, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { HeaderIntransparentService } from 'src/app/services/header-intransparent.service';

@Component({
  selector: 'app-chronicle',
  templateUrl: './chronicle.component.html',
  styleUrls: ['./chronicle.component.sass'],
})
export class ChronicleComponent {
  constructor(
    private headerIntransparentService: HeaderIntransparentService,
    private titleService: Title,
    public deviceType: DeviceTypeService,
  ) {
    this.headerIntransparentService.makeIntransparent();
    this.titleService.setTitle('Chronik');
  }

  @HostListener('window:resize')
  onResize() {
    this.deviceType.windowResized();
  }
}
