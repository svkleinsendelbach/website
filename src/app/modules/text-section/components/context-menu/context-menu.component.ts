import { Component } from '@angular/core';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.sass']
})
export class ContextMenuComponent {
    public ellipsisVertical = faEllipsisVertical;

    public isShown = false;

    public constructor(
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {}

    public toggleMenu() {
        this.isShown = !this.isShown;
    }

    public dismissMenu() {
        this.isShown = false;
    }
}
