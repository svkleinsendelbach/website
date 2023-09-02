import { Component, Input } from '@angular/core';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { FooterData } from '../../types/footer-data';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'footer',
    styleUrls: ['./footer.component.sass'],
    templateUrl: './footer.component.html'
})
export class FooterComponent {
    @Input() public footerData!: FooterData;

    public faPhone = faPhone;

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
