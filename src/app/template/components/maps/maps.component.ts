import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DeviceTypeService } from '../../services/device-type.service';
import { StyleConfigService } from '../../services/style-config.service';
import { AppearanceService } from '../../services/appearance.service';
import { mapStyleDarkAppearence } from '../../../utils/mapStyleDarkAppearence';
import { CookieService } from 'src/app/modules/cookie-selector/services/cookie.service';

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.sass']
})
export class MapsComponent implements OnInit, OnDestroy {
  @Input() public options!: google.maps.MapOptions;

  @Input() public markers: google.maps.LatLngLiteral[] = [];

  public apiLoaded = false;

  public functionalityCookiesSelected: boolean;

  public mapOptions: google.maps.MapOptions = {};

  public constructor(
    private httpClient: HttpClient,
    public deviceType: DeviceTypeService,
    public styleConfig: StyleConfigService,
    public cookieService: CookieService,
    public appearance: AppearanceService
  ) {
      lastValueFrom(this.httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.googleMaps.apiKey}`, 'callback'))
          .then(() => {
              this.apiLoaded = true;
          })
          .catch((reason) => {
              console.log(reason);
              this.apiLoaded = false;
          });
      this.functionalityCookiesSelected = this.cookieService.cookiesSelection?.functionality === 'selected';
      this.cookieService.listeners.add('maps-component', selection => {
          this.functionalityCookiesSelected = selection.functionality === 'selected';
      });
  }

  public ngOnInit(): void {
      this.mapOptions = {
          ...this.options,
          styles: this.appearance.current === AppearanceService.Appearance.Light ? undefined : mapStyleDarkAppearence
      };
      this.appearance.listeners.add('maps-component', appearance => {
          this.mapOptions = {
              ...this.options,
              styles: appearance === AppearanceService.Appearance.Light ? undefined : mapStyleDarkAppearence
          };
      });
  }

  public ngOnDestroy(): void {
      this.appearance.listeners.remove('maps-component');
      this.cookieService.listeners.remove('maps-component');
  }

  public acceptFunctionalityCookies() {
      this.cookieService.changeCookieSelection('functionality', 'selected');
  }
}
