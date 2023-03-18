import { Component, Input } from '@angular/core';
import { BfvLiveticker } from 'src/app/modules/firebase-api/types/game-info';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'liveticker',
    templateUrl: './liveticker.component.html',
    styleUrls: ['./liveticker.component.sass']
})
export class LivetickerComponent {
    @Input() liveticker!: BfvLiveticker;

    public constructor(
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {}
}
