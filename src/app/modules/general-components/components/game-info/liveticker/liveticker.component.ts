import { Component, Input } from '@angular/core';
import { BfvLiveticker } from 'src/app/modules/firebase-api/types/game-info';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'liveticker',
    styleUrls: ['./liveticker.component.sass'],
    templateUrl: './liveticker.component.html'
})
export class LivetickerComponent {
    @Input() public liveticker!: BfvLiveticker;

    public constructor(
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {}
}
