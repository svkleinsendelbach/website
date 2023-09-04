import { Component, Input } from '@angular/core';
import { faEnvelope, faMobile, faPhone } from '@fortawesome/free-solid-svg-icons';
import { ContactItem } from '../../types/contact-item';
import { DeviceTypeService } from '../../../../services/device-type.service';
import { StyleConfigService } from '../../../../services/style-config.service';

@Component({
    selector: 'contact',
    styleUrls: ['./contact.component.sass'],
    templateUrl: './contact.component.html'
})
export class ContactComponent {
    @Input() public contactData!: ContactItem[];

    public ContactItem = ContactItem;

    public faPhone = faPhone;

    public faMobile = faMobile;

    public faEnvelope = faEnvelope;

    public constructor(
        public readonly styleConfig: StyleConfigService,
        public readonly deviceType: DeviceTypeService
    ) {}
}
