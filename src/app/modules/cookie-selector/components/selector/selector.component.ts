import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CookieSelectionService } from '../../services/cookie-selection.service';
import { CookieType } from '../../types/cookie-type';
import { CookiesSelection } from '../../types/cookie-selection';
import { DeviceTypeService } from '../../../../services/device-type.service';
import { StyleConfigService } from '../../../../services/style-config.service';

@Component({
    selector: 'cookie-selector',
    styleUrls: ['./selector.component.sass'],
    templateUrl: './selector.component.html'
})
export class CookieSelectorComponent implements OnInit, OnDestroy {
    @Input() public isShown = false;

    public showSelection: boolean;

    public detailsShown = false;

    public cookiesSelection: CookiesSelection = CookiesSelection.defaultSelection;

    public constructor(
        public readonly cookieSelectionService: CookieSelectionService,
        public readonly styleConfig: StyleConfigService,
        public readonly deviceType: DeviceTypeService
    ) {
        this.showSelection = this.deviceType.current !== 'mobile';
    }

    public ngOnInit() {
        this.cookieSelectionService.listeners.add('cookieSelector', newCookieSelection => {
            this.cookiesSelection = newCookieSelection;
        });
        const cookieSelection = this.cookieSelectionService.cookiesSelection;
        if (!cookieSelection)
            this.isShown = true;
    }

    public ngOnDestroy() {
        this.deviceType.listeners.remove('cookieSelector');
    }

    public handleCookieSelection(type: CookieType) {
        switch (type) {
        case 'necessary':
            this.cookiesSelection.necessary = 'selected';
            break;
        case 'functionality':
            this.cookiesSelection.functionality = this.cookiesSelection.functionality === 'selected' ? 'unselected' : 'selected';
            break;
        case 'statistics':
            this.cookiesSelection.statistics = this.cookiesSelection.statistics === 'selected' ? 'unselected' : 'selected';
            break;
        default:
            break;
        }
    }

    public handleShowSelction() {
        this.showSelection = !this.showSelection;
        if (!this.showSelection)
            this.detailsShown = false;
    }

    public handleShowDetails() {
        this.detailsShown = !this.detailsShown;
    }

    public handleConfirmSelected() {
        this.cookieSelectionService.saveCookieSelection(this.cookiesSelection);
        this.isShown = false;
    }

    public handleConfirmAll() {
        this.cookiesSelection = {
            functionality: 'selected',
            necessary: 'selected',
            statistics: 'selected'
        };
        this.handleConfirmSelected();
    }

    public selectionButtonStyle(type: CookieType): Record<string, string> {
        const isSelected = this.cookiesSelection[type] === 'selected';
        return {
            backgroundColor: this.styleConfig.css(isSelected ? 'primary' : 'background'),
            borderColor: this.styleConfig.css(isSelected ? 'primary' : 'text'),
            color: this.styleConfig.css(isSelected ? 'background' : 'text')
        };
    }
}
