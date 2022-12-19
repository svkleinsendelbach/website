import { Component, Input } from '@angular/core';
import { Style } from '../../classes/style';
import { AppearanceService } from '../../services/appearance.service';
import { DeviceTypeService } from '../../services/device-type.service';
import { faPhone, faMobile, faEnvelope } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.sass']
})
export class ContactInfoComponent {
  public faPhone = faPhone
  public faMobile = faMobile
  public faEnvelope = faEnvelope

  @Input() public contactData!: ContactInfoComponent.ContactItem[]

  @Input() public styleConfig!: ContactInfoComponent.StyleConfig

  public constructor(
    public readonly appearance: AppearanceService,
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

  export interface StyleConfig {
    primaryColor: Style.AppearanceColor,
    textColor: Style.AppearanceColor,
    secondaryTextColor: Style.AppearanceColor
  }
}
