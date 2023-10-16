import { Component } from '@angular/core';
import { AppearanceService } from 'src/app/services/appearance.service';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { TrackBy } from 'src/app/types/track-by';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { InternalLink } from 'src/app/types/internal-path';
import { websiteConfig } from 'src/app/config/website-config';

@Component({
    selector: 'footer',
    styleUrls: ['./footer.component.sass'],
    templateUrl: './footer.component.html'
})
export class FooterComponent {
    public editLink = InternalLink.all.bearbeiten;

    public TrackBy = TrackBy;

    public faPhone = faPhone;

    public links = [
        InternalLink.all.anfahrt,
        InternalLink.all.kontakt,
        InternalLink.all['kritik-vorschläge'],
        InternalLink.all.impressum
    ];

    public contactItems = websiteConfig.footerContacts;

    public constructor(
        public readonly styleConfig: StyleConfigService,
        public readonly appearanceService: AppearanceService,
        public readonly deviceType: DeviceTypeService
    ) {}
}
