import { CookieService } from 'ngx-cookie-service';
import { EventListener } from '../../../types/event-listener';
import { Injectable } from '@angular/core';
import { CookieSelectorModule } from '../cookie-selector.module';

export interface CookiesSelection {
    necessary: 'selected';
    functionality: 'selected' | 'unselected';
    statistics: 'selected' | 'unselected';
}

@Injectable({
    providedIn: CookieSelectorModule
})
export class CookieSelectionService {
    public listeners = new EventListener<CookiesSelection>();

    private readonly defaultSelection: CookiesSelection = {
        necessary: 'selected',
        functionality: 'unselected',
        statistics: 'unselected'
    };

    public constructor(
        private readonly cookieService: CookieService
    ) {}

    public get cookiesSelection(): CookiesSelection {
        if (!this.cookieService.check('cookies-selection'))
            return this.defaultSelection;
        const selectionJson = this.cookieService.get('cookies-selection');
        const selection = JSON.parse(selectionJson) as CookiesSelection;
        return selection;
    }

    public get isSelectionSaved(): boolean {
        return this.cookieService.check('cookies-selection');
    }

    public changeCookieSelection(type: keyof CookiesSelection, value: 'selected' | 'unselected') {
        if (type === 'necessary')
            return;
        const selection = this.cookiesSelection;
        selection[type] = value;
        this.saveCookieSelection(selection);
    }

    public saveCookieSelection(selection: CookiesSelection) {
        this.cookieService.set('cookies-selection', JSON.stringify(selection));
        this.listeners.emitValue(selection);
    }

    public removeCookieSelection() {
        this.cookieService.delete('cookies-selection');
        this.listeners.emitValue(this.defaultSelection);
    }
}
