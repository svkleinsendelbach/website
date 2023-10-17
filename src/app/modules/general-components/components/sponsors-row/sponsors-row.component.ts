import { TrackBy } from 'src/app/types/track-by';
import { Component } from '@angular/core';
import { websiteConfig } from 'src/app/config/website-config';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { Sponsor, Sponsors } from 'src/app/types/sponsors';

@Component({
    selector: 'sponsors-row',
    styleUrls: ['./sponsors-row.component.sass'],
    templateUrl: './sponsors-row.component.html'
})
export class SponsorsRowComponent {
    public TrackBy = TrackBy;

    public sponsors = websiteConfig.sponsors;

    private readonly animationDurationMultiplier: Record<keyof Sponsors, number> = {
        mainSponsors: 15,
        premiumSponsors: 5,
        partners: 2
    };

    private readonly sponsorElementWidth: Record<keyof Sponsors, number> = {
        mainSponsors: 700,
        premiumSponsors: 300,
        partners: 200
    };

    public constructor(
        public readonly deviceType: DeviceTypeService
    ) {}

    public get sponsorsEntries(): [keyof Sponsors, Sponsor[]][] {
        return (Object.entries(this.sponsors) as [keyof Sponsors, Sponsor[] | null][])
            .filter(entry => entry[1] !== null) as [keyof Sponsors, Sponsor[]][];
    }

    public animationDuration(type: keyof Sponsors): string {
        const sponsors = this.sponsors[type];
        if (!sponsors)
            return '0s';
        return `${sponsors.length * this.animationDurationMultiplier[type]}s`;
    }

    public counts(type: keyof Sponsors): null[] {
        const sponsors = this.sponsors[type];
        if (!sponsors)
            return [];
        return new Array<null>(Math.ceil(document.body.offsetWidth / (this.sponsorElementWidth[type] * sponsors.length)) + 1);
    }
}
