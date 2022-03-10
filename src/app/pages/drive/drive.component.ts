import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { HeaderIntransparentService } from 'src/app/services/header-intransparent.service';
import { DarkModeService } from '../../services/dark-mode.service';
import { mapStyleDarkAppearence } from '../../utils/mapStyleDarkAppearence';

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.sass'],
})
export class DriveComponent implements OnDestroy {
  public map: {
    zoom: number;
    center: google.maps.LatLngLiteral | google.maps.LatLng;
    marker: (google.maps.LatLngLiteral | google.maps.LatLng)[];
  } = {
    zoom: 14,
    center: {
      lat: 49.59223121455868,
      lng: 11.15793746762878,
    },
    marker: [
      {
        lat: 49.59223121455868,
        lng: 11.15793746762878,
      },
    ],
  };

  public mapOptions: google.maps.MapOptions = {
    scrollwheel: false,
    maxZoom: 18,
    minZoom: 5,
    styles: this.darkMode.isDarkMode ? mapStyleDarkAppearence : null,
  };

  constructor(
    private headerIntransparentService: HeaderIntransparentService,
    private titleService: Title,
    public deviceType: DeviceTypeService,
    public darkMode: DarkModeService,
  ) {
    this.headerIntransparentService.makeIntransparent();
    this.titleService.setTitle('Anfahrt');
    this.darkMode.addListener('drive-map', isDarkMode => {
      this.mapOptions = {
        ...this.mapOptions,
        styles: isDarkMode ? mapStyleDarkAppearence : null,
      };
    });
  }
  ngOnDestroy(): void {
    this.darkMode.removeListener('drive-map');
  }
}
