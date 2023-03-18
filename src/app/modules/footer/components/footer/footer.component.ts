import { Component, Input } from '@angular/core';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { FooterData } from '../../types/footer-data';

@Component({
    selector: 'footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.sass']
})
export class FooterComponent {
    public faPhone = faPhone;

    @Input() public footerData!: FooterData;

    public hoveredLinkId: string | null = null;

    public editButtonHovered = false;

    public constructor(
        public readonly styleConfig: StyleConfigService,
        public readonly deviceType: DeviceTypeService
    ) {}

    public handleLinkHoverStart(link: { id: string }) {
        this.hoveredLinkId = link.id;
    }

    public handleLinkHoverStop(link: { id: string }) {
        if (this.hoveredLinkId === link.id)
            this.hoveredLinkId = null;
    }
}
