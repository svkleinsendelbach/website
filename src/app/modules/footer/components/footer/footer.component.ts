import { Component, Input } from '@angular/core';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { FooterData } from '../../types/footer-data';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { TrackBy } from 'src/app/types/track-by';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'footer',
    styleUrls: ['./footer.component.sass'],
    templateUrl: './footer.component.html'
})
export class FooterComponent {
    @Input() public footerData!: FooterData;

    public TrackBy = TrackBy;

    public faPhone = faPhone;

    public constructor(
        public readonly styleConfig: StyleConfigService,
        public readonly deviceType: DeviceTypeService
    ) {}
}
