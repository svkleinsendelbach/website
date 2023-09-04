import { Component, Input } from '@angular/core';
import { ContactData } from '../../types/contact-data';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { FooterData } from '../../types/footer-data';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'footer',
    styleUrls: ['./footer.component.sass'],
    templateUrl: './footer.component.html'
})
export class FooterComponent {
    @Input() public footerData!: FooterData;

    public FooterLink = FooterData.Link;

    public ContactData = ContactData;

    public faPhone = faPhone;

    public constructor(
        public readonly styleConfig: StyleConfigService,
        public readonly deviceType: DeviceTypeService
    ) {}
}
