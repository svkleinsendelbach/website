import { Component } from '@angular/core';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'context-menu',
    styleUrls: ['./context-menu.component.sass'],
    templateUrl: './context-menu.component.html'
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
