import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Link } from 'src/app/template/classes/link';
import { CookieService } from '../../services/cookie.service';
import { DeviceTypeService } from '../../services/device-type.service';
import { StyleConfigService } from '../../services/style-config.service';

/**
 * Message box for cookie selection.
 */
@Component({
  selector: 'app-cookie-selector-message',
  templateUrl: './cookie-selector-message.component.html',
  styleUrls: ['./cookie-selector-message.component.sass']
})
export class CookieSelectorMessageComponent implements OnInit, OnDestroy {

  /**
   * Defines a cookie type that can be selected.
   */
  public CookieType = CookieService.CookieType;

  /**
   * Specifies if the cookie message is shown
   */
  @Input() public isShown = false;

  /**
   * Link to privacy page
   */
  @Input() public privacyLink?: Link;

  /**
   * Contains the selected cookies.
   */
  public cookiesSelection: CookieService.CookiesSelection = {
    necessary: 'selected',
    functionality: 'unselected',
    statistics: 'unselected'
  };

  /**
   * Indicates whether details of cookies is shown.
   */
  public detailsShown = false;

  public constructor(
    public readonly cookieService: CookieService,
    public readonly styleConfig: StyleConfigService,
    public readonly deviceType: DeviceTypeService
  ) {}

  public ngOnInit() {
    this.cookieService.listeners.add('cookieSelectorMessage', newCookieSelection => {
      this.cookiesSelection = newCookieSelection;
    });
    const cookieSelection = this.cookieService.getCookiesSelection();
    if (cookieSelection == null) {
      this.isShown = true;
    }
  }

  public ngOnDestroy() {
    this.deviceType.listeners.remove('cookieSelectorMessage');
  }

  /**
   * Handles cookie selection of specified type.
   * Selectes specified cookie type if it's unselected and vice versa. Except necessary cookies those cannot be unselected.
   * @param type Type of cookie to select / unselect.
   */
  public handleCookieSelection(type: CookieService.CookieType) {
    switch (type) {
      case CookieService.CookieType.Necessary: break;
      case CookieService.CookieType.Functionality:
        this.cookiesSelection.functionality = this.cookiesSelection.functionality == 'selected' ? 'unselected' : 'selected';
        break;
      case CookieService.CookieType.Statistics:
        this.cookiesSelection.statistics = this.cookiesSelection.statistics == 'selected' ? 'unselected' : 'selected';
        break;
    }
  }

  /**
   * Handles whether details are shown.
   * Shows details if these aren't shown and vice versa.
   */
  public handleShowDetails() {
    this.detailsShown = !this.detailsShown;
  }

  /**
   * Handles confirmation of the selected cookies.
   */
  public handleConfirmSelected() {
    this.cookieService.saveCookieSelection(this.cookiesSelection);
    this.isShown = false;
  }

  /**
   * Handles confirmation of all cookies.
   */
  public handleConfirmAll() {
    this.cookiesSelection = {
      necessary: 'selected',
      functionality: 'selected',
      statistics: 'selected'
    };
    this.handleConfirmSelected();
  }

  public selectionButtonStyle(type: CookieService.CookieType): {
    [key: string]: string | undefined
  } {
    const isSelected = this.cookiesSelection[CookieService.CookieType.selectionString(type)] === 'selected';
    return {
      color: this.styleConfig.css(isSelected ? 'backgroundColor' : 'textColor'),
      'background-color': this.styleConfig.css(isSelected ? 'primaryColor' : 'backgroundColor'),
      'border-color': this.styleConfig.css(isSelected ? 'primaryColor' : 'textColor')
    };
  }
}