import { Component, Input } from '@angular/core';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { Sponsor } from 'src/app/types/sponsors';
import { TrackBy } from 'src/app/types/track-by';

@Component({
    selector: 'app-sponsor',
    styleUrls: ['./sponsor.component.sass'],
    templateUrl: './sponsor.component.html'
})
export class SponsorComponent {
    @Input() public sponsor!: Sponsor;

    @Input() public orientation!: 'row' | 'column';

    public TrackBy = TrackBy;

    public constructor(
        public readonly deviceType: DeviceTypeService
    ) {}
}
