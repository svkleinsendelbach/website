import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { AppearanceService } from 'src/app/services/appearance.service';
import { CookieSelectionService } from 'src/app/modules/cookie-selector/services/cookie-selection.service';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'bfv-widget',
    styleUrls: ['./bfv-widget.component.sass'],
    templateUrl: './bfv-widget.component.html'
})
export class BfvWidgetComponent implements AfterViewInit, OnDestroy {
    @Input() public teamId!: string;

    @ViewChild('bfvWidget') public bfvWidget: ElementRef<HTMLElement> | null = null;

    public functionalityCookiesSelected: boolean;

    public constructor(
        public deviceType: DeviceTypeService,
        public styleConfig: StyleConfigService,
        public cookieSelectionService: CookieSelectionService,
        public appearance: AppearanceService
    ) {
        this.functionalityCookiesSelected = this.cookieSelectionService.cookiesSelection !== null && this.cookieSelectionService.cookiesSelection.functionality === 'selected';
        this.cookieSelectionService.listeners.add('bfv-widget-component', selection => {
            this.functionalityCookiesSelected = selection.functionality === 'selected';
            if (this.functionalityCookiesSelected)
                this.appendBfvWidgetChild();
        });
    }

    public ngAfterViewInit() {
        this.appendBfvWidgetChild();
    }

    public ngOnDestroy(): void {
        this.cookieSelectionService.listeners.remove('bfv-widget-component');
    }

    public acceptFunctionalityCookies() {
        this.cookieSelectionService.changeCookieSelection('functionality', 'selected');
    }

    private appendBfvWidgetChild() {
        if (!this.bfvWidget)
            return;
        this.bfvWidget.nativeElement.innerHTML = '';
        const options = {
            backgroundNav: '#24252a',
            colorClubName: '#1e3799',
            colorNav: '#edf0f1',
            colorResults: `#24252a;}</style><link rel='stylesheet' href='${window.location.protocol}//${window.location.hostname}/assets/other/bfvWidgetStyle.css'><style type='text/css'>xy{x:y`,
            height: '100%',
            selectedTab: 'teammatches',
            width: '100%'
        };
        const iFrame = document.createElement('iframe');
        iFrame.setAttribute('allowFullScreen', 'true');
        iFrame.width = '100%';
        iFrame.height = '100%';
        iFrame.style.border = 'none';
        const bfvHost = `${window.location.protocol}//widget-prod.bfv.de`;
        const appPath = `widget/widgetresource/iframe${document.location.protocol === 'https:' ? '/ssl' : ''}?url=${window.location.hostname}`;
        iFrame.src = `${bfvHost}/${appPath}&widget=${encodeURIComponent(`widget/team/complete/team${this.teamId}/${options.selectedTab}?css=${encodeURIComponent(JSON.stringify(options))}&referrer=${window.location.hostname}`)}`;
        this.bfvWidget.nativeElement.appendChild(iFrame);
    }
}
