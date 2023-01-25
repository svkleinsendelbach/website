import { Component, Input } from '@angular/core';
import { DeviceTypeService } from '../../services/device-type.service';
import { faPhone, faMobile, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { StyleConfigService } from '../../services/style-config.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.sass']
})
export class ContactInfoComponent {
  public faPhone = faPhone;
  public faMobile = faMobile;
  public faEnvelope = faEnvelope;

  @Input() public contactData!: ContactInfoComponent.ContactItem[];

  public constructor(
    public readonly styleConfig: StyleConfigService,
    public readonly deviceType: DeviceTypeService
  ) {}
}

export namespace ContactInfoComponent {
  export interface ContactItem {
    function: string,
    name: string,
    mobile?: {
      number: string,
      text: string
    },
    telephone?: {
      number: string,
      text: string
    },
    email?: string
  }
}
