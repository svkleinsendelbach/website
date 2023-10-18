import { Component } from '@angular/core';
import { AppearanceService } from 'src/app/services/appearance.service';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { TrackBy } from 'src/app/types/track-by';
import { internalLinks } from 'src/app/types/internal-link-path';
import { websiteConfig } from 'src/app/config/website-config';

@Component({
    selector: 'footer',
    styleUrls: ['./footer.component.sass'],
    templateUrl: './footer.component.html'
})
export class FooterComponent {
    public TrackBy = TrackBy;

    public links = [
        internalLinks.anfahrt,
        internalLinks.kontakt,
        internalLinks['kritik-vorschläge'],
        internalLinks.impressum
    ];

    public contactItems = websiteConfig.footerContacts;

    public constructor(
        public readonly styleConfig: StyleConfigService,
        public readonly appearanceService: AppearanceService,
        public readonly deviceType: DeviceTypeService
    ) {}
}
