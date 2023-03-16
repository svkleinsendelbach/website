import { Injectable } from '@angular/core';
import { EventListener } from '../../../template/classes/event-listener';
import { CookiesSelection } from '../types/cookie-selection';
import { CookieType } from '../types/cookie-type';
import { SelectionType } from '../types/selection-type';

@Injectable({
    providedIn: 'root'
})
export class CookieService {
    public listeners = new EventListener<CookiesSelection>();

    public get cookiesSelection(): CookiesSelection | null {
        const selectionJson = localStorage.getItem('cookies');
        const selection = selectionJson !== null ? JSON.parse(selectionJson) : null;
        if (selection !== null)
            this.listeners.emitValue(selection);
        return selection;
    }

    public saveCookieSelection(selection: CookiesSelection) {
        localStorage.setItem('cookies', JSON.stringify(selection));
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
        localStorage.removeItem('cookies');
        this.listeners.emitValue(CookiesSelection.defaultSelection);
    }
}
