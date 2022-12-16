import { Injectable } from '@angular/core';
import { EventListener } from '../classes/event-listener';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  public listeners = new EventListener<CookieService.CookiesSelection>()

  public getCookiesSelection(): CookieService.CookiesSelection | null {
    const selectionJson = localStorage.getItem('cookies')
    const selection = selectionJson != null ? JSON.parse(selectionJson) : null
    if (selection != null) {
      this.listeners.emitValue(selection)
    }
    return selection
  }

  public saveCookieSelection(selection: CookieService.CookiesSelection) {
    localStorage.setItem('cookies', JSON.stringify(selection))
    this.listeners.emitValue(selection)
  }

  public removeCookieSelection() {
    localStorage.removeItem('cookies')
    this.listeners.emitValue({
      necessary: 'selected',
      functionality: 'unselected',
      statistics: 'unselected'
    })
  }
}

export namespace CookieService {

  /**
   * Defines a cookie type that can be selected.
   */
  export enum CookieType {
    Necessary,
    Functionality,
    Statistics
  }

  /**
   * Contains the selected cookies.
   */
  export interface CookiesSelection {
    necessary: 'selected'
    functionality: 'selected' | 'unselected'
    statistics: 'selected' | 'unselected'
  }
}
