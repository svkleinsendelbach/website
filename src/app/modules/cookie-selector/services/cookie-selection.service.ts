import { CookieService } from 'ngx-cookie-service';
import { CookieType } from '../types/cookie-type';
import { CookiesSelection } from '../types/cookie-selection';
import { EventListener } from '../../../types/event-listener';
import { Injectable } from '@angular/core';
import { SelectionType } from '../types/selection-type';

@Injectable({
    providedIn: 'root'
})
export class CookieSelectionService {
    public listeners = new EventListener<CookiesSelection>();

    public constructor(
        private readonly cookieService: CookieService
    ) {}

    public get cookiesSelection(): CookiesSelection | null {
        if (!this.cookieService.check('cookies-selection'))
            return null;
        const selectionJson = this.cookieService.get('cookies-selection');
        const selection = JSON.parse(selectionJson) as CookiesSelection;
        this.listeners.emitValue(selection);
        return selection;
    }

    public saveCookieSelection(selection: CookiesSelection) {
        this.cookieService.set('cookies-selection', JSON.stringify(selection));
        this.listeners.emitValue(selection);
    }

    public changeCookieSelection(type: CookieType, value: SelectionType) {
        if (type === 'necessary')
            return;
        const selection = this.cookiesSelection ?? CookiesSelection.defaultSelection;
        selection[type] = value;
        this.saveCookieSelection(selection);
    }

    public removeCookieSelection() {
        this.cookieService.delete('cookies-selection');
        this.listeners.emitValue(CookiesSelection.defaultSelection);
    }
}
