import { Component, Input } from '@angular/core';
import { ContactItem } from '../../types/contact-item';
import { DeviceTypeService } from '../../../../services/device-type.service';
import { StyleConfigService } from '../../../../services/style-config.service';
import { TrackBy } from 'src/app/types/track-by';

@Component({
    selector: 'contact',
    styleUrls: ['./contact.component.sass'],
    templateUrl: './contact.component.html'
})
export class ContactComponent {
    @Input() public contactData!: ContactItem[];

    public TrackBy = TrackBy;

    public constructor(
        public readonly styleConfig: StyleConfigService,
        public readonly deviceType: DeviceTypeService
    ) {}
}
