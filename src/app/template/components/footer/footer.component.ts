import { Component, Input } from '@angular/core';
import { Link } from '../../classes/link';
import { DeviceTypeService } from '../../services/device-type.service';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { StyleConfigService } from '../../services/style-config.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent {
  public faPhone = faPhone;

  @Input() public footerData!: FooterComponent.FooterData;

  public hoveredLinkId: string | null = null;

  public editButtonHovered = false;

  public constructor(
    public readonly styleConfig: StyleConfigService,
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

  export interface FooterData{
    links: {
      id: string,
      link: Link
    }[],
    copyrightText: string,
    editLink?: Link,
    contact: ContactData[]
  }
}
