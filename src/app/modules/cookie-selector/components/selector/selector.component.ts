import { Component, OnDestroy } from '@angular/core';
import { CookieSelectionService, CookiesSelection } from '../../services/cookie-selection.service';
import { DeviceTypeService } from '../../../../services/device-type.service';
import { StyleConfigService } from '../../../../services/style-config.service';

@Component({
    selector: 'cookie-selector',
    styleUrls: ['./selector.component.sass'],
    templateUrl: './selector.component.html'
})
export class CookieSelectorComponent implements OnDestroy {
    public cookiesSelection: CookiesSelection;

    public isShown: boolean;

    public selectionShown: boolean;

    public detailsShown = false;

    public constructor(
        public readonly cookieSelectionService: CookieSelectionService,
        public readonly styleConfig: StyleConfigService,
        public readonly deviceType: DeviceTypeService
    ) {
        this.cookiesSelection = this.cookieSelectionService.cookiesSelection;
        this.cookieSelectionService.listeners.add('cookieSelector', selection => {
            this.cookiesSelection = selection;
        });
        this.isShown = !this.cookieSelectionService.isSelectionSaved;
        this.selectionShown = this.deviceType.current !== 'mobile';
    }

    public ngOnDestroy() {
        this.cookieSelectionService.listeners.remove('cookieSelector');
    }

    public toggleCookieSelection(type: keyof CookiesSelection) {
        if (type === 'necessary')
            return;
        this.cookiesSelection[type] = this.cookiesSelection[type] === 'selected' ? 'unselected' : 'selected';
    }

    public toggleSelectionShown() {
        this.selectionShown = !this.selectionShown;
        if (!this.selectionShown)
            this.detailsShown = false;
    }

    public toggleDetailsShown() {
        this.detailsShown = !this.detailsShown;
    }

    public handleConfirmAll() {
        this.cookiesSelection = {
            functionality: 'selected',
            necessary: 'selected',
            statistics: 'selected'
        };
        this.handleConfirmSelected();
    }

    public handleConfirmSelected() {
        this.cookieSelectionService.saveCookieSelection(this.cookiesSelection);
        this.isShown = false;
    }
}
