import { Component, Input } from '@angular/core';
import { DeviceTypeService } from '../../../../services/device-type.service';
import { faPhone, faMobile, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { StyleConfigService } from '../../../../services/style-config.service';
import { ContactItem } from '../../types/contact-item';

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.sass']
})
export class ContactComponent {
    public faPhone = faPhone;
    public faMobile = faMobile;
    public faEnvelope = faEnvelope;

    @Input() public contactData!: ContactItem[];

    public constructor(
        public readonly styleConfig: StyleConfigService,
        public readonly deviceType: DeviceTypeService
    ) {}
}
