import { TrackBy } from 'src/app/types/track-by';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Sponsor } from 'src/app/types/sponsors';
import { websiteConfig } from 'src/app/config/website-config';

@Component({
    selector: 'pages-sponsors',
    styleUrls: ['./sponsors.page.sass'],
    templateUrl: './sponsors.page.html'
})
export class SponsorsPage {
    public TrackBy = TrackBy;

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {
        this.titleService.setTitle('Unsere Sponsoren');
    }

    public get mainSponsors(): Sponsor[] | null {
        return websiteConfig.sponsors.mainSponsors;
    }

    public get premiumSponsors(): Sponsor[] | null {
        return websiteConfig.sponsors.premiumSponsors;
    }

    public get partners(): Sponsor[] | null {
        return websiteConfig.sponsors.partners;
    }
}
