import { Component, Input } from '@angular/core';
import { Link } from '../../classes/link';
import { Style } from '../../classes/style';
import { AppearanceService } from '../../services/appearance.service';
import { DeviceTypeService } from '../../services/device-type.service';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent<InternalPath extends string> {
  public faPhone = faPhone;

  @Input() public footerData!: FooterComponent.FooterData<InternalPath>;

  @Input() public styleConfig!: FooterComponent.StyleConfig;

  public hoveredLinkId: string | null = null;

  public editButtonHovered = false;

  public constructor(
    public readonly appearance: AppearanceService,
    public readonly deviceType: DeviceTypeService
  ) {}

  public handleLinkHoverStart(link: { id: string }) {
    this.hoveredLinkId = link.id;
  }

  public handleLinkHoverStop(link: { id: string }) {
    if (this.hoveredLinkId === link.id) {
      this.hoveredLinkId = null;
    }
  }
}

export namespace FooterComponent {
  export interface ContactData {
    function: string
    name: string,
    street: string,
    city: string
    telephone: {
      number: string,
      text: string
    }
  }

  export interface FooterData<InternalPath extends string>{
    links: {
      id: string,
      link: Link
    }[],
    copyrightText: string,
    editLink?: Link,
    contact: ContactData[]
  }

  export interface StyleConfig {
    backgroundColor: Style.AppearanceColor,
    backgroundColorHover: Style.AppearanceColor,
    contactBackgroundColor: Style.AppearanceColor,
    contactTextColor: Style.AppearanceColor,
    contactShadow: Style.AppearanceColor,
    primaryColor: Style.AppearanceColor,
    textColor: Style.AppearanceColor
  }
}
