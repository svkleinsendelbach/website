import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { DeviceTypeService } from '../../../../services/device-type.service';
import { StyleConfigService } from '../../../../services/style-config.service';
import { Appearance, AppearanceService } from '../../../../services/appearance.service';
import { mapStyleDarkAppearence } from '../../../../utils/mapStyleDarkAppearence';
import { CookieSelectionService } from 'src/app/modules/cookie-selector/services/cookie-selection.service';

@Component({
    selector: 'maps',
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
        private readonly httpClient: HttpClient,
        public deviceType: DeviceTypeService,
        public styleConfig: StyleConfigService,
        public cookieSelectionService: CookieSelectionService,
        public appearance: AppearanceService
    ) {
        void this.checkApiLoaded();
        this.functionalityCookiesSelected = this.cookieSelectionService.cookiesSelection?.functionality === 'selected';
        this.cookieSelectionService.listeners.add('maps-component', selection => {
            this.functionalityCookiesSelected = selection.functionality === 'selected';
        });
    }

    public ngOnInit(): void {
        this.setMapOptions(this.appearance.current);
        this.appearance.listeners.add('maps-component', appearance => {
            this.setMapOptions(appearance);
        });
    }

    public ngOnDestroy(): void {
        this.appearance.listeners.remove('maps-component');
        this.cookieSelectionService.listeners.remove('maps-component');
    }

    public acceptFunctionalityCookies() {
        this.cookieSelectionService.changeCookieSelection('functionality', 'selected');
    }

    private async checkApiLoaded() {
        this.apiLoaded = await new Promise<boolean>(resolve => {
            lastValueFrom(this.httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.googleMaps.apiKey}`, 'callback'))
                .then(() => {
                    resolve(true);
                })
                .catch(() => {
                    resolve(false);
                });
        });
    }

    private setMapOptions(appearance: Appearance) {
        this.mapOptions = {
            ...this.options,
            styles: appearance === 'light' ? undefined : mapStyleDarkAppearence
        };
    }
}
