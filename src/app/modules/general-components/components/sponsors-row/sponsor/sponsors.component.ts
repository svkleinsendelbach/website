import { Component, Input } from '@angular/core';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { InternalLink } from 'src/app/types/internal-path';
import { Sponsor, Sponsors } from 'src/app/types/sponsors';
import { TrackBy } from 'src/app/types/track-by';

@Component({
    selector: 'app-sponsors',
    styleUrls: ['./sponsors.component.sass'],
    templateUrl: './sponsors.component.html'
})
export class SponsorsComponent {
    @Input() public sponsors!: Sponsor[];

    @Input() public type!: keyof Sponsors;

    public TrackBy = TrackBy;

    public sponsorsPageLink = InternalLink.all.sponsoren;

    public constructor(
        public readonly deviceType: DeviceTypeService
    ) {}
}
